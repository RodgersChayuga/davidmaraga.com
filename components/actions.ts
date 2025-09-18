'use server'
import { prisma } from '@/lib/prisma'
import { parse } from 'rss-to-json'
import { revalidatePath } from 'next/cache'

export const getPressStatements = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error(
        'reCAPTCHA verification failed for getPressStatements:',
        recaptchaData['error-codes'],
      )
      return []
    }

    const pressStatements = await prisma.pressStatement.findMany({
      orderBy: { date: 'desc' },
      take: 3,
    })
    return pressStatements
  } catch (error) {
    console.error('Error fetching press statements:', error)
    return []
  }
}

interface VolunteerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  volunteering: number[];
  additionalInfo: string;
  county: string;
  constituency: string;
  ward: string;
  pollingStation: string;
}

export const createVolunteer = async (formData: VolunteerFormData, reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed:', recaptchaData['error-codes'])
      return { success: false, message: 'reCAPTCHA verification failed.' }
    }

    // Get the actual reason text for the selected IDs
    const selectedReasons = await prisma.volunteerReason.findMany({
      where: {
        id: {
          in: formData.volunteering
        }
      },
      select: {
        reason: true
      }
    })

    const reasonTexts = selectedReasons.map(r => r.reason).join(', ')

    console.log('formData', formData)
    await prisma.volunteer.create({
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        additional_info: formData.additionalInfo,
        county: formData.county,
        constituency: formData.constituency,
        ward: formData.ward,
        polling_station: formData.pollingStation,
        volunteering_interests: reasonTexts,
        volunteers_rels: {
          create: formData.volunteering.map((reasonId) => ({
            volunteer_reasons_id: reasonId,
            path: 'volunteering',
          })),
        },
      },
    })
    return { success: true, message: 'Volunteer created successfully!' }
  } catch (error) {
    console.error('Error creating volunteer:', error)
    return { success: false, message: 'Failed to create volunteer.' }
  }
}
export const getVolunteerReasons = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error(
        'reCAPTCHA verification failed for getVolunteerReasons:',
        recaptchaData['error-codes'],
      )
      return []
    }
    const reasons = await prisma.volunteerReason.findMany({
      orderBy: { created_at: 'asc' },
    })
    return reasons
  } catch (error) {
    console.error('Error fetching volunteer reasons:', error)
    return []
  }
}
export const getHomePage = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed for getHomePage:', recaptchaData['error-codes'])
      return null
    }

    const result = await prisma.homePage.findFirst()
    return result
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}



export const getVolunteerCount = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error(
        'reCAPTCHA verification failed for getVolunteerCount:',
        recaptchaData['error-codes'],
      )
      return 0
    }

    const count = await prisma.volunteer.count()
    return count
  } catch (error) {
    console.error('Error fetching volunteer count:', error)
    return 0
  }
}

export const getYouTubeVideos = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error(
        'reCAPTCHA verification failed for getYouTubeVideos:',
        recaptchaData['error-codes'],
      )
      return []
    }

    const channelID = 'UCOMBD0LkopewMSxOgL0XFrg'
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`

    const feed = await parse(rssUrl)

    const videos = feed.items.slice(0, 3).map((item) => ({
      id: item.id.split(':')?.[2],
      title: item.title,
      description: item.description,
      publishedAt: new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(item.published)),
      thumbnail: `https://img.youtube.com/vi/${item.id.split(':')?.[2]}/hqdefault.jpg`,
    }))

    return videos
  } catch (error) {
    console.error('Error fetching YouTube feed:', error)
    return []
  }
}

export const getFirstGallery = async (reCaptchaToken: string) => {
  'use server'
  try {
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    })
    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      console.error(
        'reCAPTCHA verification failed for getFirstGallery:',
        recaptchaData['error-codes'],
      )
      return null
    }

    const gallery = await prisma.gall.findFirst({
      orderBy: { created_at: 'desc' },
    })

    return gallery
  } catch (error) {
    console.error('Error fetching first gallery:', error)
    return null
  }
}

export const createPressStatement = async (formData: {
  title: string
  date: string
  excerpt: string
  content: string
}) => {
  try {
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Split content by double line breaks to create multiple paragraphs
    const paragraphs = formData.content
      .split(/\n\s*\n/)
      .filter(paragraph => paragraph.trim().length > 0)
      .map(paragraph => paragraph.trim())

    // Create proper Lexical structure with multiple paragraphs
    const children = paragraphs.map(paragraph => ({
      type: 'p',
      version: 1,
      children: [
        {
          type: 'text',
          version: 1,
          text: paragraph
        }
      ]
    }))

    const newStatement = await prisma.pressStatement.create({
      data: {
        title: formData.title,
        date: new Date(formData.date),
        excerpt: formData.excerpt,
        content: {
          root: {
            type: 'root',
            children: children,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1
          }
        },
        slug: slug,
      }
    })

    // Revalidate the press pages to show the new content
    revalidatePath('/press')
    revalidatePath('/')

    return { success: true, data: newStatement }
  } catch (error) {
    console.error('Error creating press statement:', error)
    return { success: false, error: 'Failed to create press statement' }
  }
}

'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'
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

    const payload = await getPayload({ config })
    const pressStatements = await payload.find({
      collection: 'press-statements',
      sort: '-date',

      limit: 3,
    })
    return pressStatements.docs
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

    console.log('formData', formData)
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'volunteers',
      data: {
        constituency: formData.constituency,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        additionalInfo: formData.additionalInfo,
        pollingStation: formData.pollingStation,
        county: formData.county,
        ward: formData.ward,
        volunteering: formData.volunteering,
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
    const payload = await getPayload({ config })
    const reasons = await payload.find({
      collection: 'volunteer-reasons',
      sort: 'createdAt',
    })
    return reasons.docs
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

    const payload = await getPayload({ config })
    const result = await payload.findGlobal({
      slug: 'home-page',
      depth: 2,
    })
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

    const payload = await getPayload({ config })
    const volunteers = await payload.find({
      collection: 'volunteers',
      limit: 0,
    })
    return volunteers.totalDocs
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

    const payload = await getPayload({ config })
    const galleries = await payload.find({
      collection: 'gall',
      limit: 1,
      sort: 'createdAt',
    })

    return galleries.docs.length > 0 ? galleries.docs[0] : null
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
    const payload = await getPayload({ config })

    const newStatement = await payload.create({
      collection: 'press-statements',
      data: {
        title: formData.title,
        date: formData.date,
        excerpt: formData.excerpt,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'p',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: formData.content
                  }
                ]
              }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1
          }
        }
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

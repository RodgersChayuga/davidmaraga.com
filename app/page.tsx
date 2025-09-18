import { cache } from "react"
import VolunteerForm from "../components/VolunteerForm"
import GalleryPreview from "../components/gallery-preview"
import YouTubeSection from "../components/youtube-section"
import HeroSection from "../components/HeroSection"
import LatestStatement from "../components/LatestStatement"
import PressStatementsSection from "../components/PressStatementsSection"
import AboutSection from "../components/AboutSection"
import { parse } from "rss-to-json"
import { prisma } from "@/lib/prisma"

// Temporary placeholder data - will be replaced with Prisma queries
const getPressStatements = cache(async () => {
  return []
})

const getFirstGallery = cache(async () => {
  return null
})

const getHomePage = cache(async () => {
  try {
    const homePage = await prisma.homePage.findFirst({
      include: {
        media: true,
        home_page_attributes: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!homePage) {
      // Return default data if no home page data exists
      return {
        title: "David Maraga 2027",
        description: "Reset. Restore. Rebuild.",
        image: null,
        attributes: []
      }
    }

    // For now, use the current image (we'll update this to use real photos later)
    let imageData = null
    if (homePage.media && homePage.media.url) {
      imageData = {
        id: homePage.media.id,
        url: homePage.media.url,
        alt: homePage.media.alt || "David Maraga - Presidential Candidate 2027"
      }
    }

    return {
      title: homePage.title || "David Maraga 2027",
      description: homePage.description || "Reset. Restore. Rebuild.",
      image: imageData,
      attributes: homePage.home_page_attributes.map((attr: { title: string | null; description: string | null }) => ({
        title: attr.title || "",
        description: attr.description || ""
      }))
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    // Return default data on error
    return {
      title: "David Maraga 2027",
      description: "Reset. Restore. Rebuild.",
      image: null,
      attributes: []
    }
  }
})

const getVolunteerReasons = cache(async () => {
  return []
})

const getYouTubeVideos = cache(async () => {
  const channelID = 'UCOMBD0LkopewMSxOgL0XFrg'
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`

  const feed = await parse(rssUrl)

  const videos = feed.items.slice(0, 3).map((item: { id: string; title: string; description: string; published: string }) => ({
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
})

export const revalidate = 60

export default async function HomePage() {
  const [pressStatements, gallery, homePage, volunteerReasons, youtubeVideos] = await Promise.all([
    getPressStatements(),
    getFirstGallery(),
    getHomePage(),
    getVolunteerReasons(),
    getYouTubeVideos(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <LatestStatement pressStatements={pressStatements} />
      {/* <EventsSection /> */}
      <GalleryPreview gallery={gallery} />
      <YouTubeSection videos={youtubeVideos} />
      <PressStatementsSection pressStatements={pressStatements} />
      {/* <NewsCoverageSection /> */}
      <AboutSection homePage={homePage} />
      <VolunteerForm volunteerReasons={volunteerReasons} />
    </div>
  )
}

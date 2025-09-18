import { cache } from "react"
import VolunteerForm from "../components/VolunteerForm"
import GalleryPreview from "../components/gallery-preview"
import YouTubeSection from "../components/youtube-section"
import HeroSection from "../components/HeroSection"
import LatestStatement from "../components/LatestStatement"
import PressStatementsSection from "../components/PressStatementsSection"
import AboutSection from "../components/AboutSection"
import { parse } from "rss-to-json"

// Temporary placeholder data - will be replaced with Prisma queries
const getPressStatements = cache(async () => {
  return []
})

const getFirstGallery = cache(async () => {
  return null
})

const getHomePage = cache(async () => {
  return {
    title: "David Maraga 2027",
    description: "Reset. Restore. Rebuild.",
    content: "Join David Maraga's presidential campaign for 2027. Together, we can build a Kenya that works for everyone through justice, integrity, and inclusive development."
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

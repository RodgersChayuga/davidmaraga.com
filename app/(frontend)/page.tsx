import { cache } from "react"
import { getPayload } from "payload"
import config from "@/payload.config"
import type { PressStatement, Gall, HomePage as HomePageType, VolunteerReason } from "@/payload-types"
import VolunteerForm from "./components/VolunteerForm"
import GalleryPreview from "./components/gallery-preview"
import YouTubeSection from "./components/youtube-section"
import HeroSection from "./components/HeroSection"
import LatestStatement from "./components/LatestStatement"
import PressStatementsSection from "./components/PressStatementsSection"
import AboutSection from "./components/AboutSection"
import { parse } from "rss-to-json"

const getPressStatements = cache(async (): Promise<PressStatement[]> => {
  const payload = await getPayload({ config })
  const pressStatements = await payload.find({
    collection: "press-statements",
    sort: "-date",
  })
  return pressStatements.docs
})

const getFirstGallery = cache(async (): Promise<Gall> => {
  const payload = await getPayload({ config })
  const galleries = await payload.find({
    collection: "gall",
    limit: 1,
    sort: "-date",
  })
  return galleries.docs[0]
})

const getHomePage = cache(async (): Promise<HomePageType> => {
  const payload = await getPayload({ config })
  const homePage = await payload.findGlobal({ slug: "home-page" })
  return homePage
})

const getVolunteerReasons = cache(async (): Promise<VolunteerReason[]> => {
  const payload = await getPayload({ config })
  const reasons = await payload.find({
    collection: "volunteer-reasons",
  })
  return reasons.docs
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

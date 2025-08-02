import { RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import config from '@payload-config'
import { importMap } from '../importMap'

type CustomRootProps = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Volunteer Admin - Custom Admin Interface',
    description: 'Customized admin interface for Volunteer platform',
  }
}

export default async function CustomRoot({ params, searchParams }: CustomRootProps) {
  return (
    <RootPage
      config={config}
      params={params}
      searchParams={searchParams}
      importMap={importMap}
    />
  )
}

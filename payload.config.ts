/* eslint-disable */
// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Volunteers } from './collections/Volunteers'
import { VolunteerReasons } from './collections/VolunteerReasons'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { PressStatements } from './collections/PressStatements'
import { Gall } from './collections/Gall'
import { HomePage } from './globals/HomePage'
import { Timeline } from './collections/Timeline'
import { Logs } from './collections/Logs'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['./app/(payload)/admin/components/Menu'],

      beforeNavLinks: ['./app/(payload)/admin/components/CustomLogo'],
      // header:["./app/(payload)/admin/components/CustomLogo"],
      beforeDashboard: ['./app/(payload)/admin/components/BeforeDashboard'],
      graphics: {
        Logo: './app/(payload)/admin/components/CustomLogo',
      },
      views: {
        analytics: {
          Component: './app/(payload)/admin/components/Analytics#Analytics',
          path: '/analytics',
        },
      },
    },
  },
  collections: [
    Users,
    Media,
    Volunteers,
    Logs,
    VolunteerReasons,
    PressStatements,
    Gall,
    Timeline,
  ],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
})

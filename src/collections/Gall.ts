import { CollectionConfig } from 'payload'
import { slugify } from '../app/utils/slugify'
interface Gallery {
  title: string
  slug?: string
  images: {
    image: {
      url: string
      filename: string
      mimeType: string
      size: number
    }
  }[]
}

export const Gall: CollectionConfig = {
  slug: 'gall',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  admin: {
    useAsTitle: 'title',
  },

  hooks: {
    beforeChange: [
      ({ data }: { data: Partial<Gallery> }) => {
        if (data.title) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'images',
      type: 'json',

      admin: {
        components: {
          Field: './app/(payload)/admin/components/BulkUpload',
        },
      },
    },
  ],
}

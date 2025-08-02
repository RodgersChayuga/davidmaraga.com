import { CollectionConfig } from "payload";
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

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
        readOnly: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

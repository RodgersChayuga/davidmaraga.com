import { CollectionConfig } from 'payload'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    // preview: (doc) => {
    //   if (doc._status === 'published') {
    //     return `http://localhost:3000/timeline/${doc.slug}`
    //   }
    //   return null
    // },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'media',
      type: 'blocks',
      minRows: 1,
      maxRows: 1,
      blocks: [
        {
          slug: 'youtubeLink',
          labels: {
            singular: 'YouTube Link',
            plural: 'YouTube Links',
          },
          fields: [
            {
              name: 'url',
              label: 'YouTube URL',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          slug: 'imageMedia',
          labels: {
            singular: 'Image Media',
            plural: 'Image Media',
          },
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
    },

    {
      type: 'collapsible',

      label: 'Optional Call to Action',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'link',
          type: 'text',
          label: 'External Link URL',
          required: false,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: false,
        },
      ],
    },
  ],
}

export default Timeline

/* eslint-disable */
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugify } from '../app/utils/slugify'

interface PressStatement {
  title: string
  date: string
  excerpt?: string
  content: string
  slug?: string
}

const generateExcerpt = (content: any): string => {
  if (content?.root?.children) {
    const text = content.root.children
      .map((child: any) => {
        if (child.type === 'p') {
          return child.children.map((c: any) => c.text).join('')
        }
        return ''
      })
      .join(' ')

    return text.slice(0, 160) + '...'
  }
  return ''
}

export const PressStatements: CollectionConfig = {
  slug: 'press-statements',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow all users to read press statements
  },
  hooks: {
    beforeChange: [
      ({ data }: { data: Partial<PressStatement> }) => {
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
       
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
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
  ],
}
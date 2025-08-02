import { CollectionConfig } from 'payload'

export const Logs: CollectionConfig = {
  slug: 'logs',
  labels: {
    singular: 'Log',
    plural: 'Logs',
  },
  admin: {
    hidden: ({ user }) => user?.isDev !== true,
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'log',
      type: 'json',
    },
  ],
}

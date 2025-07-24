import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.isDev !== true,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'isDev',
      type: 'checkbox',
      defaultValue: false,
      access: {
        read: ({ req: { user } }) => user?.isDev === true,
        update: ({ req: { user } }) => user?.isDev === true,
      },
    },
  ],
}

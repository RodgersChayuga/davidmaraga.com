import { CollectionConfig } from 'payload'

export const VolunteerReasons: CollectionConfig = {
  slug: 'volunteer-reasons',
  admin: {
    useAsTitle: 'reason',
  },
  access: {
    read: () => true, // Allow all users to read this collection
  },
  fields: [
    {
      name: 'reason',
      type: 'text',
      required: true,
    },
    {
      name: 'volunteers',
      type: 'join',
      collection: 'volunteers',
      on: 'volunteering',
      // This field is for internal linking and not directly editable
    },
  ],
}

import { CollectionConfig } from 'payload'

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  admin: {
    useAsTitle: 'email',
    listSearchableFields: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'county',
      'constituency',
      'ward',
      'pollingStation',
    ],

    components: {
      listMenuItems: ['./app/(payload)/admin/components/buttons/ExportVolunteers'],
      // Define custom components here
    },
  },

  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'volunteering',
      type: 'relationship',
      relationTo: 'volunteer-reasons',
      hasMany: true,
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
    },
    {
      name: 'county',
      type: 'text',
      required: true,
    },
    {
      name: 'constituency',
      type: 'text',
      required: true,
    },
    {
      name: 'ward',
      type: 'text',
      required: true,
    },
    {
      name: 'pollingStation',
      type: 'text',
      required: false,
      label: 'Polling Station',
    },
  ],
}

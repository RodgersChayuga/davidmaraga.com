import type { CollectionConfig } from 'payload'

export const TransactionRequestPayloads: CollectionConfig = {
  slug: 'transaction-request-payloads',
  labels: {
    singular: 'Transaction Request',
    plural: 'Transaction Requests',
  },
  admin: {
    hidden: ({ user }) => user?.isDev !== true,
  },

  fields: [
    {
      name: 'internal_id',
      type: 'text',

      unique: true,
    },
    {
      name: 'external_id',
      type: 'text',
      required: false,
    },
    {
      name: 'verify_id',
      type: 'text',
      required: false,
    },
    {
      name: 'isComplete',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'request_data',
          type: 'json',
          label: 'Request Data',
        },
        {
          name: 'callback_data',
          type: 'json',
          label: 'Callback Data',
        },
      ],
    },
    {
      name: 'user_data',
      type: 'json',
      label: 'User Data',
    },
  ],
}

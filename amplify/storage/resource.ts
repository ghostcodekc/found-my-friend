import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'dogProfileImages',
  access: (allow) => ({
    'dog-images/*': [
      // Authenticated users can manage their images
      allow.authenticated.to(['read', 'write', 'delete']),
      // Guest users need read access for presigned URLs to work
      allow.guest.to(['read'])
    ],
  }),
  isDefault: true,
});

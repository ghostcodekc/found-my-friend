import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Dog: a
    .model({
      uuid: a.string().required(),
      name: a.string().required(),
      image: a.string(),
      tagline: a.string(),
      ownerFirstName: a.string().required(),
      ownerLastName: a.string().required(),
      phoneLink: a.string().required(),
      medical: a.string(),
      temperament: a.string(),
      allergies: a.string(),
      dietary: a.string(),
      microchipped: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(['create', 'read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
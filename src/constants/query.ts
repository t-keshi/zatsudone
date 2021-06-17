export const QUERY = {
  concerts: 'concerts',
  concert: 'concert',
  orchestras: 'orchestras',
  orchestra: 'orchestra',
  participation: 'participation',
  belong: 'belong',
} as const;

export type Query = typeof QUERY[keyof typeof QUERY];

export const ROUTE_PATHS = {
  トップ: '/',
} as const;

export type ROUTE_PATH = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

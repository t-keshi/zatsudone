export const ROUTE_PATHS = {
  トップ: '/',
  近日中のイベント: '/upcoming',
  ログイン: '/login',
} as const;

export type ROUTE_PATH = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

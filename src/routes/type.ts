export const ROUTE_PATHS = {
  トップ: '/',
  近日中のコンサート: '/upcoming-concerts',
  新着のコンサート: '/recent-concerts',
  楽団リスト: '/orchestras',
  楽団詳細: '/orchestras/id',
  ログイン: '/login',
} as const;

export type ROUTE_PATH = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

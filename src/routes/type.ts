export const ROUTE_PATHS = {
  トップ: '/',
  近日中のコンサート: '/upcoming-concerts',
  新着のコンサート: '/recent-concerts',
  コンサート詳細: '/concerts/id',
  楽団リスト: '/orchestras',
  楽団詳細: '/orchestras/id',
  楽団運営: '/orchestra-management',
  ログイン: '/login',
  新規登録: '/signup',
  パスワード忘れ: '/forget-password',
} as const;

export type ROUTE_PATH = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

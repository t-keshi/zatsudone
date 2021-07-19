export const ROUTE_PATHS = {
  ランディングページ: '/',
  近日中のコンサート: '/upcoming-concerts',
  新着のコンサート: '/recent-concerts',
  コンサート詳細: '/concerts/:concertId',
  楽団リスト: '/orchestras',
  楽団詳細: '/orchestras/:orchestraId',
  楽団運営: '/orchestra-management',
  コンサート編集: '/orchestra-management/concerts/:concertId',
  ログイン: '/login',
  新規登録: '/signup',
  パスワード忘れ: '/forget-password',
  プロフィール設定: '/profile-setting',
  プロフィール: '/profile/:uid',
  マイページ: '/my-page',
} as const;

export type ROUTE_PATH = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

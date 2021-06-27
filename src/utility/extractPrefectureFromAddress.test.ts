import { extractPrefectureFromAddress } from './extractPrefectureFromAddress';

describe('住所から都道府県を抽出する関数のテスト', () => {
  test('東京都港区', () => {
    expect(extractPrefectureFromAddress('東京都港区')).toEqual('東京都');
  });
  test('神奈川県川崎市', () => {
    expect(extractPrefectureFromAddress('神奈川県川崎市')).toEqual('神奈川県');
  });
});

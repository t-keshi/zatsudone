import { PREFECTURES } from '../containers/entities/prefectures';

export const extractPrefectureFromAddress = (
  location: string,
): string | undefined => {
  const threeHeadCharacter = location.slice(0, 3);
  const fourCharacterPrefectures = [
    PREFECTURES.和歌山県,
    PREFECTURES.神奈川県,
    PREFECTURES.鹿児島県,
  ].map((prefecture) => prefecture.slice(0, 3));
  const isFourCharacterPrefectures = fourCharacterPrefectures.some(
    (prefecture) => prefecture === threeHeadCharacter,
  );
  const maybePrefecture = isFourCharacterPrefectures
    ? `${threeHeadCharacter}県`
    : threeHeadCharacter;
  const prefecture = Object.keys(PREFECTURES).some(
    (PREFECTURE) => PREFECTURE === maybePrefecture,
  )
    ? maybePrefecture
    : undefined;

  return prefecture;
};

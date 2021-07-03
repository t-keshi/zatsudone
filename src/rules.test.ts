import {
  clearFirestoreData,
  loadFirestoreRules,
} from '@firebase/rules-unit-testing';
import fs from 'fs';
import { PROJECT_ID } from './containers/entities/env';
import { firebaseConfig } from './firebaseConfig';

// const adminDB = initializeTestApp({ projectId: PROJECT_ID });
// const clientDB = (auth?: Auth) =>
//   initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
const rules = fs.readFileSync('firestore.rules', 'utf8');

beforeAll(async () => {
  await loadFirestoreRules({
    projectId: PROJECT_ID,
    rules,
  });
});

beforeEach(async () => {
  await clearFirestoreData({ projectId: firebaseConfig.projectId });
});

describe('住所から都道府県を抽出する関数のテスト', () => {
  test('東京都港区', () => {
    expect(1 + 1).toEqual(2);
  });
});

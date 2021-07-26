import firebase from 'firebase/app';
import { pickBy } from '../../../utility/pickBy';
import { uploadImage } from '../utilities/uploadImage';

interface Variables {
  id: string;
  title?: string;
  description?: string;
  coverUrl?: File;
  date?: Date;
  startAt?: Date;
  openAt?: Date;
  closeAt?: Date;
  address?: string;
  placeId?: string;
  prefecture?: string | null;
  programs?: string;
}

export const updateConcert = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const concertRef = db.collection('concert').doc(variables.id);
  console.log(variables);
  const coverUrl = variables.coverUrl
    ? await uploadImage(variables.coverUrl, `concertCover/${variables.id}`)
    : undefined;
  console.log(coverUrl);
  const updateVariables = {
    title: variables.title,
    description: variables.description,
    coverUrl,
    date: variables.date
      ? firebase.firestore.Timestamp.fromDate(variables.date)
      : undefined,
    openAt: variables.openAt
      ? firebase.firestore.Timestamp.fromDate(variables.openAt)
      : undefined,
    startAt: variables.startAt
      ? firebase.firestore.Timestamp.fromDate(variables.startAt)
      : undefined,
    closeAt: variables.closeAt
      ? firebase.firestore.Timestamp.fromDate(variables.closeAt)
      : undefined,
    address: variables.address,
    placeId: variables.placeId,
    prefecture: variables.prefecture,
    programs: variables.programs,
  };
  await concertRef.update(pickBy(updateVariables));
};

import firebase from 'firebase/app';

interface Variables {
  orchestraId: string;
  notification: string;
  manipulation: 'add' | 'delete';
}

export const editOrchestraNotification = async ({
  orchestraId,
  notification,
  manipulation,
}: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestraRef = db.collection('orchestra').doc(orchestraId);

  if (manipulation === 'add') {
    await orchestraRef.update({
      notifications: firebase.firestore.FieldValue.arrayUnion(notification),
    });
  } else {
    await orchestraRef.update({
      notifications: firebase.firestore.FieldValue.arrayRemove(notification),
    });
  }
};

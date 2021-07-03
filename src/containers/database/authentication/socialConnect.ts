import firebase from 'firebase';

type SocialApp = 'google' | 'twitter' | 'facebook';

export const socialConnect = async (socialApp: SocialApp): Promise<void> => {
  const db = firebase.firestore();
  const getProvider = () => {
    switch (socialApp) {
      case 'google':
        return new firebase.auth.GoogleAuthProvider();
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider();
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
      default:
        throw Error('Invalid value of socialApp');
    }
  };

  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid;
  try {
    const userCredential = await currentUser?.linkWithPopup(getProvider());
    const providerUserName = userCredential?.additionalUserInfo?.username;
    const userRef = db.collection('user').doc(uid);
    const objKey = `${socialApp}UserName`;
    await userRef.update({
      [objKey]: providerUserName,
    });
  } catch {
    // NOTE: ソーシャル連携の後に処理が失敗した後、再度連携を試みた場合はuserCredentialはundefined
    const providerUserName = currentUser?.providerData
      .map((providerDatum) => providerDatum?.providerId)
      .filter((providerId) => providerId?.includes(socialApp))[0];
    console.log(providerUserName);
    const userRef = db.collection('user').doc(uid);
    const objKey = `${socialApp}UserName`;
    await userRef.update({
      [objKey]: providerUserName,
    });
  }
};

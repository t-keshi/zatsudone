import firebase from 'firebase/app';

type SocialApp = 'twitter' | 'facebook';

export const socialConnect = async (socialApp: SocialApp): Promise<void> => {
  const db = firebase.firestore();
  const getProvider = () => {
    if (socialApp === 'twitter') {
      return new firebase.auth.TwitterAuthProvider();
    }
    if (socialApp === 'facebook') {
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      facebookProvider.addScope('user_link');

      return facebookProvider;
    }

    throw Error('Invalid value of socialApp');
  };

  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid;
  try {
    const userCredential: firebase.auth.UserCredential | undefined =
      await currentUser?.linkWithPopup(getProvider());
    const getUserLink = (): string => {
      if (socialApp === 'twitter') {
        const userName = userCredential?.additionalUserInfo?.username ?? '';

        return `https://twitter.com/${userName}`;
      }
      if (socialApp === 'facebook') {
        const profile = (userCredential?.additionalUserInfo?.profile ??
          null) as { link: string };

        return profile.link;
      }

      throw Error('Invalid value of socialApp');
    };
    const userRef = db.collection('user').doc(uid);
    const objKey = `${socialApp}UserLink`;
    await userRef.update({
      [objKey]: getUserLink(),
    });
  } catch (error) {
    console.warn(error);
  }
};

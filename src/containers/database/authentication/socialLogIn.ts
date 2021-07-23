import firebase from 'firebase/app';

type SocialApp = 'google' | 'twitter' | 'facebook';

export const socialLogIn = async (socialApp: SocialApp): Promise<void> => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
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
  await firebase.auth().signInWithPopup(getProvider());
};

import firebase from 'firebase/app';

interface Variables {
  displayName: string;
  email: string;
  password: string;
}

export const signUp = async (
  variables: Variables,
): Promise<firebase.auth.UserCredential> => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(variables.email, variables.password);
  const { currentUser } = firebase.auth();
  if (user) {
    currentUser?.updateProfile({
      displayName: variables.displayName,
    });
  }

  return user;
};

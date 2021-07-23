import firebase from 'firebase/app';

interface Variables {
  email: string;
  password: string;
}

export const logIn = async (variables: Variables): Promise<void> => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase
    .auth()
    .signInWithEmailAndPassword(variables.email, variables.password);
};

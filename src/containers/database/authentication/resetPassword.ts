import firebase from 'firebase/app';

interface Variables {
  email: string;
}

export const resetPassword = async (variables: Variables): Promise<void> => {
  await firebase.auth().sendPasswordResetEmail(variables.email);
};

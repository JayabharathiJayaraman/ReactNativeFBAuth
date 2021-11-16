// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  User,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB3l3ZFLdVWcqy_bfkCWjs-8TgUBzxPNg",
  authDomain: "reactnative-fbauth-7a932.firebaseapp.com",
  projectId: "reactnative-fbauth-7a932",
  storageBucket: "reactnative-fbauth-7a932.appspot.com",
  messagingSenderId: "928155032674",
  appId: "1:928155032674:web:955768e028f10b2719853b",
  measurementId: "G-V11JYG9DJS"
};

// Initialize Firebase
let app: FirebaseApp;

export const initFirebase = (callback: (_: boolean) => void) => {
  app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.onAuthStateChanged((state) => {
    if (state) {
      callback(true); //current user signed in
    } else {
      callback(false); //current user NOT signed in
    }
  });
};

export const fbRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth(app);

  const createUserResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const newUser: User = {
    ...createUserResponse.user,
    displayName: firstName + " " + lastName,
  };
  newUser.email;
  await updateCurrentUser(auth, newUser);
  return createUserResponse;
};

export const fbLogout = async () => {
  const auth = getAuth(app);
  await auth.signOut();
};

export const fbLogin = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  const auth = getAuth(app);

  try {
    const credentualUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentualUser;
  } catch (error) {
    return undefined;
  }
};
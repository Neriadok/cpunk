import {
  GoogleAuthProvider,
  indexedDBLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth, userSubject } from './session';

export async function authWithGoogle(): Promise<User | null> {
  await setPersistence(auth, indexedDBLocalPersistence); // Remove for sensitive Data applications
  let oauth,
    credential = null;
  try {
    credential = await signInWithPopup(auth, new GoogleAuthProvider());
    oauth = GoogleAuthProvider.credentialFromResult(credential);
    userSubject.next(auth.currentUser);
  } catch (error: any) {
    console.warn(error);
    oauth = GoogleAuthProvider.credentialFromError(error);
  }
  return userSubject.getValue();
}

export async function restoreSession() {
  await setPersistence(auth, indexedDBLocalPersistence); // Remove for sensitive Data applications
  userSubject.next(auth.currentUser);
  return userSubject.getValue();
}

export async function logOut() {
  await signOut(auth);
  userSubject.next(null);
  return userSubject.getValue();
}

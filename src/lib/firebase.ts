import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseOptions } from '../env/firebase';

export const firebaseApp = initializeApp(firebaseOptions);
export const googleAnalytics = getAnalytics(firebaseApp);

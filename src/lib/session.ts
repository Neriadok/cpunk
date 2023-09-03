import { Auth, getAuth, User } from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { firebaseApp } from "./firebase";

export const userSubject = new BehaviorSubject<User | null>(null);
export const auth: Auth = getAuth(firebaseApp);

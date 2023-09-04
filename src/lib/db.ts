import { DataSnapshot, get, getDatabase, ref, set } from "firebase/database";
import { firebaseApp } from "./firebase";
import { userSubject } from "./session";
import { Character } from "../interfaces/character.interface";
import { BehaviorSubject } from "rxjs";

const db = getDatabase(firebaseApp);
const localKey = 'characters';
export const charactersSubject = new BehaviorSubject<Character[]>([]);

export async function saveCharacter(character: Character) {
    const characters = [character, ...charactersSubject.value.filter(({uid}) => character.uid !== uid)];
    await saveCharacters(characters);
}

export async function removeCharacter(character: Character) {
    const characters = charactersSubject.value.filter(({uid}) => character.uid !== uid);
    await saveCharacters(characters);
}

export async function saveCharacters(characters: Character[]) {
    if (userSubject.value) {
        await set(ref(db, 'users/' + userSubject.value.uid), JSON.stringify(characters));
        charactersSubject.next(characters);
    } else {
        localStorage.setItem(localKey, JSON.stringify(characters));
        charactersSubject.next(characters);
    }
}

export async function loadCharacters() {
    if (userSubject.value) {
        const data: DataSnapshot = await get(ref(db, 'users/' + userSubject.value.uid));
        const characters: Character[] = data.val() && JSON.parse(data.val());
        charactersSubject.next(characters || []);
    } else {
        const data = localStorage.getItem(localKey);
        const characters: Character[] = data ? JSON.parse(data) : [];
        charactersSubject.next(characters || [])
    }
}
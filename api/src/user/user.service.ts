import firebase from "../firebase";
import { User, userConverter } from "./user.model";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  Firestore,
} from "firebase/firestore";

export class UserService {
  private readonly db: Firestore;

  constructor() {
    this.db = getFirestore(firebase);
  }

  public async createUser(user: User): Promise<void> {
    try {
      const userRef = doc(this.db, "users", user.userId).withConverter(
        userConverter
      );
      await setDoc(userRef, user);
    } catch (error) {
      console.log("Error adding user document: ", error);
    }
  }

  public async getUser(id: string): Promise<User | null> {
    try {
      const userRef = doc(this.db, "users", id).withConverter(userConverter);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error getting user document: ", error);
    }
  }

  public async updateUser(id: string, newFields: Partial<User>) {
    try {
      const user = doc(this.db, "users", id);
      await updateDoc(user, newFields);
    } catch (error) {
      console.log("Error updating user document: ", error);
    }
  }

  public async deleteUser(id: string) {
    try {
      const user = doc(this.db, "users", id);
      await deleteDoc(user);
    } catch (error) {
      console.log("Error deleting user document: ", error);
    }
  }
}

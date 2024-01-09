import { DocumentSnapshot, DocumentData, SnapshotOptions, Timestamp } from "firebase/firestore";

export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    userId,
    email,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  }: IUser) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromFirestore(doc: DocumentSnapshot, options: SnapshotOptions): User {
    const data = doc.data();
    return new User({
      userId: doc.id,
      email: data?.email,
      firstName: data?.firstName,
      lastName: data?.lastName,
      createdAt: data?.createdAt.toDate(),
      updatedAt: data?.updatedAt.toDate(),
    });
  }

  toFirestore(): DocumentData {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: Timestamp.fromDate(this.createdAt),
      updatedAt: Timestamp.fromDate(this.updatedAt),
    };
  }
}

export const userConverter = {
    toFirestore: (user: User): DocumentData => {
        return user.toFirestore();
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions): User => {
        return User.fromFirestore(snapshot, options);
    }
};

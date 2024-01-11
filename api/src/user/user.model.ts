import { DocumentSnapshot, DocumentData, SnapshotOptions, Timestamp } from "firebase/firestore";

export interface IUser {
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	tokens: {
	  access_token: string;
	  refresh_token: string;
	};
  }

  export class User {
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	tokens: {
	  access_token: string;
	  refresh_token: string;
	};
  
	constructor({
	  userId,
	  email,
	  firstName,
	  lastName,
	  createdAt,
	  updatedAt,
	  tokens,
	}: IUser) {
	  this.userId = userId;
	  this.email = email;
	  this.firstName = firstName;
	  this.lastName = lastName;
	  this.createdAt = createdAt;
	  this.updatedAt = updatedAt;
	  this.tokens = tokens;
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
		tokens: data?.tokens || { access_token: '', refresh_token: data.tokens.refresh_token || null },
	  });
	}
  
	static toFirestore(user: User): DocumentData {
	  return {
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		createdAt: Timestamp.fromDate(user.createdAt),
		updatedAt: Timestamp.fromDate(user.updatedAt),
		tokens: user.tokens,
	  };
	}
  }

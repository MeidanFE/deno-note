import { db } from "../config/db.ts";

export interface IBook {
	id: string;
	title: string;
	author: string;
}

export const BookModel = db.collection("books");

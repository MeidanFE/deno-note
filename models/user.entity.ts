import { db } from "../config/db.ts";

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export const UserModel = db.collection("users");

import { IUser } from "./models/user.entity.ts";

export interface GlobalState {
	user: IUser | null;
}

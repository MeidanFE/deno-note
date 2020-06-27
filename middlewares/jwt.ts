import {
	Middleware,
	validateJwt,
	JwtObject,
	Payload,
	Jose,
	setExpiration,
	makeJwt,
} from "../deps.ts";

import { config } from "../config/index.ts";
import { UserModel } from "../models/user.entity.ts";

export const jwt: Middleware = async (ctx, next) => {
	const { request, state } = ctx;
	const jwt = request.headers.get("Authorization")?.split("bearer ")?.[1] || "";
	const validatedJwt = await validateJwt(jwt, config.jwtSecret);

	if (!validatedJwt.isValid) {
		state.user = null;
	}

	const { payload } = validatedJwt as JwtObject & {
		jwt: string;
		isValid: true;
		critResult?: unknown[];
	};

	const user = await UserModel.find({ _id: payload?.id! as string });
	if (!user) {
		state.user = null;
	}

	state.user = user;

	await next();
};

export function generateJWt(id: string) {
	const key = config.jwtSecret;

	const payload: Payload = {
		id,
		// iss: "joe",
		exp: setExpiration(new Date().getTime() + 60000),
	};

	const header: Jose = {
		alg: "HS256",
		typ: "JWT",
	};

	return makeJwt({ header, payload, key });
}

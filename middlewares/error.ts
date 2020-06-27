import { Application, isHttpError, HttpError, Middleware } from "../deps.ts";

/**
 * 错误处理
 */
export const errHandler: Middleware = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		const { message = "unkown error", status = 500, stack = null } = err;

		ctx.response.status = status;
		ctx.response.body = { message, status, stack };
		ctx.response.type = "json";
	}
};

export const error = (app: Application) => {
	app.addEventListener("error", (evt) => {
		// Will log the thrown error to the console.
		console.log(evt.error);
	});

	app.use(errHandler);
};

import { Application, isHttpError, Status, Middleware } from "../deps.ts";

/**
 * 错误处理
 */
export const httpError: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          break;
        default:
          break;
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
};

export default (app: Application) => {
  app.addEventListener("error", (evt) => {
    // Will log the thrown error to the console.
    console.log(evt.error);
  });

  app.use(httpError);
};

import { Application } from "../deps.ts";
import { rootRouter } from "./decorators.ts";

import "./book.controller.ts";

export default (app: Application) => {
  console.log("init router", rootRouter.routes());
  app.use(rootRouter.routes());
  app.use(rootRouter.allowedMethods());
};

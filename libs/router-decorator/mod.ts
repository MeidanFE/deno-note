// @deno-types="https://unpkg.com/reflect-metadata@0.1.13/index.d.ts"
import "https://unpkg.com/reflect-metadata@0.1.13/Reflect.js";

import {
  REQUEST_PREFIX,
  REQUEST_PATH,
  REQUEST_METHOD,
  HttpMethod,
} from "./constants.ts";
import { Router } from "../../deps.ts";
import { join, normalPath } from "../path.ts";

async function loadController(rootRouter: Router, filename: string) {
  let res = await import(filename);
  const controller = res.default;
  let prefix = Reflect.getMetadata(REQUEST_PREFIX, controller);
  prefix = prefix == "/" ? "" : prefix;

  const routes = Object.getOwnPropertyDescriptors(controller.prototype);

  for (let key in routes) {
    if (key == "constructor") continue;
    const route = routes[key].value;
    const path = prefix + normalPath(Reflect.getMetadata(REQUEST_PATH, route));
    const method = Reflect.getMetadata(REQUEST_METHOD, route) as HttpMethod;
    const fn = rootRouter[method];
    fn.call(rootRouter, path, route);
  }
}

type RouterDecoratorType = {
  dir: string;
};

export default async function (rootRouter: Router, ops: RouterDecoratorType) {
  const { dir } = ops;

  for (const dirEntry of Deno.readDirSync(dir)) {
    const filePath = join(dir, dirEntry.name);
    await loadController(rootRouter, filePath);
  }

  return rootRouter;
}

export * from "./decorators/index.ts";

import { Router } from "../deps.ts";

export const rootRouter = new Router();

export enum HTTPMETHOD {
  OPTIONS = "options",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  POST = "post",
  DELETE = "delete",
}

interface RequestMappingOps {
  path: string;
  method: HTTPMETHOD;
}

export const RequestMapping = (ops: RequestMappingOps) => {
  let { path, method } = ops;
  // console.log(`f():evaluated`);
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    target[propertyKey] = 1;
    console.log(target, propertyKey);
    const fn = rootRouter[method];
    fn.call(rootRouter, path, descriptor.value);
  };
};

const RequestFactory = (method: HTTPMETHOD) => (path: string) =>
  RequestMapping({ path, method });

export const Get = RequestFactory(HTTPMETHOD.GET);

export const Put = RequestFactory(HTTPMETHOD.PUT);

export const Patch = RequestFactory(HTTPMETHOD.PATCH);

export const Post = RequestFactory(HTTPMETHOD.POST);

export const Delete = RequestFactory(HTTPMETHOD.DELETE);

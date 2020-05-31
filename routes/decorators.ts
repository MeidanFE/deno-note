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
    const fn = rootRouter[method];
    fn.call(rootRouter, path, descriptor.value);
  };
};

export const Get = (path: string) =>
  RequestMapping({ path, method: HTTPMETHOD.GET });

export const PUT = (path: string) =>
  RequestMapping({ path, method: HTTPMETHOD.PUT });

export const PATCH = (path: string) =>
  RequestMapping({ path, method: HTTPMETHOD.PATCH });

export const POST = (path: string) =>
  RequestMapping({ path, method: HTTPMETHOD.POST });

export const DELETE = (path: string) =>
  RequestMapping({ path, method: HTTPMETHOD.DELETE });

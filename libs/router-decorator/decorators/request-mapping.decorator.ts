import {
  HttpMethod,
  REQUEST_PATH,
  REQUEST_METHOD,
  TARGET_TYPE,
  TargetType,
} from "../constants.ts";

interface RequestMappingOps {
  path: string;
  method: HttpMethod;
}

export const RequestMapping = (ops: RequestMappingOps) => {
  let { path, method } = ops;
  // console.log(`f():evaluated`);
  return function (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    Reflect.defineMetadata(TARGET_TYPE, TargetType.ROUTE, descriptor.value);
    Reflect.defineMetadata(REQUEST_PATH, path, descriptor.value);
    Reflect.defineMetadata(REQUEST_METHOD, method, descriptor.value);

    // const fn = rootRouter[method];
    // fn.call(rootRouter, path, descriptor.value);
  };
};

const RequestFactory = (method: HttpMethod) => (path?: string) =>
  RequestMapping({ path: path || "/", method });

export const Get = RequestFactory(HttpMethod.GET);

export const Put = RequestFactory(HttpMethod.PUT);

export const Patch = RequestFactory(HttpMethod.PATCH);

export const Post = RequestFactory(HttpMethod.POST);

export const Delete = RequestFactory(HttpMethod.DELETE);

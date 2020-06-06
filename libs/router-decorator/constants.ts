export const TARGET_TYPE = Symbol();
export const REQUEST_PREFIX = Symbol();
export const REQUEST_PATH = Symbol();
export const REQUEST_METHOD = Symbol();

export enum HttpMethod {
  OPTIONS = "options",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  POST = "post",
  DELETE = "delete",
}

export enum TargetType {
  CONTROLLER = "controller",
  ROUTE = "route",
}

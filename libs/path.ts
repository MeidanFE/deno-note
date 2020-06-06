/**
 * 当前路径下文件拼接
 * @param args
 */
export const join = (...args: Array<string | string[]>) =>
   "/" + Array.prototype.concat.apply([], args).join("/");

/**
 * 路径补充前缀
 * @param path
 */
export const normalPath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

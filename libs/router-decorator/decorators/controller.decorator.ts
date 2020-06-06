import { REQUEST_PREFIX, TargetType } from "../constants.ts";
import { TARGET_TYPE } from "../constants.ts";

interface ControllerOptions {
  path: string;
}

export function Controller(ops?: string | ControllerOptions) {
  const path =
    typeof ops == "undefined" ? "" : typeof ops == "string" ? ops : ops.path;

  return function (target: Function) {
    Reflect.defineMetadata(TARGET_TYPE, TargetType.CONTROLLER, target);
    Reflect.defineMetadata(REQUEST_PREFIX, path, target);
  };
}

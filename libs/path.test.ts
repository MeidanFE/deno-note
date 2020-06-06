import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { join, normalPath } from "./path.ts";

Deno.test("join", () => {
  assertEquals("/a/b/c", join(["a", "b", "c"]));
  assertEquals("/1/2/3", join("1", ["2", "3"]));
});

Deno.test("normalPath", () => {
  assertEquals("/a/b", normalPath("a/b"));
});

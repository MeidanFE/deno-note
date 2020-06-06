// @deno-types="https://unpkg.com/reflect-metadata@0.1.13/index.d.ts"
import "https://unpkg.com/reflect-metadata@0.1.13/Reflect.js";

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Get, Post, Put, Delete, Patch } from "../mod.ts";
import { REQUEST_PATH, HttpMethod, REQUEST_METHOD } from "../constants.ts";

class TestRequestMapping {
  @Get("/testGet")
  testGet() {}

  @Post("/testPost")
  testPost() {}

  @Put("/testPut")
  testPut() {}

  @Delete("/testDelete")
  testDelete() {}

  @Patch("/testPatch")
  testPatch() {}
}

const testMethods = Object.getOwnPropertyDescriptors(
  TestRequestMapping.prototype
);

Deno.test("GET", () => {
  const method = testMethods.testGet.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.GET);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testGet");
});

Deno.test("POST", () => {
  const method = testMethods.testPost.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.POST);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testPost");
});

Deno.test("DELETE", () => {
  const method = testMethods.testDelete.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.DELETE);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testDelete");
});

Deno.test("PATCH", () => {
  const method = testMethods.testPatch.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.PATCH);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testPatch");
});

Deno.test("PUT", () => {
  const method = testMethods.testPut.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.PUT);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testPut");
});

Deno.test("PUT", () => {
  const method = testMethods.testPut.value as Function;
  assertEquals(Reflect.getMetadata(REQUEST_METHOD, method), HttpMethod.PUT);
  assertEquals(Reflect.getMetadata(REQUEST_PATH, method), "/testPut");
});

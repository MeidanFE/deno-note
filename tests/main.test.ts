import { assertEquals } from "../deps.ts"

Deno.test("Hello world", () => {
  const x = 1 + 3
  assertEquals(x, 4, "对的")
})

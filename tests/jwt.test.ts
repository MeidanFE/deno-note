import { assertEquals } from "../deps.ts";
import { generateJWt } from "../middlewares/jwt.ts";
import { validateJwt } from "../deps.ts";
import { config } from "../config/index.ts";

Deno.test("jwt token", async () => {
  const token = generateJWt("123456");
  const validJwt = await validateJwt(token, config.jwtSecret);
  assertEquals(validJwt.isValid, true);
});

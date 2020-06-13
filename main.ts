import { Application, Router } from "./deps.ts";
import { error, logger } from "./middlewares/index.ts";
import routerDecorator from "./libs/router-decorator/mod.ts";

const app = new Application({
  keys: ["Simon-bin"],
  state: {
    author: "Simon-bin",
  },
});

error(app as any);
logger(app as any);

const router = await routerDecorator(new Router(), {
  dir: "controllers",
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});
await app.listen({ port: 8000 });

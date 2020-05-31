import { Application } from "./deps.ts";
import { error, logger } from "./middlewares/index.ts";
import router from "./routes/index.ts";

const app = new Application({
  keys: ["Simon-bin"],
  state: {
    author: "Simon-bin",
  },
});

error(app as any);
logger(app as any);

router(app as any);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});
await app.listen({ port: 8000 });

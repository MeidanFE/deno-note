import "https://deno.land/x/dotenv/load.ts";
import { Application, Router } from "./deps.ts";
import { error, logRequestTime } from "./middlewares/index.ts";
import routerDecorator from "./libs/router-decorator/mod.ts";
import { GlobalState } from "./types.ts";
import { initLogger } from "./utils/logger.ts";

const port = Deno.env.get("PORT") || 8000;

// await initLogger();

const app = new Application<GlobalState>({
	keys: ["Simon-bin"],
	state: {
		user: null,
	},
});

error(app as any);
app.use(logRequestTime);

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

await app.listen({ port: +port });

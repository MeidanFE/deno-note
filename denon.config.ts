import { envConfig, DenonConfig } from "./deps.ts";

const config: DenonConfig = {
	scripts: {
		start: {
			cmd: "deno run main.ts",
			desc: "Run the main server.",
			// env: envConfig(),
			allow: ["env", "write", "read", "net", "plugin"],
			tsconfig: "tsconfig.json",
			unstable: true,
		},
	},
	logger: {
		debug: false,
	},
	watcher: {
		paths: [
			"config",
			"controllers",
			"utils",
			"middlewares",
			"models",
			"main.ts",
		],
		exts: ["ts", "tsx"],
	},
};

export default config;

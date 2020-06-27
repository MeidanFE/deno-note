import { MongoClient } from "../deps.ts";
import { config } from "./index.ts";

const { host, port, user, password } = config.db;

export const client = new MongoClient();
client.connectWithUri(`mongodb://${user}:${password}@${host}:${port}`);

export const db = client.database("test");

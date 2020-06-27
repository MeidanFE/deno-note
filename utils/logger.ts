import { Logger } from "../deps.ts";

const logger = new Logger();

// rotate and maxBytes and maxBackupCount
// filename is [date]_[type].log.[n]
// example 2020-05-25_info.log.1, 2020-05-25_info.log.2
// when reach maxBackupCount, the [type].log.[maxBackupCount-1] will be overwrite
export async function initLogger() {
	await logger.initFileLogger("./logs", {
		rotate: true,
		maxBytes: 10 * 1024,
		maxBackupCount: 10,
	});
}

export default logger;

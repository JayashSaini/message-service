import logger from "./logger/winston.logger.js";
import { kafkaConsumer } from "./kafka/consumer.js";
import { emailHandler } from "./services/email.services.js";
import { EMAIL_TOPIC } from "./constants.js";

async function startServer() {
	try {
		// Connect to Kafka
		await kafkaConsumer.connect();
		await kafkaConsumer.subscribe([EMAIL_TOPIC]);

		await kafkaConsumer.consumeEmails(EMAIL_TOPIC, emailHandler);
	} catch (error: any) {
		logger.error("Failed to start server:", error);
		process.exit(0);
	}
}

startServer();

// Graceful shutdown
process.on("SIGTERM", async () => {
	logger.info("SIGTERM received. Shutting down gracefully...");
	await kafkaConsumer.disconnect();
	process.exit(0);
});

process.on("SIGINT", async () => {
	await kafkaConsumer.disconnect();
	process.exit(0);
});

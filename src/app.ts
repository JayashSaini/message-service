import logger from "./logger/winston.logger.js";
import { kafkaConsumer } from "./kafka/consumer.js";

async function startServer() {
	try {
		// Connect to Kafka
		await kafkaConsumer.connect();
		await kafkaConsumer.subscribe(["EMAIL", "SMS", "NOTIFICATION"]);

		await kafkaConsumer.consumeEmails(
			"EMAIL",
			(messages: any[]): Promise<void> => {
				logger.info(
					`Processing ${messages.length} messages for email - ${new Date()}`
				);

				// Ensure function returns a Promise<void>
				return Promise.resolve();
			}
		);
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

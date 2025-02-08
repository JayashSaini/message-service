import { kafkaProducer } from "./kafka/producer.js";

async function startServer() {
	try {
		await kafkaProducer.connect();

		// Example usage: send a message to a topic
		for (let i = 0; i < 500; i++) {
			kafkaProducer.sendMessage("EMAIL", { message: "Hello, Kafka!" });
		}
		console.log("Sent a message");
	} catch (error) {
		console.error("Error in server execution:", error);
	}
}

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("SIGTERM received. Shutting down gracefully...");
	await kafkaProducer.disconnect();
	process.exit(0);
});

startServer();

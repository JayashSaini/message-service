import { kafkaProducer } from "./kafka/producer.js";

async function startServer() {
	try {
		await kafkaProducer.connect();

		// Example usage: send a message to a topic
		kafkaProducer.sendMessage("EMAIL", {
			to: "test@example.com",
			subject: "Welcome to register xyz company!",
			templateId: "welcomeTemplate",
			data: {
				name: "Jayash Saini",
				websiteLink: "https://example.com",
			},
		});

		console.log("sent email : ", new Date());
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

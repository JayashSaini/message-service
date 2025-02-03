import { config } from "./config/index.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import logger from "./logger/winston.logger.js";
import { errorHandler } from "./api/middlewares/error.middlewares.js";
import messageRoutes from "./api/routes/message.routes.js";
import { kafkaProducer } from "./kafka/producer.js";
import { kafkaConsumer } from "./kafka/consumer.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", messageRoutes);

// Error Handling
app.use((_, __, next) => {
	next(new ApiError(404, "endpoint not found"));
});

app.use(errorHandler);

async function startServer() {
	try {
		// Connect to Kafka
		await kafkaProducer.connect();
		await kafkaConsumer.connect();
		await kafkaConsumer.subscribe(["messages"]);

		// Start the server
		app.listen(config.port, () => {
			logger.info(`Server is running on port ${config.port}`);
		});
	} catch (error: any) {
		logger.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();

// Graceful shutdown
process.on("SIGTERM", async () => {
	logger.info("SIGTERM received. Shutting down gracefully...");
	await kafkaProducer.disconnect();
	await kafkaConsumer.disconnect();
	process.exit(0);
});

export default app;

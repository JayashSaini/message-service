import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

export const config = {
	port: process.env.PORT || 6969,
	nodeEnv: (process.env.NODE_ENV || "development") as
		| "development"
		| "production",
	kafka: {
		clientId: "message-service",
		brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
		groupId: "message-service-group",
	},
	jwt: {
		secret: process.env.JWT_SECRET || "your-secret-key",
		expiresIn: "24h",
	},
	logLevel: process.env.LOG_LEVEL || "info",
	logs: {
		dir: process.env.LOG_DIR || "logs",
		maxSize: process.env.LOG_MAX_SIZE || "20m",
		maxFiles: process.env.LOG_MAX_FILES || "14d",
	},
};

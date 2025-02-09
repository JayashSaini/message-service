import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

export const config = {
	nodeEnv: (process.env.NODE_ENV || "development") as
		| "development"
		| "production",
	kafka: {
		clientId: "message-service",
		brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
		groupId: "message-service-group",
	},
	logLevel: process.env.LOG_LEVEL || "info",
	logs: {
		dir: process.env.LOG_DIR || "logs",
		maxSize: process.env.LOG_MAX_SIZE || "20m",
		maxFiles: process.env.LOG_MAX_FILES || "14d",
	},
	smtp: {
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || "587"),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	},
};

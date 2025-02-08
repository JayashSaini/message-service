import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

export const config = {
	kafka: {
		clientId: "message-service",
		brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
		groupId: "message-service-group",
	},
};

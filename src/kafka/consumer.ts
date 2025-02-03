import { Kafka, Consumer } from "kafkajs";
import { config } from "../config/index.js";
import logger from "../logger/winston.logger.js";

class KafkaConsumer {
	private consumer: Consumer;
	private static instance: KafkaConsumer;

	private constructor() {
		const kafka = new Kafka({
			clientId: config.kafka.clientId,
			brokers: config.kafka.brokers,
		});
		this.consumer = kafka.consumer({ groupId: config.kafka.groupId });
	}

	public static getInstance(): KafkaConsumer {
		if (!KafkaConsumer.instance) {
			KafkaConsumer.instance = new KafkaConsumer();
		}
		return KafkaConsumer.instance;
	}

	async connect(): Promise<void> {
		try {
			await this.consumer.connect();
			logger.info("Successfully connected to Kafka consumer");
		} catch (error) {
			logger.error("Failed to connect to Kafka consumer:", error);
			throw error;
		}
	}

	async subscribe(topics: string[]): Promise<void> {
		try {
			for (const topic of topics) {
				await this.consumer.subscribe({ topic, fromBeginning: true });
			}
		} catch (error) {
			logger.error("Failed to subscribe to topics:", error);
			throw error;
		}
	}

	async startConsumer(
		messageHandler: (message: any) => Promise<void>
	): Promise<void> {
		try {
			await this.consumer.run({
				eachMessage: async ({ topic, partition, message }) => {
					try {
						const parsedMessage = JSON.parse(message.value?.toString() || "");
						await messageHandler(parsedMessage);
					} catch (error) {
						logger.error("Error processing message:", error);
					}
				},
			});
		} catch (error) {
			logger.error("Failed to start consumer:", error);
			throw error;
		}
	}

	async disconnect(): Promise<void> {
		await this.consumer.disconnect();
	}
}

export const kafkaConsumer = KafkaConsumer.getInstance();

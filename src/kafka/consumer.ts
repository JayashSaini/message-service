import { Kafka, Consumer } from "kafkajs";
import { config } from "../config/index.js";
import logger from "../logger/winston.logger.js";
import { INTERVAL_MS } from "../constants.js";
import { BATCH_SIZE } from "../constants.js";

class KafkaConsumer {
	private consumer: Consumer;
	private static instance: KafkaConsumer;
	private isProcessing = false;

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

	async consumeEmails(
		topic: string,
		messageHandler: (messages: any[]) => Promise<void>
	): Promise<void> {
		try {
			const messageBuffer: any[] = []; // Buffer to store incoming messages

			await this.consumer.run({
				eachMessage: async ({ message }) => {
					try {
						const parsedMessage = JSON.parse(message.value?.toString() || "");
						messageBuffer.push(parsedMessage);
					} catch (error) {
						logger.error("Error processing message:", error);
					}
				},
			});

			// Execute batch every INTERVAL_MS seconds if messages exist
			setInterval(async () => {
				if (messageBuffer.length > 0 && !this.isProcessing) {
					this.isProcessing = true;
					await this.processBatch(messageBuffer, topic, messageHandler);
					this.isProcessing = false;
				}
			}, INTERVAL_MS);
		} catch (error) {
			logger.error("Failed to start email consumer:", error);
			throw error;
		}
	}

	private async processBatch(
		messageBuffer: any[],
		topic: string,
		messageHandler: (messages: any[]) => Promise<void>
	): Promise<void> {
		this.consumer.pause([{ topic }]); // Pause consumer while processing

		const batchToProcess = messageBuffer.splice(0, BATCH_SIZE); // Take up to BATCH_SIZE  messages

		await messageHandler(batchToProcess); // Process batch

		this.consumer.resume([{ topic }]); // Resume consumer after processing
	}

	async consumerHealth() {
		this.consumer.on("consumer.heartbeat", (e) => {
			logger.info("Consumer heartbeat event", e);
		});
		this.consumer.on("consumer.crash", (error) => {
			logger.warn("Kafka crash:", error);
		});
	}

	async disconnect(): Promise<void> {
		await this.consumer.disconnect();
	}
}

export const kafkaConsumer = KafkaConsumer.getInstance();

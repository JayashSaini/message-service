import { Kafka } from "kafkajs";
import { config } from "../config/index.js";

class KafkaProducer {
	producer;
	static instance;

	constructor() {
		const kafka = new Kafka({
			clientId: config.kafka.clientId,
			brokers: config.kafka.brokers,
		});
		this.producer = kafka.producer();
	}

	static getInstance() {
		if (!KafkaProducer.instance) {
			KafkaProducer.instance = new KafkaProducer();
		}
		return KafkaProducer.instance;
	}

	async connect() {
		try {
			await this.producer.connect();
			console.log("Successfully connected to Kafka producer");
		} catch (error) {
			console.error("Failed to connect to Kafka producer:", error);
			throw error;
		}
	}

	async sendMessage(topic, message) {
		try {
			await this.producer.send({
				topic,
				messages: [{ value: JSON.stringify(message) }],
			});
		} catch (error) {
			console.error("Failed to send message to Kafka:", error);
			throw error;
		}
	}

	async disconnect() {
		await this.producer.disconnect();
	}
}

export const kafkaProducer = KafkaProducer.getInstance();

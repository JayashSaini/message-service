import { v4 as uuidv4 } from "uuid";
import { Message, SendMessageDto } from "../interfaces/message.interface.js";
import { kafkaProducer } from "../kafka/producer.js";
import logger from "../logger/winston.logger.js";

export class MessageService {
	private static instance: MessageService;

	private constructor() {}

	public static getInstance(): MessageService {
		if (!MessageService.instance) {
			MessageService.instance = new MessageService();
		}
		return MessageService.instance;
	}

	async sendMessage(
		senderId: string,
		messageDto: SendMessageDto
	): Promise<Message> {
		try {
			const message: Message = {
				id: uuidv4(),
				senderId,
				receiverId: messageDto.receiverId,
				content: messageDto.content,
				type: messageDto.type,
				metadata: messageDto.metadata,
				createdAt: new Date(),
			};

			await kafkaProducer.sendMessage("messages", message);
			logger.info(`Message sent successfully: ${message.id}`);

			return message;
		} catch (error) {
			logger.error("Error sending message:", error);
			throw error;
		}
	}
}

export const messageService = MessageService.getInstance();

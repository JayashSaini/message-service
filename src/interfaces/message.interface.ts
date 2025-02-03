export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	type: "TEXT" | "IMAGE" | "VIDEO";
	metadata?: Record<string, any>;
	createdAt: Date;
}

export interface SendMessageDto {
	receiverId: string;
	content: string;
	type: "TEXT" | "IMAGE" | "VIDEO";
	metadata?: Record<string, any>;
}

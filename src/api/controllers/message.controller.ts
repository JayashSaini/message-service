import { Request, Response, NextFunction } from "express";
import { messageService } from "../../services/message.service.js";
import logger from "../../logger/winston.logger.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
	// const message = await messageService.sendMessage( );
	// logger.info("Message sent successfully", {
	// 	context: "MessageController",
	// 	messageId: message.id,
	// 	senderId,
	// 	receiverId: message.receiverId,
	// });
	res.status(201).json(new ApiResponse(201, {}, "Message sent successfully"));
});

export { sendMessage };

import { body } from "express-validator";
import { validate } from "../middlewares/validate.middleware.js";

export const validateMessage = validate([
	body("receiverId")
		.notEmpty()
		.withMessage("Receiver ID is required")
		.isString()
		.withMessage("Receiver ID must be a string"),
	body("content")
		.notEmpty()
		.withMessage("Content is required")
		.isString()
		.withMessage("Content must be a string"),
	body("type")
		.notEmpty()
		.withMessage("Type is required")
		.isIn(["TEXT", "IMAGE", "VIDEO"])
		.withMessage("Type must be TEXT, IMAGE, or VIDEO"),
	body("metadata")
		.optional()
		.isObject()
		.withMessage("Metadata must be an object"),
]);

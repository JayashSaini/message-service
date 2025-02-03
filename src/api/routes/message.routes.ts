import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { validateMessage } from "../validators/message.validator.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const router = Router();

router.post("/messages", validateMessage, sendMessage);

router.route("/healthCheck").get((req, res) => {
	res
		.status(200)
		.json(new ApiResponse(200, {}, "Welcome to message micro service."));
});

export default router;

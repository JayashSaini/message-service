import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { ApiError } from "../../utils/ApiError.js";

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		const extractedErrors: Record<string, string[]> = {};
		errors.array().forEach((err: any) => {
			if (!extractedErrors[err.param]) {
				extractedErrors[err.param] = [];
			}
			extractedErrors[err.param].push(err.msg);
		});

		throw new ApiError(422, "Validation Error");
	};
};

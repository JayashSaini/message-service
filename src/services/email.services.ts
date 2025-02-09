import nodemailer from "nodemailer";
import { config } from "../config/index.js";
import { Email } from "../interfaces/message.interface.js";
import { getTemplate } from "../templates/index.js";
import logger from "../logger/winston.logger.js";

export const transporter = nodemailer.createTransport({
	host: config.smtp.host,
	port: config.smtp.port,
	auth: {
		user: config.smtp.auth.user,
		pass: config.smtp.auth.pass,
	},
});

export const emailHandler = async (emails: Email[]): Promise<void> => {
	if (emails.length === 0) {
		return;
	}

	// Send emails in parallel using Promise.all()
	await Promise.all(
		emails.map(async (email: Email) => {
			const emailTemplate = getTemplate(email.templateId, email.data);

			return transporter.sendMail({
				from: config.smtp.auth.user,
				to: email.to,
				subject: email.subject,
				html: emailTemplate,
			});
		})
	);

	logger.info(`Processed batch of ${emails.length} email in ${new Date()}`);

	// Ensure function returns a Promise<void>
	return Promise.resolve();
};

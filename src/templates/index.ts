import emailVerificationTemplate from "./emailVerification.templates.js";
import welcomeTemplate from "./welcome.templates.js";
import twoFATemplate from "./twoFA.templates.js";
import forgotPasswordTemplate from "./forgotPassword.templates.js";
import changePasswordTemplate from "./changePassword.templates.js";

const templates = [
	{
		id: "welcomeTemplate",
		function: welcomeTemplate,
	},
	{
		id: "emailVerificationTemplate",
		function: emailVerificationTemplate,
	},
	{
		id: "twoFATemplate",
		function: twoFATemplate,
	},
	{
		id: "forgotPasswordTemplate",
		function: forgotPasswordTemplate,
	},
	{
		id: "changePasswordTemplate",
		function: changePasswordTemplate,
	},
	// Add more templates here...
];
const getTemplate = (templateId: string, data: {}) => {
	const template = templates.find((t) => t.id === templateId);
	if (!template) {
		throw new Error(`Template with ID ${templateId} not found.`);
	}
	return template.function(data);
};

export { getTemplate };

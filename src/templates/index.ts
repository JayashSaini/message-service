import welcome from "./welcome.templates.js";

const templates = [
	{
		id: "welcomeTemplate",
		function: welcome,
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

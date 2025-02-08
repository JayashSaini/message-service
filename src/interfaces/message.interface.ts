export interface Email {
	to: string;
	subject: string;
	priority: "HIGH" | "LOW" | "NORMAL";
	templateId: string;
	data: {};
}

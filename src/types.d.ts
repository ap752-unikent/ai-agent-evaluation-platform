export type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    rating?: number;
    reason?: string;
}
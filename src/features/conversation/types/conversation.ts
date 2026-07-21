export type MessageRole =
    | "USER"
    | "ASSISTANT"
    | "SYSTEM";

export interface Message {
    id: number;
    role: MessageRole;
    content: string;
    createdAt: string;
}

export interface ConversationSummary {
    id: number;
    title: string;
    updatedAt: string;
}

export interface ConversationDetail {
    id: number;
    title: string;
    messages: Message[];
}
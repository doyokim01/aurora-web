import api from "@/api/axios";
import type {
    ConversationDetail,
    ConversationSummary,
} from "../types/conversation";

interface ApiResponse<T> {
    data: T;
}

export const getConversations = async (): Promise<
    ConversationSummary[]
> => {
    const { data } =
        await api.get<ApiResponse<ConversationSummary[]>>(
            "/conversations",
        );

    return data.data;
};

export const getConversation = async (
    id: number,
): Promise<ConversationDetail> => {
    const { data } =
        await api.get<ApiResponse<ConversationDetail>>(
            `/conversations/${id}`,
        );

    return data.data;
};

export const createConversation = async (): Promise<
    ConversationSummary
> => {
    const { data } =
        await api.post<ApiResponse<ConversationSummary>>(
            "/conversations",
        );

    return data.data;
};

export const deleteConversation = async (
    id: number,
): Promise<void> => {
    await api.delete(`/conversations/${id}`);
};
import { create } from "zustand";
import type {
    ConversationDetail,
    ConversationSummary,
    Message
} from "../types/conversation";

interface ConversationState {
    conversations: ConversationSummary[];
    selectedId: number | null;
    selectedConversation: ConversationDetail | null;
    isDetailLoading: boolean;
    detailError: string | null;
    streamingMessage: string | null,
    isStreaming: boolean;
    setStreaming: (streaming: boolean) => void;

    setConversations: (
        items: ConversationSummary[],
    ) => void;

    selectConversation: (
        id: number | null,
    ) => void;

    setSelectedConversation: (
        conversation: ConversationDetail | null,
    ) => void;

    setDetailLoading: (
        isLoading: boolean,
    ) => void;

    setDetailError: (
        error: string | null,
    ) => void;

    setStreamingMessage: (message: string) => void;
    clearStreamingMessage: () => void;

    appendMessage: (
        message: Message,
    ) => void;
}

export const useConversationStore =
    create<ConversationState>((set) => ({
        conversations: [],
        selectedId: null,
        selectedConversation: null,
        isDetailLoading: false,
        detailError: null,
        streamingMessage: null,
        isStreaming: false,

        setConversations: (items) =>
            set({
                conversations: items,
            }),

        selectConversation: (id) =>
            set({
                selectedId: id,
            }),

        setSelectedConversation: (conversation) =>
            set({
                selectedConversation: conversation,
            }),

        setDetailLoading: (isLoading) =>
            set({
                isDetailLoading: isLoading,
            }),

        setDetailError: (error) =>
            set({
                detailError: error,
            }),

        setStreamingMessage: (message) =>
            set({
                streamingMessage: message,
            }),

        clearStreamingMessage: () =>
            set({
                streamingMessage: null,
            }),

        appendMessage: (message) =>
            set((state) => {

                if (!state.selectedConversation) {
                    return state;
                }

                return {
                    selectedConversation: {
                        ...state.selectedConversation,
                        messages: [
                            ...state.selectedConversation.messages,
                            message,
                        ],
                    },
                };
            }),

        setStreaming: (streaming) =>
            set({
                isStreaming: streaming,
            }),
    }));
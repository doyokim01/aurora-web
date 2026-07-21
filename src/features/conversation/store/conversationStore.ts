import { create } from "zustand";
import type {
    ConversationDetail,
    ConversationSummary,
} from "../types/conversation";

interface ConversationState {
    conversations: ConversationSummary[];
    selectedId: number | null;
    selectedConversation: ConversationDetail | null;
    isDetailLoading: boolean;
    detailError: string | null;

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
}

export const useConversationStore =
    create<ConversationState>((set) => ({
        conversations: [],
        selectedId: null,
        selectedConversation: null,
        isDetailLoading: false,
        detailError: null,

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
    }));
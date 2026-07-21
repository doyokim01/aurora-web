import { useEffect } from "react";
import { getConversations } from "../api/conversationApi";
import { useConversationStore } from "../store/conversationStore";

/**
 * Conversation 목록을 서버에서 조회하여 Store에 저장합니다.
 */
export function useConversation() {
    const setConversations = useConversationStore(
        (state) => state.setConversations,
    );

    useEffect(() => {
        const loadConversations = async () => {
            try {
                const conversations =
                    await getConversations();

                setConversations(conversations);
            } catch (error) {
                console.error(
                    "[Aurora] Failed to load conversations.",
                    error,
                );
            }
        };

        void loadConversations();
    }, [setConversations]);
}
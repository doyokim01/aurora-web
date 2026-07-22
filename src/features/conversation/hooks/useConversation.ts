import { useCallback, useEffect } from "react";
import { getConversations } from "../api/conversationApi";
import { useConversationStore } from "../store/conversationStore";

/**
 * Conversation 목록을 서버에서 조회하여 Store에 저장합니다.
 */
export function useConversation() {
    const setConversations = useConversationStore(
        (state) => state.setConversations,
    );

    const loadConversations = useCallback(async () => {
        try {
            const conversations =
                await getConversations();

            setConversations(conversations);

            const {
                selectedId,
                selectConversation,
            } = useConversationStore.getState();

            /*
             * 새로고침으로 선택 상태가 초기화된 경우
             * 가장 최근 대화를 자동으로 선택합니다.
             */
            if (
                selectedId === null &&
                conversations.length > 0
            ) {
                selectConversation(
                    conversations[0].id,
                );
            }
        } catch (error) {
            console.error(
                "[Aurora] Failed to load conversations.",
                error,
            );
        }
    }, [setConversations]);

    useEffect(() => {
        void loadConversations();
    }, [loadConversations]);

    return {
        loadConversations,
    };
}
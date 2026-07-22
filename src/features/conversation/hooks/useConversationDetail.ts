import { useCallback, useEffect } from "react";
import { getConversation } from "../api/conversationApi";
import { useConversationStore } from "../store/conversationStore";

export function useConversationDetail() {
    const selectedId = useConversationStore(
        (state) => state.selectedId,
    );

    const setSelectedConversation = useConversationStore(
        (state) => state.setSelectedConversation,
    );

    const setDetailLoading = useConversationStore(
        (state) => state.setDetailLoading,
    );

    const setDetailError = useConversationStore(
        (state) => state.setDetailError,
    );

    const loadConversationDetail = useCallback(
        async (conversationId: number) => {
            setDetailLoading(true);
            setDetailError(null);

            try {
                const conversation =
                    await getConversation(
                        conversationId,
                    );

                setSelectedConversation(conversation);
            } catch (error) {
                console.error(
                    "[Aurora] Failed to load conversation detail.",
                    error,
                );

                setDetailError(
                    "대화를 불러오지 못했습니다.",
                );
            } finally {
                setDetailLoading(false);
            }
        },
        [
            setSelectedConversation,
            setDetailLoading,
            setDetailError,
        ],
    );

    useEffect(() => {
        if (selectedId === null) {
            setSelectedConversation(null);
            return;
        }

        void loadConversationDetail(selectedId);
    }, [
        selectedId,
        loadConversationDetail,
        setSelectedConversation,
    ]);

    return {
        loadConversationDetail,
    };
}
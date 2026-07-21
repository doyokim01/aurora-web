import { useEffect } from "react";
import { getConversation } from "../api/conversationApi";
import { useConversationStore } from "../store/conversationStore";

/**
 * 선택된 대화의 상세 정보와 메시지를 조회합니다.
 */
export function useConversationDetail() {
    const selectedId = useConversationStore(
        (state) => state.selectedId,
    );

    const setSelectedConversation =
        useConversationStore(
            (state) =>
                state.setSelectedConversation,
        );

    const setDetailLoading =
        useConversationStore(
            (state) => state.setDetailLoading,
        );

    const setDetailError =
        useConversationStore(
            (state) => state.setDetailError,
        );

    useEffect(() => {
        if (selectedId === null) {
            setSelectedConversation(null);
            return;
        }

        const loadConversation = async () => {
            try {
                setDetailLoading(true);
                setDetailError(null);

                const conversation =
                    await getConversation(selectedId);

                setSelectedConversation(conversation);
            } catch (error) {
                console.error(
                    "[Aurora] Failed to load conversation detail.",
                    error,
                );

                setSelectedConversation(null);
                setDetailError(
                    "대화를 불러오지 못했습니다.",
                );
            } finally {
                setDetailLoading(false);
            }
        };

        void loadConversation();
    }, [
        selectedId,
        setSelectedConversation,
        setDetailLoading,
        setDetailError,
    ]);
}
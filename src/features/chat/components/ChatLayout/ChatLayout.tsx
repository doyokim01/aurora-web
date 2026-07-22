// ================================
// Import
// ================================

import { useMemo, useState, useRef } from "react";
import ChatHeader from "../ChatHeader/ChatHeader";
import EmptyState from "../EmptyState/EmptyState";
import PromptInput from "../PromptInput/PromptInput";
import Sidebar from "../../../conversation/components/sidebar/Sidebar.tsx";
import { useConversation } from "../../../conversation/hooks/useConversation";
import { useConversationStore } from "../../../conversation/store/conversationStore";
import { useConversationDetail } from "../../../conversation/hooks/useConversationDetail";

import styles from "./ChatLayout.module.css";
import {MessageList} from "@/features/chat/components/MessageList/MessageList.tsx";

// ================================
// Component
// ================================

/**
 * Aurora의 전체 채팅 화면을 구성하는 최상위 레이아웃입니다.
 *
 * Sidebar, Header, 메시지 영역, Prompt 입력창을 조합하며
 * 향후 Conversation Store와 Streaming 상태가 연결되는 지점입니다.
 */
export default function ChatLayout() {

    useConversation();
    useConversationDetail();

    const selectedConversation =
        useConversationStore(
            (state) =>
                state.selectedConversation,
        );

    const isDetailLoading =
        useConversationStore(
            (state) => state.isDetailLoading,
        );

    const detailError =
        useConversationStore(
            (state) => state.detailError,
        );

    // ================================
    // State
    // ================================

    const [isSidebarOpen, setIsSidebarOpen] =
        useState(false);

    const activeConversationId = useConversationStore(
        (state) => state.selectedId
    );

    const selectConversation = useConversationStore(
        (state) => state.selectConversation
    );

    const setStreamingMessage = useConversationStore(
        (state) => state.setStreamingMessage
    );

    const clearStreamingMessage = useConversationStore(
        (state) => state.clearStreamingMessage
    );


    const streamingMessage = useConversationStore(
        (state) => state.streamingMessage
    );

    const setSelectedConversation = useConversationStore(
        (state) => state.setSelectedConversation,
    );

    const appendMessage = useConversationStore(
        (state) => state.appendMessage,
    );

    const isStreaming = useConversationStore(
        (state) => state.isStreaming,
    );

    const setStreaming = useConversationStore(
        (state) => state.setStreaming,
    );

    const [prompt, setPrompt] = useState("");

    /**
     * 현재는 API 연결 전이므로 빈 목록으로 시작합니다.
     *
     * Conversation API 연결 시 이 값은 서버 상태 관리 계층에서
     * 제공받으며, 하위 UI 컴포넌트 구조는 변경하지 않습니다.
     */
    const conversations = useConversationStore(
        (state) => state.conversations
    );

    const timerRef = useRef<number | null>(null);

    // ================================
    // Derived State
    // ================================

    const activeConversation = useMemo(
        () =>
            conversations.find(
                (conversation) =>
                    conversation.id ===
                    activeConversationId,
            ) ?? null,
        [activeConversationId, conversations],
    );

    const headerTitle =
        selectedConversation?.title ??
        activeConversation?.title ??
        "새 대화";

    // ================================
    // Event
    // ================================

    /**
     * 모바일 환경에서 Sidebar를 엽니다.
     */
    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    /**
     * 모바일 환경에서 Sidebar를 닫습니다.
     */
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    /**
     * 새 대화 작성 상태로 화면을 초기화합니다.
     *
     * Conversation API 연결 이후에는 첫 메시지 전송 시
     * 서버에서 대화를 생성하는 흐름으로 확장됩니다.
     */
    const handleNewConversation = () => {
        selectConversation(null);
        setPrompt("");
        setIsSidebarOpen(false);
    };

    /**
     * Sidebar에서 선택한 대화를 활성화합니다.
     */
    const handleSelectConversation = (
        conversationId: number,
    ) => {
        selectConversation(conversationId);
    };

    const currentStreamingMessage =
        useConversationStore.getState().streamingMessage;


    const handleStopStreaming = () => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }


        if (currentStreamingMessage) {
            appendMessage({
                id: Date.now(),
                role: "ASSISTANT",
                content: currentStreamingMessage,
                createdAt: new Date().toISOString(),
            });
        }

        clearStreamingMessage();
        setStreaming(false);
    };

    /**
     * 입력한 메시지를 채팅 전송 흐름으로 전달합니다.
     *
     * 다음 단계에서 이 지점에 SSE 기반 메시지 전송 로직을
     * 연결합니다.
     */
    const handleSubmitPrompt = (message: string) => {
        setPrompt("");
        clearStreamingMessage();
        setStreaming(true);

        const now = new Date().toISOString();

        if (!selectedConversation) {
            setSelectedConversation({
                id: -1,
                title: message,
                messages: [],
            });
        }

        appendMessage({
            id: Date.now(),
            role: "USER",
            content: message,
            createdAt: now,
        });

        const response =
            `안녕하세요.\n\n"${message}"에 대한 Mock Streaming 응답입니다.`;

        let index = 0;

        timerRef.current = window.setInterval(() => {
            index += 1;

            setStreamingMessage(
                response.slice(0, index),
            );

            if (index >= response.length) {
                if (timerRef.current !== null) {
                    window.clearInterval(timerRef.current);
                    timerRef.current = null;
                }

                appendMessage({
                    id: Date.now() + 1,
                    role: "ASSISTANT",
                    content: response,
                    createdAt: new Date().toISOString(),
                });

                clearStreamingMessage();
                setStreaming(false);
            }
        }, 30);
    };

    // ================================
    // Render
    // ================================

    return (
        <div className={styles.layout}>
            <Sidebar
                conversations={conversations}
                activeConversationId={
                    activeConversationId
                }
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                onNewConversation={
                    handleNewConversation
                }
                onSelectConversation={
                    handleSelectConversation
                }
            />

            <main className={styles.main}>
                <ChatHeader
                    title={headerTitle}
                    onOpenSidebar={handleOpenSidebar}
                />

                <div className={styles.content}>
                    {isDetailLoading ? (
                        <p>대화를 불러오는 중입니다.</p>
                    ) : detailError ? (
                        <p>{detailError}</p>
                    ) : selectedConversation || streamingMessage ? (
                        <MessageList
                            conversation={
                                selectedConversation ?? {
                                    id: -1,
                                    title: "새 대화",
                                    messages: [],
                                }
                            }
                        />
                    ) : (
                        <EmptyState />
                    )}
                </div>

                <PromptInput
                    value={prompt}
                    isStreaming={isStreaming}
                    onChange={setPrompt}
                    onSubmit={handleSubmitPrompt}
                    onStop={handleStopStreaming}
                />
            </main>
        </div>
    );
}
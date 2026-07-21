// ================================
// Import
// ================================

import ChatLayout from "../../features/chat/components/ChatLayout/ChatLayout";

// ================================
// Page
// ================================

/**
 * Aurora의 인증된 채팅 화면입니다.
 *
 * 페이지는 라우팅 진입점만 담당하며,
 * 실제 채팅 UI와 상태 조합은 ChatLayout에서 처리합니다.
 */
export default function ChatPage() {
    // ================================
    // Render
    // ================================

    return <ChatLayout />;
}
// ================================
// Import
// ================================

import type { ConversationSummary } from "../../../conversation/types/conversation";
import styles from "./ConversationItem.module.css";

// ================================
// Type
// ================================

interface ConversationItemProps {
    conversation: ConversationSummary;
    isActive: boolean;
    onSelect: (conversationId: number) => void;
}

// ================================
// Component
// ================================

/**
 * Sidebar에 표시되는 단일 대화 항목입니다.
 *
 * 대화 선택 상태와 클릭 이벤트만 담당하며,
 * 대화 데이터 조회와 상태 관리는 상위 컴포넌트에서 처리합니다.
 */
export default function ConversationItem({
                                             conversation,
                                             isActive,
                                             onSelect,
                                         }: ConversationItemProps) {
    // ================================
    // Event
    // ================================

    /**
     * 현재 대화를 선택합니다.
     */
    const handleClick = () => {
        onSelect(conversation.id);
    };

    // ================================
    // Render
    // ================================

    return (
        <li className={styles.item}>
            <button
                type="button"
                className={`${styles.button} ${
                    isActive ? styles.active : ""
                }`}
                onClick={handleClick}
                aria-current={isActive ? "page" : undefined}
            >
                <span className={styles.title}>
                    {conversation.title}
                </span>
            </button>
        </li>
    );
}
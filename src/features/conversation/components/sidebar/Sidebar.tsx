// ================================
// Import
// ================================

import ConversationItem from "../ConversationItem/ConversationItem.tsx";
import type { ConversationSummary } from "../../types/conversation";
import styles from "./Sidebar.module.css";

// ================================
// Type
// ================================

interface SidebarProps {
    conversations: ConversationSummary[];
    activeConversationId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onNewConversation: () => void;
    onSelectConversation: (conversationId: number) => void;
}

// ================================
// Component
// ================================

/**
 * Aurora의 대화 목록과 새 대화 버튼을 표시하는 Sidebar입니다.
 *
 * 모바일에서는 오버레이 메뉴로 동작하고,
 * 데스크톱에서는 화면 좌측에 고정됩니다.
 */
export default function Sidebar({
                                    conversations,
                                    activeConversationId,
                                    isOpen,
                                    onClose,
                                    onNewConversation,
                                    onSelectConversation,
                                }: SidebarProps) {
    // ================================
    // Event
    // ================================

    /**
     * 대화를 선택하고 모바일 Sidebar를 닫습니다.
     */
    const handleSelectConversation = (
        conversationId: number,
    ) => {
        onSelectConversation(conversationId);
        onClose();
    };

    // ================================
    // Render
    // ================================

    return (
        <>
            <button
                type="button"
                className={`${styles.backdrop} ${
                    isOpen ? styles.backdropVisible : ""
                }`}
                onClick={onClose}
                aria-label="사이드바 닫기"
                tabIndex={isOpen ? 0 : -1}
            />

            <aside
                className={`${styles.sidebar} ${
                    isOpen ? styles.open : ""
                }`}
                aria-label="대화 목록"
            >
                <div className={styles.brandArea}>
                    <div className={styles.brand}>
                        <span className={styles.brandMark}>A</span>

                        <span className={styles.brandName}>
                            Aurora
                        </span>
                    </div>

                    <button
                        type="button"
                        className={styles.mobileCloseButton}
                        onClick={onClose}
                        aria-label="사이드바 닫기"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <button
                    type="button"
                    className={styles.newChatButton}
                    onClick={onNewConversation}
                >
                    <PlusIcon />

                    <span>새 대화</span>
                </button>

                <div className={styles.section}>
                    <p className={styles.sectionTitle}>
                        최근 대화
                    </p>

                    {conversations.length === 0 ? (
                        <p>아직 생성된 대화가 없습니다.</p>
                    ) : (
                        conversations.map((conversation) => (
                            <ConversationItem
                                key={conversation.id}
                                conversation={conversation}
                                isActive={
                                    conversation.id === activeConversationId
                                }
                                onSelect={handleSelectConversation}
                            />
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.profile}>
                        <div
                            className={styles.avatar}
                            aria-hidden="true"
                        >
                            U
                        </div>

                        <div className={styles.profileText}>
                            <span className={styles.profileName}>
                                Aurora User
                            </span>

                            <span className={styles.profilePlan}>
                                Personal
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// ================================
// Icon
// ================================

function PlusIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}
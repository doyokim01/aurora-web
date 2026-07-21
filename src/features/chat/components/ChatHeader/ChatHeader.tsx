// ================================
// Import
// ================================

import styles from "./ChatHeader.module.css";

// ================================
// Type
// ================================

interface ChatHeaderProps {
    title: string;
    onOpenSidebar: () => void;
}

// ================================
// Component
// ================================

/**
 * 현재 대화 제목과 모바일 메뉴 버튼을 표시하는
 * Aurora 채팅 화면의 상단 Header입니다.
 */
export default function ChatHeader({
                                       title,
                                       onOpenSidebar,
                                   }: ChatHeaderProps) {
    // ================================
    // Render
    // ================================

    return (
        <header className={styles.header}>
            <button
                type="button"
                className={styles.menuButton}
                onClick={onOpenSidebar}
                aria-label="대화 목록 열기"
            >
                <MenuIcon />
            </button>

            <h1 className={styles.title}>{title}</h1>

            <div
                className={styles.placeholder}
                aria-hidden="true"
            />
        </header>
    );
}

// ================================
// Icon
// ================================

function MenuIcon() {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}
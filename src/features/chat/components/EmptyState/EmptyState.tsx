// ================================
// Import
// ================================

import styles from "./EmptyState.module.css";

// ================================
// Component
// ================================

/**
 * 아직 메시지가 없는 대화 화면에서 표시되는
 * Aurora의 초기 안내 화면입니다.
 */
export default function EmptyState() {
    // ================================
    // Render
    // ================================

    return (
        <section className={styles.container}>
            <div
                className={styles.logo}
                aria-hidden="true"
            >
                A
            </div>

            <h2 className={styles.title}>
                무엇을 도와드릴까요?
            </h2>

            <p className={styles.description}>
                질문하거나, 아이디어를 정리하거나,
                새로운 프로젝트를 함께 시작해 보세요.
            </p>
        </section>
    );
}
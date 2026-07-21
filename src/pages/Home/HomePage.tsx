import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>AURORA AI</p>

                <h1 className={styles.title}>
                    Aurora에 오신 것을
                    <span> 환영합니다</span>
                </h1>

                <p className={styles.description}>
                    대화의 흐름을 기억하고 자연스럽게 이어가는 AI 어시스턴트
                </p>

                <div className={styles.actions}>
                    <Link className={styles.primaryButton} to="/login">
                        로그인
                    </Link>

                    <Link className={styles.secondaryButton} to="/chat">
                        채팅 테스트
                    </Link>
                </div>
            </section>
        </main>
    );
}
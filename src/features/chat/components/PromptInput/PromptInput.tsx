// ================================
// Import
// ================================

import {
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
    useRef,
} from "react";
import styles from "./PromptInput.module.css";

// ================================
// Type
// ================================

interface PromptInputProps {
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    onSubmit: (message: string) => void;
}

// ================================
// Constant
// ================================

const MAX_TEXTAREA_HEIGHT = 200;

// ================================
// Component
// ================================

/**
 * Aurora에 전달할 메시지를 입력하는 Prompt 입력창입니다.
 *
 * Enter는 메시지를 전송하고,
 * Shift + Enter는 줄바꿈을 입력합니다.
 */
export default function PromptInput({
                                        value,
                                        disabled = false,
                                        onChange,
                                        onSubmit,
                                    }: PromptInputProps) {
    // ================================
    // Ref
    // ================================

    const textareaRef =
        useRef<HTMLTextAreaElement | null>(null);

    // ================================
    // Derived State
    // ================================

    const canSubmit =
        value.trim().length > 0 && !disabled;

    // ================================
    // Event
    // ================================

    /**
     * 입력값을 변경하고 내용에 맞춰 입력창 높이를 조정합니다.
     */
    const handleChange = (
        event: ChangeEvent<HTMLTextAreaElement>,
    ) => {
        onChange(event.target.value);
        resizeTextarea(event.target);
    };

    /**
     * 메시지를 상위 채팅 영역으로 전달합니다.
     */
    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const trimmedMessage = value.trim();

        if (!trimmedMessage || disabled) {
            return;
        }

        onSubmit(trimmedMessage);

        // 전송 후 입력창 높이를 기본값으로 복구합니다.
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        });
    };

    /**
     * Enter 입력은 전송하고 Shift + Enter는 줄바꿈으로 처리합니다.
     */
    const handleKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (
            event.key !== "Enter" ||
            event.shiftKey ||
            event.nativeEvent.isComposing
        ) {
            return;
        }

        event.preventDefault();
        event.currentTarget.form?.requestSubmit();
    };

    /**
     * 입력 내용에 맞춰 Textarea 높이를 자동 조절합니다.
     */
    const resizeTextarea = (
        textarea: HTMLTextAreaElement,
    ) => {
        textarea.style.height = "auto";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            MAX_TEXTAREA_HEIGHT,
        )}px`;
    };

    // ================================
    // Render
    // ================================

    return (
        <div className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={value}
                    rows={1}
                    placeholder="Aurora에게 무엇이든 물어보세요"
                    disabled={disabled}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-label="메시지 입력"
                />

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!canSubmit}
                    aria-label="메시지 전송"
                >
                    <SendIcon />
                </button>
            </form>

            <p className={styles.notice}>
                Aurora는 실수할 수 있습니다. 중요한 정보는
                다시 확인하세요.
            </p>
        </div>
    );
}

// ================================
// Icon
// ================================

function SendIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 19V5M6.5 10.5L12 5L17.5 10.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
}

export default function Button({
                                   children,
                                   variant = "primary",
                                   size = "medium",
                                   fullWidth = false,
                                   loading = false,
                                   disabled,
                                   className = "",
                                   type = "button",
                                   ...props
                               }: ButtonProps) {
    const classNames = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            {...props}
            type={type}
            className={classNames}
            disabled={disabled || loading}
            aria-busy={loading}
        >
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            <span>{loading ? "처리 중..." : children}</span>
        </button>
    );
}
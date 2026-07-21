import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
                                  label,
                                  error,
                                  id,
                                  ...props
                              }: InputProps) {
    return (
        <div className={styles.wrapper}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <input
                id={id}
                className={styles.input}
                {...props}
            />

            {error && (
                <span className={styles.error}>
          {error}
        </span>
            )}
        </div>
    );
}
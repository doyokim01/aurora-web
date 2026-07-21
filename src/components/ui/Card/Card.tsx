import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

type CardPadding = "none" | "small" | "medium" | "large";

interface CardProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    padding?: CardPadding;
}

export default function Card({
                                 children,
                                 padding = "large",
                                 className = "",
                                 ...props
                             }: CardProps) {
    const classNames = [
        styles.card,
        styles[padding],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classNames} {...props}>
            {children}
        </section>
    );
}
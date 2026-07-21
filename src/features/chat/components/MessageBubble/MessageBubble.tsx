import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import type { Message } from "../../../conversation/types/conversation";
import styles from "./MessageBubble.module.scss";

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({
                                  message,
                              }: MessageBubbleProps) {
    const isUser = message.role === "USER";

    return (
        <div
            className={
                isUser
                    ? styles.userRow
                    : styles.assistantRow
            }
        >
            <div className={styles.avatar}>
                {isUser ? "U" : "A"}
            </div>

            <div className={styles.bubble}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
import { useEffect, useRef } from "react";

import type { ConversationDetail } from "../../../conversation/types/conversation";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { useConversationStore } from "../../../conversation/store/conversationStore";
import styles from "./MessageList.module.scss";

interface MessageListProps {
    conversation: ConversationDetail;
}

export function MessageList({
                                conversation,
                            }: MessageListProps) {

    const bottomRef = useRef<HTMLDivElement>(null);

    const streamingMessage = useConversationStore(
        (state) => state.streamingMessage
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [conversation.messages]);

    return (
        <div className={styles.list}>
            {conversation.messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
            {streamingMessage && (
                <MessageBubble
                    message={{
                        id: -1,
                        role: "ASSISTANT",
                        content: streamingMessage,
                        createdAt: new Date().toISOString(),
                    }}
                />
            )}
            <div ref={bottomRef} />
        </div>
    );
}
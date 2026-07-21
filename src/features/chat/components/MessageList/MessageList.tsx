import type {ConversationDetail,} from "../../../conversation/types/conversation";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import styles from "./MessageList.module.scss";

interface MessageListProps {
    conversation: ConversationDetail;
}

export function MessageList({
                                conversation,
                            }: MessageListProps) {
    return (
        <div className={styles.list}>
            {conversation.messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    );
}
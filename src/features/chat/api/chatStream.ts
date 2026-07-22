interface StreamChatOptions {
    conversationId: number | null;
    message: string;
    accessToken: string;
    signal?: AbortSignal;
    onConversation: (conversationId: number) => void;
    onChunk: (chunk: string) => void;
    onDone: () => void;
}

export async function streamChat({
                                     conversationId,
                                     message,
                                     accessToken,
                                     signal,
                                     onConversation,
                                     onChunk,
                                     onDone,
                                 }: StreamChatOptions): Promise<void> {

    const response = await fetch(
        `/api/chat/stream`,
        {
            method: "POST",
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                conversationId,
                message,
            }),
            signal,
        },
    );

    if (!response.ok) {
        throw new Error(
            `스트리밍 요청 실패: ${response.status}`,
        );
    }

    if (!response.body) {
        throw new Error("응답 스트림이 없습니다.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();

        if (done) {
            break;
        }

        buffer += decoder.decode(value, {
            stream: true,
        });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventBlock of events) {
            const lines = eventBlock.split("\n");

            let eventName = "delta";
            const dataLines: string[] = [];

            for (const line of lines) {
                if (line.startsWith("event:")) {
                    eventName = line
                        .slice("event:".length)
                        .trim();
                }

                if (line.startsWith("data:")) {
                    const rawData = line.slice("data:".length);

                    dataLines.push(
                        rawData.startsWith(" ")
                            ? rawData.slice(1)
                            : rawData
                    );
                }
            }

            const data = dataLines.join("\n");

            if (eventName === "done") {
                onDone();
                return;
            }

            if (eventName === "conversation") {
                const payload = JSON.parse(data) as {
                    conversationId: number;
                };

                onConversation(payload.conversationId);
                continue;
            }

            if (eventName === "delta") {
                const payload = JSON.parse(data) as {
                    content: string;
                };

                onChunk(payload.content);
            }
        }
    }

    onDone();
}
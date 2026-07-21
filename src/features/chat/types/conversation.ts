/**
 * Aurora의 대화 목록에서 사용하는 대화 요약 정보입니다.
 *
 * 실제 Conversation API가 연결된 이후에도
 * Sidebar와 대화 목록 컴포넌트는 이 타입을 기준으로 동작합니다.
 */
export interface ConversationSummary {
    id: string;
    title: string;
    updatedAt: string;
}
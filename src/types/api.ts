/**
 * Aurora 백엔드의 공통 API 응답 구조
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
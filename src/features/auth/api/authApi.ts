import api from "../../../api/axios";

import type { ApiResponse } from "../../../types/api";
import type {
    LoginRequest,
    LoginResponse,
} from "../types/auth";

/**
 * 사용자 로그인
 *
 * 백엔드의 공통 응답 객체에서 실제 로그인 데이터만 추출해 반환한다.
 */
export async function login(
    request: LoginRequest,
): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        request,
    );

    return response.data.data;
}
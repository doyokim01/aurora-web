import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    tokenType: string | null;
    accessTokenExpiresIn: number | null;

    setTokens: (
        accessToken: string,
        refreshToken: string,
        tokenType: string,
        accessTokenExpiresIn: number,
    ) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            tokenType: null,
            accessTokenExpiresIn: null,

            setTokens: (
                accessToken,
                refreshToken,
                tokenType,
                accessTokenExpiresIn,
            ) =>
                set({
                    accessToken,
                    refreshToken,
                    tokenType,
                    accessTokenExpiresIn,
                }),

            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    tokenType: null,
                    accessTokenExpiresIn: null,
                }),
        }),
        {
            name: "aurora-auth",
        },
    ),
);
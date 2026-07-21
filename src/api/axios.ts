import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    try {
        const authStorage =
            localStorage.getItem("aurora-auth");

        if (!authStorage) {
            return config;
        }

        const parsed = JSON.parse(authStorage);

        const token: string | undefined =
            parsed.state?.accessToken;

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
    } catch (error) {
        console.error(
            "[Aurora] Failed to read auth storage.",
            error,
        );
    }

    return config;
});

export default api;
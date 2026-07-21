import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import { login } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/store/authStore";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        (location.state as { from?: { pathname?: string } })?.from
            ?.pathname ?? "/chat";

    const setTokens = useAuthStore((state) => state.setTokens);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const response = await login({
                email,
                password,
            });

            setTokens(
                response.accessToken,
                response.refreshToken,
                response.tokenType,
                response.accessTokenExpiresIn,
            );

            navigate(from, { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ??
                    "로그인에 실패했습니다. 입력 정보를 확인해주세요.",
                );
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={styles.page}>
            <Card className={styles.loginCard}>
                <Link className={styles.logo} to="/">
                    Aurora
                </Link>

                <div className={styles.heading}>
                    <h1>다시 만나서 반가워요</h1>
                    <p>Aurora 계정으로 로그인하세요.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        label="이메일"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isLoading}
                    />

                    <Input
                        id="password"
                        name="password"
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isLoading}
                    />

                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        loading={isLoading}
                    >
                        로그인
                    </Button>
                </form>

                <p className={styles.footer}>
                    아직 계정이 없나요?{" "}
                    <Link className={styles.signupLink} to="/signup">
                        회원가입
                    </Link>
                </p>
            </Card>
        </main>
    );
}
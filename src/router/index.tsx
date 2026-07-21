import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Home/HomePage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";
import ChatPage from "../pages/Chat/ChatPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/chat",
                element: <ChatPage />,
            },
        ],
    },
]);
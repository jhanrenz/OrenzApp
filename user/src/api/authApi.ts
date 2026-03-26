import { api } from "../config/api";

import type { LoginData, RegisterData, User, AuthResponse } from "../types/user";

const TOKEN_KEY = "token";

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// 🔐 Auth APIs
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/register", data);

    if (res.data.token) {
        setToken(res.data.token);
    }

    return res.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/login", data);

    if (res.data.token) {
        setToken(res.data.token);
    }

    return res.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
    const res = await api.get<{ user: User }>("/user");
    return res.data.user;
};

export const logoutUser = async (): Promise<{ message: string }> => {
    const res = await api.post("/logout");

    removeToken(); // interceptor will stop attaching token automatically

    return res.data;
};
import { api, setAuthToken } from "../config/api";

import type { LoginData, RegisterData, User, AuthResponse } from "../types/user";

const token_key = 'token'

export const setToken = (token: string) => {
    localStorage.setItem(token_key, token)
    setAuthToken(token)
}
export const getToken = () : string | null => localStorage.getItem(token_key)

export const removeToken = () => {
    localStorage.removeItem(token_key)
    setAuthToken(null)
}

export const registerUser = async (data: RegisterData) : Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/register', data);
    if(res.data.token) setToken(res.data.token)
    return res.data;
}

export const loginUser = async (data: LoginData) : Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/login', data);
    if(res.data.token) setToken(res.data.token)
    return res.data;
}

export const fetchCurrentUser = async () : Promise<User> => {
    const res = await api.get<{user : User}>('/user')
    return res.data.user
}

export const logoutUser = async () : Promise<{message : string}> => {
    const res = await api.post('/logout');
    removeToken();
    return res.data
};
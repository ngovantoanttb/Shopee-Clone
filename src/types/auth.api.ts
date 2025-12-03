import http from 'src/utils/http'
import { AuthResponse } from './auth.type'
import path from 'src/constants/path';

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>(path.register, body)

export const LoginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>(path.login, body)

export const logoutAccount = () => http.post('/logout')
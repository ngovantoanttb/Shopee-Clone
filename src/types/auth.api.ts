import http from 'src/utils/http'
import { AuthResponse } from './auth.type'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

export const LoginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
import http from 'src/utils/http'
import { AuthResponse } from '../types/auth.type'
import path from 'src/constants/path'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.register, body)
  },

  LoginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.login, body)
  },
  
  logoutAccount() {
    return http.post('/logout')
  }
}

export default authApi

//

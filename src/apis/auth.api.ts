import http from 'src/utils/http'
import { AuthResponse } from '../types/auth.type'
import path from 'src/constants/path'

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

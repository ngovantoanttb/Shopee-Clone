import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefeshTokenFromLS,
  setAccessTokenToLS,
  setProfiletoLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'


// Purchase: 1 - 3
// Me: 2 - 5
// Refresh Token cho purchase: 3 -  4
// Gọi lại Purchase: 4 - 6
// Refresh Token mới cho me: 5 - 6
// Gọi lại Me: 6


class Http {
  instance: AxiosInstance
  private accessToken: string
  private refeshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    // Khởi tạo và lấy một lần khi F5
    this.accessToken = getAccessTokenFromLS()
    this.refeshToken = getRefeshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24,
        'expire-refresh-token': 60 * 60 * 24 * 7
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN) {
          const data = response.data as AuthResponse
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refeshToken)
          setProfiletoLS(data.data.user)
          toast.success((response.data as AuthResponse).message)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refeshToken = ''
          clearLS()
          toast.success((response.data as AuthResponse)?.message)
        }

        return response
      },

      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401

        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.data.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401)
        // - Token không đúng
        // - Token hết hạn
        // - Không truyền Token

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          // Trường hợp token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefeshToken().finally(() => {
                  // Giữ RefreshTokenRequest trong 10s cho những request tiếp theo nếu có lỗi 401 thì dừng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS()
          this.accessToken = ''
          this.refeshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefeshToken() {
    return this.instance
      .post<RefreshTokenResponse>('/refresh-token', {
        refresh_token: this.refeshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        return Promise.reject(error)
      })
  }
}

const http = new Http().instance

export default http

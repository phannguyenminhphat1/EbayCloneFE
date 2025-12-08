import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
  setRoleToLS
} from './auth'
import { isAxiosUnauthorizedError } from './utils'
import { AuthResponse } from 'src/types/auth.type'
// const DOMAIN = 'https://nguyenminhphat.io.vn/api/'
const DOMAIN = 'http://localhost:5185/api/'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: DOMAIN,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
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
        if (url == 'auth/login') {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token as string
          this.refreshToken = data.data?.refresh_token as string
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          if (data.data?.user != undefined) {
            setProfileToLS(data.data.user)
          }
        } else if (url == 'auth/logout') {
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          console.log(error)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response?.data
          const message = data.message || error.message
          toast.error(message, { autoClose: 2000 })
        }
        console.log(error)
        return Promise.reject(error)
      }
    )
  }

  // private handleRefreshToken() {
  //   return (
  //     this.instance
  //       .post<RefreshTokenResponse>('user/refresh-token', {
  //         refresh_token: this.refreshToken
  //       })
  //       .then((result) => {
  //         const { access_token, refresh_token } = result.data.data
  //         setAccessTokenToLS(access_token)
  //         setRefreshTokenToLS(refresh_token)
  //         this.accessToken = access_token
  //         this.refreshToken = refresh_token
  //         return access_token
  //       })
  //       // Khi thất bại, do refresh_token hết hạn hoặc invalid thì logout
  //       .catch((err) => {
  //         clearLS()
  //         this.accessToken = ''
  //         this.refreshToken = ''
  //         throw err.response
  //       })
  //   )
  // }
}
const http = new Http().instance

export default http

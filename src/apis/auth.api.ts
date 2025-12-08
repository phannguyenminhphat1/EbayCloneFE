import { AuthResponse, LoginRequestBody, RegisterRequestBody } from 'src/types/auth.type'
import { ResponseApi } from 'src/types/util.type'
import http from 'src/utils/http'

const authApi = {
  register: (data: RegisterRequestBody) => http.post<ResponseApi<string>>('auth/register', data),
  login: (data: LoginRequestBody) => http.post<AuthResponse>('auth/login', data),
  logout: (data: { refresh_token: string }) => http.post<ResponseApi<string>>('auth/logout', data),
  refreshToken: (data: { refresh_token: string }) => http.post<AuthResponse>('auth/refresh-token', data)
}

export default authApi

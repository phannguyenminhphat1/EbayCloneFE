import { User } from './user.type'
import { ResponseApi } from './util.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  user: User
}>

export type AuthRequestBody = {
  full_name: string
  username: string
  email: string
  password: string
  confirm_password: string
  phone_number: string
}

export type RefreshTokenResponse = ResponseApi<{
  access_token: string
  refresh_token: string
}>
export type RegisterRequestBody = {
  fullname: string
  username: string
  email: string
  password: string
  confirm_password: string
}
export type LoginRequestBody = {
  email: string
  password: string
}

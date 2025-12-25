import { UserRole } from './user_role.type'

export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  fullname: string
  phone?: string
  ava?: string
  address?: string
  user_roles: UserRole[]
  created_at: string
}

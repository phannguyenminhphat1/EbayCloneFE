import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/util.type'
import http from 'src/utils/http'

interface UpdateMe {
  username?: string
  fullname?: string
  phone?: string
  ava?: string
  address?: string
}

const userApi = {
  getMe: () => http.get<ResponseApi<User>>('user/get-me'),
  updateMe: (body: UpdateMe) => http.put<ResponseApi<User>>('user/update-me', body),
  changePassword: (body: { password: string; new_password: string }) =>
    http.put<{ message: string }>('user/change-password', body),
  uploadAvatar: (body: FormData) =>
    http.post<ResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default userApi

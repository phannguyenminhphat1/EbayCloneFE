import { CreatePostRequestBody } from 'src/types/listing.type'
import { ResponseApi } from 'src/types/util.type'
import http from 'src/utils/http'

const listingApi = {
  createPost: (body: CreatePostRequestBody) => http.post<ResponseApi<string>>('listing/create-post', body),
  uploadImages: (body: FormData) =>
    http.post<ResponseApi<string[]>>('listing/upload-images', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default listingApi

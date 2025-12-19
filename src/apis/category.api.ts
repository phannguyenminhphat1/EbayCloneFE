import { Category } from 'src/types/category.type'
import { ResponseApi } from 'src/types/util.type'
import http from 'src/utils/http'

const categoryApi = {
  getCategories: () => http.get<ResponseApi<Category[]>>('/category/get-categories')
}
export default categoryApi

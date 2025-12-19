import { ListingProductCategory } from 'src/types/category.type'
import { ListingProductDetail, ProductCategory, ProductListConfig } from 'src/types/product.type'
import { ResponseApi, ResponsePageApi } from 'src/types/util.type'
import http from 'src/utils/http'

const productApi = {
  getProducts: () => http.get<ResponseApi<ResponsePageApi<ProductCategory[]>>>('/product/get-products'),
  getListListingProductDetail: (params: ProductListConfig) =>
    http.get<ResponseApi<ResponsePageApi<{ category: ListingProductCategory; products: ListingProductDetail[] }>>>(
      `/product/get-list-listing-products-detail`,
      { params }
    ),
  getListingProductDetailById: (id: string) =>
    http.get<ResponseApi<{ related_product: ListingProductDetail[]; product: ListingProductDetail }>>(
      `/product/get-listing-product-detail/${id}`
    )
}
export default productApi

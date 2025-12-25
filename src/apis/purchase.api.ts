import { AddToCartOrderDetail, OrderType, PurchaseListStatus } from 'src/types/purchase.type'
import { ResponseApi, ResponsePageApi } from 'src/types/util.type'
import http from 'src/utils/http'

const purchaseApi = {
  addToCart: (body: { listing_id: number; quantity: string }) =>
    http.post<ResponseApi<AddToCartOrderDetail>>('/order/add-to-cart', body),
  getOrders: (params: { status: PurchaseListStatus }) =>
    http.get<ResponseApi<ResponsePageApi<{ orders: OrderType[] }>>>('/order/get-orders', {
      params
    }),
  deleteOrderDetails: (body: { ids: number[] }) => http.post<{ message: string }>('/order/delete-order-details', body),
  updateOrderDetail: (body: { order_detail_id: number; quantity: string }) =>
    http.put<{ message: string }>('/order/update-order-detail', body),
  buyProducts: (body: { ids: number[] }) => http.post<{ message: string }>('/order/buy-products', body)
}
export default purchaseApi

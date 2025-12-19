import { OrderType, PurchaseListStatus } from 'src/types/purchase.type'
import { ResponseApi, ResponsePageApi } from 'src/types/util.type'
import http from 'src/utils/http'

const purchaseApi = {
  addToCart: (body: { product_id: number; quantity: string }) =>
    http.post<{ message: string }>('/order/add-to-cart', body),
  getOrders: (params: { status: PurchaseListStatus }) =>
    http.get<ResponseApi<ResponsePageApi<{ orders: OrderType[] }>>>('/order/get-orders', {
      params
    }),
  deleteOrderDetails: (body: { ids: number[] }) => http.post<{ message: string }>('/delete-order-details', body),
  updateOrderDetail: (body: { product_id: number; quantity: string }) => http.put('/update-order-detail', body)
}
export default purchaseApi

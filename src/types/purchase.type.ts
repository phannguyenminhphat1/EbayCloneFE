export type PurchaseStatus = 'InCart' | 'WaitingOwnerConfirmation' | 'Paid' | 'Shipped' | 'Completed' | 'Canceled'
export type PurchaseListStatus = 'All' | PurchaseStatus

export interface OrderType {
  order_id: number
  total_amount: number
  order_status: PurchaseStatus
  order_created_at: string
  buyer: BuyerType
  order_details: OrderDetailType[]
}

export interface BuyerType {
  user_id: number
  fullname: string
  email: string
  phone: string
  address: string
  avatar: string
}

export interface OrderDetailType {
  order_detail_id: number
  quantity: number
  unit_price: number
  created_at: string
  listing: ListingType
  seller: SellerType
  product: ProductType
}

export interface ProductImageType {
  id: number
  image_url: string
}

export interface ProductType {
  product_id: number
  product_name: string
  description: string
  stock: number
  product_image: ProductImageType[]
}

export interface ListingType {
  listing_title: string
  listing_status: string
  listing_created_at: string
}

export interface SellerType {
  seller_user_id: number
  seller_fullname: string
  seller_email: string
  seller_phone: string
  seller_address: string
  seller_avatar: string
}

export interface AddToCartOrderDetail {
  order_detail_id: number
  listing_id: number
  product_id: number
  quantity: number
  unit_price: number
}

export interface ExtendedPurchaseInCartDetailType extends OrderDetailType {
  checked: boolean
  disabled: boolean
}

// {
//     "status": 200,
//     "message": "Add to cart successfully",
//     "data": {
//         "order_detail_id": 59992,
//         "listing_id": 36,
//         "product_id": 36,
//         "quantity": 1,
//         "unit_price": 49.78
//     }
// }
// {
//     "status": 200,
//     "message": "Get orders successfully",
//     "data": {
//         "data": {
//             "orders": [
//                 {
//                     "order_id": 30073,
//                     "total_amount": 2788.66,
//                     "order_status": "InCart",
//                     "order_created_at": "2025-12-20T00:59:06.517",
//                     "buyer": {
//                         "user_id": 11112,
//                         "fullname": "string",
//                         "email": "pnga8@gmail.com",
//                         "phone": null,
//                         "address": null,
//                         "avatar": "https://i.pravatar.cc/200?u=pnga8@gmail.com"
//                     },
//                     "order_details": [
//                         {
//                             "order_detail_id": 59974,
//                             "quantity": 3,
//                             "unit_price": 691.62,
//                             "created_at": "2025-12-19T17:59:06.29",
//                             "listing": {
//                                 "listing_title": "Shirt Offer 48",
//                                 "listing_status": "Active",
//                                 "listing_created_at": "2024-11-05T17:06:14.68"
//                             },
//                             "seller": {
//                                 "seller_user_id": 8151,
//                                 "seller_fullname": "John Smith",
//                                 "seller_email": "johnsmith8138@example.com",
//                                 "seller_phone": "053632059",
//                                 "seller_address": "Số 86 Bạch Đằng, Quận 1, Cần Thơ",
//                                 "seller_avatar": "https://i.pravatar.cc/200?u=johnsmith8138@example.com"
//                             },
//                             "product": {
//                                 "product_id": 50,
//                                 "product_name": "Smartwatch 48",
//                                 "description": "Sample product description",
//                                 "stock": 34,
//                                 "product_image": [
//                                     {
//                                         "id": 51,
//                                         "image_url": "https://dummyimage.com/600x400/999799/95ff00&text=Smartwatch%2048"
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "order_detail_id": 59977,
//                             "quantity": 1,
//                             "unit_price": 713.80,
//                             "created_at": "2025-12-19T18:00:36.21",
//                             "listing": {
//                                 "listing_title": "Smartwatch Bid 6",
//                                 "listing_status": "Active",
//                                 "listing_created_at": "2025-01-30T17:06:14.68"
//                             },
//                             "seller": {
//                                 "seller_user_id": 9936,
//                                 "seller_fullname": "Lisa Smith",
//                                 "seller_email": "lisasmith9923@example.com",
//                                 "seller_phone": "073021526",
//                                 "seller_address": "Số 24 Bạch Đằng, Quận 1, Đà Nẵng",
//                                 "seller_avatar": "https://i.pravatar.cc/200?u=lisasmith9923@example.com"
//                             },
//                             "product": {
//                                 "product_id": 8,
//                                 "product_name": "Stanley 30oz Snakeskin Black Quencher Luxe Tumbler Limited Edition New",
//                                 "description": "Sample product description",
//                                 "stock": 47,
//                                 "product_image": [
//                                     {
//                                         "id": 9,
//                                         "image_url": "https://i.ebayimg.com/images/g/IgwAAeSwTXVpIq4y/s-l500.webp"
//                                     }
//                                 ]
//                             }
//                         }
//                     ]
//                 }
//             ]
//         },
//         "pagination": {
//             "current_page": 1,
//             "page_size": 10,
//             "total_page": 1,
//             "total_item": 1
//         }
//     }
// }

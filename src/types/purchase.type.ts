export type PurchaseStatus = 'InCart' | 'WaitingOwnerConfirmation' | 'Paid' | 'Shipped' | 'Completed' | 'Canceled'
export type PurchaseListStatus = 'All' | PurchaseStatus

export interface OrderType {
  order_id: number
  buyer: BuyerType
  total_amount: number
  order_status: PurchaseStatus
  order_created_at: string
  order_details: OrderDetailType[]
}

export interface BuyerType {
  user_id: number
  fullname: string
  email: string
  phone: null
  address: null
  avatar: string
}

export interface OrderDetailType {
  order_detail_id: number
  product_id: number
  quantity: number
  unit_price: number
  product_name: string
  description: string
  stock: number
  product_image: ProductImageType[]
}

export interface ProductImageType {
  id: number
  image_url: string
}

// const a = {
//   order_id: 30064,
//   buyer: {
//     user_id: 11112,
//     fullname: 'string',
//     email: 'pnga8@gmail.com',
//     phone: null,
//     address: null,
//     avatar: 'https://i.pravatar.cc/200?u=pnga8@gmail.com'
//   },
//   total_amount: 7793.18,
//   order_status: 'InCart',
//   order_created_at: '2025-12-13T15:56:18.23',
//   order_details: [
//     {
//       order_detail_id: 59948,
//       product_id: 3,
//       quantity: 4,
//       unit_price: 465.05,
//       product_name: 'Skullcandy HESH ANC Wireless Over-Ear Headset (Certified Refurbished)-BLACK',
//       description: 'Sample product description',
//       stock: 19,
//       product_image: [
//         {
//           id: 4,
//           image_url: 'https://i.ebayimg.com/images/g/t5cAAeSwqcRpMfUc/s-l500.webp'
//         }
//       ]
//     },
//     {
//       order_detail_id: 59950,
//       product_id: 9,
//       quantity: 6,
//       unit_price: 988.83,
//       product_name: 'The Post Malone x Stanley Legendary Classic Bottle and Lunch Box Set',
//       description: 'Sample product description',
//       stock: 61,
//       product_image: [
//         {
//           id: 10,
//           image_url: 'https://i.ebayimg.com/images/g/W9wAAeSwtItpMmhe/s-l500.webp'
//         }
//       ]
//     }
//   ]
// }

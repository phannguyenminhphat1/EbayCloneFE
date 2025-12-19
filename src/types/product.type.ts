export interface ProductCategory {
  product_id: number
  product_name: string
  category_id: number
  category_name: string
  price: number
  product_image: string
}
export interface ListingProductDetail {
  id: number
  created_at: string
  deleted: boolean
  status: string
  category_id: number
  category_name: string
  user_id: number
  fullname: string
  email: string
  phone: string
  address: string
  avatar: string
  product_id: number
  product_name: string
  description: string
  starting_price: number
  current_price: null
  list_image_detail: string
  stock: number
  images: ImageType[]
  group_listing: number
  total_sold: number
  average_rating_score: number
}

export interface ImageType {
  Id: number
  ProductId: number
  ImageUrl: string
}

export interface ProductListConfig {
  page?: number | string
  page_size?: number | string
  sort_by?: 'created_at' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: number | string
}

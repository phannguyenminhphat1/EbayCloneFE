export interface CreatePostRequestBody {
  category_id: number
  title: string
  listing_description: string
  product_name: string
  description: string
  starting_price: number
  stock: number
  images: string[]
  // is_auction: boolean
  // end_date: string
}

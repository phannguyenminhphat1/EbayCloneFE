export interface ResponseApi<Data> {
  message: string
  data?: Data
}
export interface ResponsePageApi<Data> {
  data: Data
  pagination: Pagination
}
export interface Pagination {
  current_page: number
  page_size: number
  total_page: number
  total_item: number
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

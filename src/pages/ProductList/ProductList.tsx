import { useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import AsideFilter from 'src/components/AsideFilter'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: listListingProductDetailData } = useQuery({
    queryKey: ['listListingProductDetail', queryConfig],
    queryFn: () => productApi.getListListingProductDetail(queryConfig as ProductListConfig),
    placeholderData: (previousData) => previousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => categoryApi.getCategories()
  })

  return (
    <div className='ebay-font max-w-7xl mx-auto px-6 py-6 flex gap-10'>
      {listListingProductDetailData && (
        <>
          <aside className='w-72'>
            {categoriesData && <AsideFilter queryConfig={queryConfig} categories={categoriesData.data.data || []} />}
          </aside>

          <div className='flex-1'>
            <h1 className='text-4xl font-semibold'>{listListingProductDetailData.data.data!.data.category.name}</h1>

            <SortProductList
              queryConfig={queryConfig}
              totalPage={listListingProductDetailData.data.data!.pagination.total_page}
            />

            <div className='flex justify-between items-center mt-6 text-sm'>
              <p className='text-gray-600'>
                Total results: {listListingProductDetailData.data.data!.pagination.total_item} results
              </p>
            </div>

            {
              <div className='mt-6 space-y-6'>
                {listListingProductDetailData.data.data!.data.products.map((item) => {
                  const images = item.list_image_detail ? JSON.parse(item.list_image_detail) : []

                  return <Product key={item.product_id} prod={{ ...item, images }} />
                })}
                <Pagination
                  queryConfig={queryConfig}
                  totalPage={listListingProductDetailData.data.data!.pagination.total_page}
                />
              </div>
            }
          </div>
        </>
      )}
    </div>
  )
}

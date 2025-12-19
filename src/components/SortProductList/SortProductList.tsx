import classNames from 'classnames'
import { omit } from 'lodash'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { sortBy, order as orderConstant } from 'src/constant/productQueryConstant'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
  totalPage: number
}

export default function SortProductList({ totalPage, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by == sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderByValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderByValue
      }).toString()
    })
  }
  return (
    <div className='flex flex-wrap justify-between items-center gap-2 mt-3 mb-1'>
      <div className='flex items-center gap-2'>
        <p>Sort by: </p>
        <button
          className={classNames('border px-4 py-1.5 transition-all rounded-full text-sm', {
            'bg-blue-600 text-white hover:bg-blue-700 border-black': isActiveSortBy(sortBy.createdAt),
            'bg-white border-gray-400 hover:bg-gray-50': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Newest
        </button>
        <button
          className={classNames('border px-4 py-1.5 transition-all rounded-full text-sm', {
            'bg-blue-600 text-white hover:bg-blue-700 border-black': isActiveSortBy(sortBy.sold),
            'bg-white border-gray-400 hover:bg-gray-50': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          Sold
        </button>
        <select
          className={classNames('outline-none cursor-pointer rounded-full text-sm', {
            'bg-blue-600 text-white hover:bg-blue-700 border-black': isActiveSortBy(sortBy.price),
            'bg-white border-gray-400 text-black hover:bg-gray-50': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(e) => handlePriceOrder(e.target.value as 'asc' | 'desc')}
        >
          <option className='bg-white text-black' value='' disabled>
            Price
          </option>
          <option className='bg-white text-black' value={orderConstant.desc}>
            Price: Descending
          </option>
          <option className='bg-white text-black' value={orderConstant.asc}>
            Price: Increasing
          </option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className=''>
          <span className='text-black font-semibold'>{page}</span>
          <span>/{totalPage}</span>
        </div>
        <div className='ml-3 flex items-center'>
          {page == 1 ? (
            <span className='px-2 py-1 h-7 border hover:bg-gray-50 transition-all bg-white rounded-tl-sm rounded-bl-sm cursor-not-allowed'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.productList,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='block px-2 py-1 h-7 border hover:bg-gray-50 transition-all bg-white rounded-tl-sm rounded-bl-sm '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}
          {page == totalPage ? (
            <span className='px-2 py-1 h-7 border hover:bg-gray-50 transition-all bg-white rounded-tr-sm rounded-br-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
              block
            </span>
          ) : (
            <Link
              to={{
                pathname: path.productList,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='block px-2 py-1 h-7 border hover:bg-gray-50 transition-all bg-white rounded-tr-sm rounded-br-sm'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

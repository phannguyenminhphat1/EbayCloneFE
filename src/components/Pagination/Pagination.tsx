import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constant/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
interface Props {
  totalPage: number
  queryConfig: QueryConfig
}

const RANGE = 2
export default function Pagination({ queryConfig, totalPage }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < totalPage - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.productList,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 rounded border bg-white p-2 px-3 py-2 text-black shadow-sm hover:opacity-85', {
              'border-2 border-blue-600': pageNumber === page,
              'border-gray-300': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-5 flex flex-wrap items-center justify-center text-sm'>
      {page == 1 ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 p-2 px-3 py-2 text-black shadow-sm hover:opacity-85'>
          Prev
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
          className='mx-2 rounded border bg-white p-2 px-3 py-2 text-black shadow-sm hover:opacity-85'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page == totalPage ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 p-2 px-3 py-2 text-black shadow-sm hover:opacity-85'>
          Next
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
          className='mx-2 rounded border bg-white p-2 px-3 py-2 text-black shadow-sm hover:opacity-85'
        >
          Next
        </Link>
      )}
    </div>
  )
}

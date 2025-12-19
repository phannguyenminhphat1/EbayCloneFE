import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import Button from '../Button'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import { omit } from 'lodash'
import InputNumber from '../InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStars from '../RatingStars'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = {
  price_min: string
  price_max: string
}

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categories, queryConfig }: Props) {
  const navigate = useNavigate()
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const { category } = queryConfig

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.productList,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <>
      <Link
        to={path.productList}
        className={classNames('text-lg font-bold mb-2 flex items-center', {
          'font-semibold text-blue-600': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Categories
      </Link>

      <ul className='text-[15px]'>
        {categories.map((item) => {
          const isActive = Number(category) == item.id
          return (
            <li className='p-2' key={item.id}>
              <Link
                to={{
                  pathname: path.productList,
                  search: createSearchParams(
                    omit(
                      {
                        ...queryConfig,
                        category: item.id.toString()
                      },
                      ['order', 'sort_by', 'page', 'price_min', 'price_max']
                    )
                  ).toString()
                }}
                className={classNames('relative ml-2 transition-all', {
                  'font-semibold text-blue-600 hover:text-blue-700': isActive,
                  'font-normal text-black hover:text-blue-700': !isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-18px] top-[2px] h-3 w-3 fill-blue-600'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}

                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <hr className='bg-gray-300' />

      <Link to={path.home} className='text-lg font-semibold mt-4 mb-1 flex items-center'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Filter
      </Link>
      <hr className='bg-gray-300' />
      <p className='mt-4 mb-2 text-[15px] font-semibold'>Price range</p>
      <form className='' onSubmit={onSubmit}>
        <div className='flex items-center gap-2'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => (
              <InputNumber
                placeholder='From'
                type='text'
                className='grow'
                name='from'
                classNameError='hidden'
                classNameInput='placeholder:text-gray-400 py-1 px-2 w-full border text-sm text-gray-700 border-gray-300 focus:border-gray-400 rounded focus:shadow-sm'
                onChange={(event) => {
                  field.onChange(event)
                  trigger('price_max')
                }}
              />
            )}
          />
          <div className='text-gray-400'>-</div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => (
              <InputNumber
                type='text'
                className='grow'
                classNameError='hidden'
                placeholder='To'
                classNameInput='placeholder:text-gray-400 py-1 px-2 w-full border text-sm text-gray-700 border-gray-300 focus:border-gray-400 rounded focus:shadow-sm'
                {...field}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('price_min')
                }}
              />
            )}
          />
        </div>
        <div className='mt-1 text-red-600 text-[13px] min-h-[1.25rem] text-center'>{errors.price_min?.message}</div>
        <Button className='mb-4 w-full bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer text-white p-2 rounded text-sm'>
          Apply
        </Button>
      </form>
      <hr className='bg-gray-300' />
      <p className='mt-4 mb-2 text-[15px] font-semibold'>Ratings</p>
      <RatingStars queryConfig={queryConfig} />

      <hr className='bg-gray-300 mt-4' />
      <Button
        onClick={handleRemoveAll}
        className='my-4 w-full bg-red-600 hover:bg-red-700 transition-all cursor-pointer text-white p-2 rounded text-sm'
      >
        Reset All Filters
      </Button>
    </>
  )
}

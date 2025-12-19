import { createSearchParams, Link, NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Popover from '../Popover'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constant/path'
import categoryApi from 'src/apis/category.api'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { omit } from 'lodash'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import purchaseApi from 'src/apis/purchase.api'
import { purchaseStatusString } from 'src/constant/purchaseConstant'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { generateNameId } from 'src/utils/utils'

type FormData = Pick<Schema, 'product_name'> & {
  category_id?: string
}
const MAX_PURCHASES = 4

const formSchema = schema.pick(['product_name'])

export default function Header() {
  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      product_name: '',
      category_id: ''
    },
    resolver: yupResolver<FormData>(formSchema)
  })
  const rfToken = getRefreshTokenFromLS()

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout({ refresh_token: rfToken }),
    onSuccess: (res) => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success(res.data.message, { autoClose: 1000 })
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatusString.InCart }] })
    }
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => categoryApi.getCategories()
  })

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatusString.InCart }],
    queryFn: () => purchaseApi.getOrders({ status: purchaseStatusString.InCart as PurchaseListStatus }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data?.data.orders

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.product_name,
            category: data.category_id || ''
          },
          ['order', 'sort_by', 'price_min', 'price_max']
        )
      : omit(
          {
            ...queryConfig,
            name: data.product_name,
            category: data.category_id || ''
          },
          ['price_min', 'price_max']
        )
    navigate({
      pathname: path.productList,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <header className='shadow bg-white'>
      {/* Title and Login */}
      <div className='py-1 bg-gray-100 text-xs'>
        <div className='container'>
          <div className='flex justify-end items-center'>
            <div>
              <NavLink
                to='https://www.ebay.com/help/home'
                className='mr-8 outline-none hover:underline hover:text-blue-600'
              >
                Help & Contact
              </NavLink>
            </div>
            {isAuthenticated && (
              <Popover
                placement='bottom-end'
                className='text-black hover:opacity-60 transition-all cursor-pointer'
                children={<p>Hi! {profile?.username}</p>}
                classNameArrow='absolute z-10 translate-y-[-95%] border-[13px] border-x-transparent border-white border-t-transparent'
                renderPopover={
                  <div className='bg-white relative shadow-2xl text-black rounded-md overflow-hidden text-xs'>
                    <div className='text-left'>
                      <NavLink
                        to={path.profile}
                        className='text-left block w-full py-3 px-8 hover:bg-gray-100 hover:text-black text-gray-700 transition-all'
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left py-3 px-8 hover:bg-gray-100 hover:text-black text-gray-700 transition-all'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                }
              />
            )}
            {!isAuthenticated && (
              <div>
                Hi!{' '}
                <span>
                  <NavLink to={path.login} className='underline text-blue-600'>
                    Sign in
                  </NavLink>
                </span>{' '}
                or
                <span>
                  <NavLink to={path.register} className='underline text-blue-600'>
                    {' '}
                    Register
                  </NavLink>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and cart */}
      <div className='container py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <NavLink to={path.home}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='117'
              height='48'
              viewBox='0 0 122 48.592'
              id='gh-logo'
              aria-labelledby='ebayLogoTitle'
            >
              <title id='ebayLogoTitle'>eBay Home</title>
              <g>
                <path
                  fill='#F02D2D'
                  d='M24.355 22.759c-.269-5.738-4.412-7.838-8.826-7.813-4.756.026-8.544 2.459-9.183 7.915zM6.234 26.93c.364 5.553 4.208 8.814 9.476 8.785 3.648-.021 6.885-1.524 7.952-4.763l6.306-.035c-1.187 6.568-8.151 8.834-14.145 8.866C4.911 39.844.043 33.865-.002 25.759c-.05-8.927 4.917-14.822 15.765-14.884 8.628-.048 14.978 4.433 15.033 14.291l.01 1.625z'
                ></path>
                <path
                  fill='#0968F6'
                  d='M46.544 35.429c5.688-.032 9.543-4.148 9.508-10.32s-3.947-10.246-9.622-10.214-9.543 4.148-9.509 10.32 3.974 10.245 9.623 10.214zM30.652.029l6.116-.034.085 15.369c2.978-3.588 7.1-4.65 11.167-4.674 6.817-.037 14.412 4.518 14.468 14.454.045 8.29-5.941 14.407-14.422 14.454-4.463.026-8.624-1.545-11.218-4.681a33.237 33.237 0 01-.19 3.731l-5.994.034c.09-1.915.185-4.364.174-6.322z'
                ></path>
                <path
                  fill='#FFBD14'
                  d='M77.282 25.724c-5.548.216-8.985 1.229-8.965 4.883.013 2.365 1.94 4.919 6.7 4.891 6.415-.035 9.826-3.556 9.794-9.289v-.637c-2.252.02-5.039.054-7.529.152zm13.683 7.506c.01 1.778.071 3.538.232 5.1l-5.688.032a33.381 33.381 0 01-.225-3.825c-3.052 3.8-6.708 4.909-11.783 4.938-7.532.042-11.585-3.915-11.611-8.518-.037-6.665 5.434-9.049 14.954-9.318 2.6-.072 5.529-.1 7.945-.116v-.637c-.026-4.463-2.9-6.285-7.854-6.257-3.68.021-6.368 1.561-6.653 4.2l-6.434.035c.645-6.566 7.53-8.269 13.595-8.3 7.263-.04 13.406 2.508 13.448 10.192z'
                ></path>
                <path
                  fill='#92C821'
                  d='M91.939 19.852l-4.5-8.362 7.154-.04 10.589 20.922 10.328-21.02 6.486-.048-18.707 37.251-6.85.039 5.382-10.348-9.887-18.393'
                ></path>
              </g>
            </svg>
          </NavLink>
        </div>

        {/* Search bar */}
        <form className='flex flex-1 mx-6' onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Search for anything'
            className='flex-1 border outline-none border-r-0 px-4 py-2 rounded-l text-[15px]'
            {...register('product_name')}
          />

          <select {...register('category_id')} className='border max-w-40  px-3 py-2 text-sm'>
            <option value=''>All Categories</option>
            {categoriesData &&
              categoriesData.data.data?.map((item) => {
                return (
                  <option value={item.id} className='' key={item.id}>
                    {item.name}
                  </option>
                )
              })}
          </select>
          <button className='bg-blue-600 text-white px-5 py-2 rounded-r hover:bg-blue-700'>Search</button>
        </form>
        {/* Cart */}
        <Popover
          placement='bottom-end'
          classNameArrow='absolute z-10 translate-y-[-95%] border-[13px] border-x-transparent border-white border-t-transparent'
          children={
            <>
              <ShoppingCartIcon className='w-7 h-7' />

              {/* Badge (nếu muốn show số lượng) */}
              {isAuthenticated && purchasesInCart && (
                <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                  {purchasesInCart[0].order_details.length}
                </span>
              )}
            </>
          }
          renderPopover={
            <div className='w-80 bg-white rounded-xl shadow-xl border overflow-hidden'>
              {purchasesInCart && purchasesInCart.length > 0 ? (
                <div className='text-sm'>
                  {/* Header */}
                  <div className='p-4 border-b'>
                    <h2 className='font-semibold text-lg'>Shopping cart</h2>
                  </div>
                  {/* Item */}
                  {purchasesInCart[0].order_details.slice(0, MAX_PURCHASES).map((item) => {
                    return (
                      <div className='p-3 flex gap-3 border-b'>
                        <img
                          src={item.product_image[0].image_url}
                          className='w-12 h-12 rounded object-cover'
                          alt='item'
                        />
                        <div className='flex-1'>
                          <Link
                            to={`/product-detail/${generateNameId({ name: item.product_name, id: item.product_id.toString() })}`}
                            className='text-sm text-blue-600 hover:underline line-clamp-2'
                          >
                            {item.product_name}
                          </Link>
                          <div className='mt-1'>
                            <p className='font-semibold'>Unit Price: ${item.unit_price}</p>
                          </div>
                        </div>
                        <div className='flex flex-col items-end justify-between'>
                          <span className='text-sm text-gray-600'>Qty: {item.quantity}</span>
                          <button className='text-gray-500 hover:text-red-500'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='size-6'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  {/* Total */}
                  <div className='p-4 border-b flex justify-between text-[15px]'>
                    <span className='font-medium'>Total</span>
                    <span className='font-semibold'>${purchasesInCart[0].total_amount}</span>
                  </div>
                  {/* Other */}
                  {purchasesInCart[0].order_details.length > MAX_PURCHASES && (
                    <div className='px-4 py-2'>
                      <span className=''>
                        Other {purchasesInCart[0].order_details.length - MAX_PURCHASES} items in cart
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className='p-4 flex flex-col gap-3'>
                    <button className='bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition'>
                      Checkout
                    </button>
                    <button className='border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition'>
                      View cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className='p-4 text-sm flex flex-col items-center justify-center text-gray-600'>
                  <img
                    src='	https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
                    alt='no-image'
                    className='w-40 h-w-40 object-cover'
                  />
                  <p>No items in cart</p>
                </div>
              )}
            </div>
          }
          className='relative cursor-pointer hover:text-blue-600'
        />
      </div>
      <Navbar />
    </header>
  )
}

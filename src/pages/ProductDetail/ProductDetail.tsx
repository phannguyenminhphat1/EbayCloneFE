import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constant/path'
import { purchaseStatusString } from 'src/constant/purchaseConstant'
import { AppContext } from 'src/contexts/app.context'
import { ImageType, ListingProductDetail } from 'src/types/product.type'
import { getIdFromNameId } from 'src/utils/utils'
import Swal from 'sweetalert2'

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [buyCount, setBuyCount] = useState(1)
  const id = getIdFromNameId(nameId as string)

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const { data: getListingProductDetailData } = useQuery({
    queryKey: ['get-listing-product-detail', id],
    queryFn: () => productApi.getListingProductDetailById(id as string)
  })

  const product = getListingProductDetailData?.data.data
  const imagesProduct: ImageType[] = useMemo(() => {
    if (!product?.product?.list_image_detail) return []
    try {
      return JSON.parse(product.product.list_image_detail)
    } catch {
      return []
    }
  }, [product])

  const currentImages: ImageType[] = useMemo(() => {
    return imagesProduct.slice(...currentIndexImages)
  }, [imagesProduct, currentIndexImages])

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })

  useEffect(() => {
    if (product && imagesProduct.length > 0) {
      setActiveImage(imagesProduct[0].ImageUrl)
    }
  }, [imagesProduct, product])

  if (!product) return null

  const listingId = product.product.id

  const prod: ListingProductDetail = {
    ...product.product,
    images: imagesProduct
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleNext = () => {
    if (currentIndexImages[1] < imagesProduct.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handlePrev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'You’re logged out',
        text: 'Log in to add to cart',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    } else {
      addToCartMutation.mutate(
        { listing_id: Number(listingId), quantity: buyCount.toString() },
        {
          onSuccess: (res) => {
            toast.success(res.data.message, { autoClose: 1000 })
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatusString.InCart }] })
          },
          onError: (err) => {
            toast.error(err.message, { autoClose: 1000 })
          }
        }
      )
    }
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'You’re logged out',
        text: 'Log in to add to cart',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    } else {
      addToCartMutation.mutate(
        { listing_id: Number(listingId), quantity: buyCount.toString() },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatusString.InCart }] })
            navigate(path.cart, {
              state: {
                orderDetailId: res.data.data?.order_detail_id
              }
            })
          },
          onError: (err) => {
            toast.error(err.message, { autoClose: 1000 })
          }
        }
      )
    }
  }

  return (
    <div className='container py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* LEFT SECTION */}
        <div className='grid grid-cols-6 gap-4'>
          {/* Thumbnails */}
          <div className='col-span-1 relative flex flex-col items-center space-y-3'>
            {/* UP button */}
            <button
              className='absolute top-0 left-1/2 -translate-x-1/2 border transition-all -translate-y-1/2 
               bg-white shadow p-2 rounded-full hover:bg-gray-200 z-10'
              onClick={handlePrev}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
              </svg>
            </button>

            {/* Images */}
            {currentImages.map((item) => {
              const isActive = item.ImageUrl === activeImage
              return (
                <div key={item.Id} className='relative w-full' onMouseEnter={() => chooseActive(item.ImageUrl)}>
                  <img src={item.ImageUrl} className='w-full h-20 p-2 object-contain border rounded' />
                  {isActive && <div className='absolute inset-0 border-2 border-red-500 rounded'></div>}
                </div>
              )
            })}

            {/* DOWN button */}
            <button
              className='absolute bottom-0 left-1/2 -translate-x-1/2 border transition-all translate-y-1/2 
               bg-white shadow p-2 rounded-full hover:bg-gray-200 z-10'
              onClick={handleNext}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
          </div>

          {/* Main Image */}
          <div className='col-span-5'>
            <img src={activeImage} alt={prod.product_name} className='w-full h-full object-contain rounded border' />
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div>
          {/* Title */}
          <h1 className='text-2xl font-semibold mb-2'>{product.product.product_name}</h1>
          {/* Seller Info */}
          <div className='flex items-center gap-2 mb-4'>
            <img src={product.product.avatar} className='w-10 h-10 rounded-full' />
            <div>
              <p className='font-semibold'>{product.product.fullname}</p>
              <p className='text-sm text-gray-500'>{product.product.email}</p>
            </div>
          </div>
          {/* Price */}
          <div className='my-4'>
            <p className='text-2xl font-bold'>US ${product.product.starting_price}</p>
          </div>
          {/* Condition */}
          <div className='my-4'>
            <p className='font-semibold'>
              Condition: <span className='text-gray-600'>Good - Refurbished</span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              “ {product.product.description} The item shows moderate wear and is fully functional…”
            </p>
          </div>
          <div className='my-4'>
            <p className='font-semibold mb-2'>Quantity:</p>
            <div className='flex items-center'>
              <QuantityController
                value={buyCount}
                onIncrease={handleBuyCount}
                onDecrease={handleBuyCount}
                onType={handleBuyCount}
                max={product.product.stock}
              />
              <span className='ml-3 text-gray-500'>• {prod.total_sold} sold</span>
            </div>
            <p className='text-sm mt-2 text-gray-600'>In stock: {prod.stock}</p>
          </div>

          {/* BUTTONS */}
          <div className='space-y-3 mt-6'>
            <button
              onClick={handleBuyNow}
              className='w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700'
            >
              Buy It Now
            </button>
            <button
              onClick={handleAddToCart}
              className='w-full py-3 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className='w-full mt-10'>
        <div className='flex justify-between items-center px-2 mb-4'>
          <h2 className='text-2xl font-semibold'>Customers ultimately bought</h2>
          <Link
            to={`/product-list?category=${prod.category_id}`}
            className='text-blue-600 hover:underline text-sm font-medium'
          >
            See all
          </Link>
        </div>
        <div className='flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-2'>
          {product.related_product.slice(1, 8).map((relatedProduct) => {
            const images: ImageType[] = relatedProduct.list_image_detail
              ? JSON.parse(relatedProduct.list_image_detail)
              : []
            return (
              <Link
                to={`/product-detail/${relatedProduct.product_id}`}
                className='block min-w-[260px] max-w-[260px] bg-white rounded-lg shadow p-4 hover:-translate-y-1 transition-all'
                key={relatedProduct.id}
              >
                <div className='relative'>
                  <img src={images[0].ImageUrl} className=' w-full h-64 object-contain rounded' alt='asd' />
                </div>
                <p className='mt-2 text-sm font-medium leading-tight'>{relatedProduct.product_name}</p>
                <p className='text-gray-600 text-sm mt-1'>New</p>
                <p className='text-lg font-semibold text-black mt-1'>${relatedProduct.starting_price}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

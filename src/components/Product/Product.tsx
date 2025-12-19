import { Link } from 'react-router-dom'
import { ListingProductDetail } from 'src/types/product.type'
import ProductRating from '../ProductRating'
import { generateNameId } from 'src/utils/utils'

interface Props {
  className?: string
  prod: ListingProductDetail
}

export default function Product({ prod }: Props) {
  const formatted = (valueDate: Date) => {
    return `${valueDate.getFullYear()}/${String(valueDate.getMonth() + 1).padStart(2, '0')}/${String(valueDate.getDate()).padStart(2, '0')}
 - ${String(valueDate.getHours()).padStart(2, '0')}:${String(valueDate.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className='flex gap-6 p-4 border rounded-lg shadow-sm hover:shadow transition'>
      {/* Product Image */}
      <Link
        to={`/product-detail/${generateNameId({ name: prod.product_name, id: prod.id.toString() })}`}
        className='w-52 h-full block bg-gray-100 rounded-lg overflow-hidden'
      >
        <img
          src={
            prod.images.length > 0
              ? prod.images[0].ImageUrl
              : 'https://i.ebayimg.com/images/g/t 08AAOSw-qdjZqUP/s-l1600.webp'
          }
          alt={prod.product_name}
          className='w-full h-full object-cover'
        />
      </Link>

      {/* Product Info */}
      <div className='flex flex-col justify-between flex-1'>
        <div>
          <Link
            className='text-2xl font-semibold hover:underline transition-all'
            to={`/product-detail/${generateNameId({ name: prod.product_name, id: prod.id.toString() })}`}
          >
            {prod.product_name}
          </Link>

          {/* Seller Info */}
          <div className='flex items-center gap-3 my-2'>
            <img
              src={prod.avatar}
              alt={prod.fullname}
              className='w-8 h-8 rounded-full object-cover border border-gray-600'
            />
            <div className='text-sm'>
              <p className='font-medium'>{prod.fullname}</p>
              <p className='text-gray-500'>Created at: {formatted(new Date(prod.created_at))}</p>
            </div>
          </div>

          <p className='text-gray-600 text-sm'>Good · Refurbished · Lenovo</p>

          <p className='text-xl font-bold text-black mt-2'>${prod.starting_price}</p>

          <p className='text-gray-600 text-sm mt-1'>Free international shipping</p>
          <ProductRating rating={prod.average_rating_score} />
          <p className='text-red-500 text-sm mt-1 mb-2'>Sold: {prod.total_sold}</p>
        </div>

        <div>
          <span className='inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs'>eBay Refurbished</span>
        </div>
      </div>
    </div>
  )
}

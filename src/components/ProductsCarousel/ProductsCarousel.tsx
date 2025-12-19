import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { Link } from 'react-router-dom'
import { generateNameId } from 'src/utils/utils'

export default function ProductsCarousel() {
  const { data: productsCategoryData } = useQuery({
    queryKey: ['products-category'],
    queryFn: () => productApi.getProducts()
  })

  return (
    <div className='w-full px-4'>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={5}
        className='pb-10'
      >
        {productsCategoryData?.data.data?.data.map((item) => (
          <SwiperSlide key={item.product_id}>
            <Link
              to={`/product-detail/${generateNameId({ name: item.product_name, id: item.product_id.toString() })}`}
              className='block rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer hover:-translate-y-1'
            >
              <img src={item.product_image} className='w-full h-60 object-cover rounded-xl bg-transparent' />
              <h3 className='mt-3 font-semibold line-clamp-2'>{item.product_name}</h3>
              <p className='mt-2 font-thin text-sm'>${item.price}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

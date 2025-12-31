import { useQuery } from '@tanstack/react-query'
import { Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import categoryApi from 'src/apis/category.api'
import { generateNameId } from 'src/utils/utils'

export default function Post() {
  const [openModal, setOpenModal] = useState(false)

  const { data: categoriesData } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => categoryApi.getCategories()
  })
  const categories = categoriesData?.data.data
  return (
    <div className='container py-8 '>
      <div className='flex-1 bg-white rounded-lg shadow p-6'>
        {/* Tabs */}
        <div className='border-b mb-6 py-2'>
          <div className='flex items-center justify-between font-semibold text-sm'>
            <div className='flex items-center gap-8'>
              <button className='pb-3 border-b-2 border-blue-600 text-blue-600'>Active (2)</button>
              <button className='pb-3 text-gray-500 hover:text-blue-600'>Sold</button>
              <button className='pb-3 text-gray-500 hover:text-blue-600'>Expired</button>
              <button className='pb-3 text-gray-500 hover:text-blue-600'>Rejected</button>
              <button className='pb-3 text-gray-500 hover:text-blue-600'>Pending approval</button>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className='p-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer'
            >
              Post new
            </button>
            <Modal position={'center'} dismissible show={openModal} onClose={() => setOpenModal(false)}>
              <ModalHeader>Post New</ModalHeader>
              <p className='m-4 mb-2 font-semibold'>Choose Category</p>
              <ModalBody className='p-0'>
                {categories && categories.length > 0 ? (
                  categories.map((cate) => (
                    <Link
                      key={cate.id}
                      className='flex items-center justify-between hover:bg-gray-100 transition-all p-4'
                      to={`/post/${generateNameId({ name: cate.name, id: cate.id.toString() })}`}
                    >
                      <div className='flex items-center gap-3'>
                        <img src={cate.image} className='w-16 h-16 object-cover border rounded-full' />
                        <div className='text-sm'>
                          <p className='font-semibold'>{cate.name}</p>
                          <p className='text-gray-500 mt-1 max-w-[90%]'>
                            {cate.name} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, laborum.
                          </p>
                        </div>
                      </div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-5'
                      >
                        <path strokeLinecap='round' stroke-linejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
                      </svg>
                    </Link>
                  ))
                ) : (
                  <div></div>
                )}
              </ModalBody>
            </Modal>
          </div>
        </div>
        {/* Bulk actions */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <input type='checkbox' className='accent-blue-600' />
            <span className='text-sm'>Select all</span>
            <button className='text-sm text-red-600 hover:underline'>Delete</button>
          </div>
          <div className='text-sm text-gray-500'>2 listings</div>
        </div>
        {/* Listing item */}
        <div className='border rounded-lg mb-4'>
          <div className='flex items-center gap-4 p-4'>
            {/* Checkbox */}
            <input type='checkbox' className='accent-blue-600 mt-1' />
            {/* Image */}
            <img
              src='https://i.ebayimg.com/images/g/ry4AAOSw46Foltmg/s-l140.webp'
              className='w-24 h-24 object-cover border rounded'
            />
            {/* Info */}
            <div className='flex-1'>
              <h3 className='font-semibold line-clamp-2 hover:underline cursor-pointer'>
                Lenovo ThinkPad Laptop Core i7 16GB RAM 512GB SSD Windows 11 Pro
              </h3>
              <div className='flex items-center gap-3 mt-1 text-sm text-gray-500'>
                <span>Item ID: 45872391</span>
                <span>•</span>
                <span>Qty: 1</span>
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <span className='text-xs px-2 py-1 rounded bg-green-100 text-green-700'>Active</span>
                <span className='text-xs px-2 py-1 rounded bg-gray-100 text-gray-600'>Fixed price</span>
              </div>
            </div>
            {/* Price & actions */}
            <div className='text-right space-y-2'>
              <div>
                <p className='font-semibold text-lg'>$317.08</p>
                <p className='text-sm text-gray-500'>7 sold</p>
              </div>
              <div className='flex gap-3 text-sm justify-end'>
                <button className='text-blue-600 hover:underline'>Edit</button>
                <button className='text-red-600 hover:underline'>End</button>
              </div>
            </div>
          </div>
        </div>
        {/* Another item */}
        <div className='border rounded-lg mb-4'>
          <div className='flex items-center gap-4 p-4'>
            <input type='checkbox' className='accent-blue-600 mt-1' />
            <img
              src='https://i.ebayimg.com/images/g/t08AAOSw-qdjZqUP/s-l1600.webp'
              className='w-24 h-24 object-cover border rounded'
            />
            <div className='flex-1'>
              <h3 className='font-semibold line-clamp-2 hover:underline cursor-pointer'>
                Dell Latitude Laptop Light Gaming PC Core i7 16GB RAM
              </h3>
              <div className='flex items-center gap-3 mt-1 text-sm text-gray-500'>
                <span>Item ID: 87451233</span>
                <span>•</span>
                <span>Qty: 1</span>
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <span className='text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700'>Pending approval</span>
              </div>
            </div>
            <div className='text-right space-y-2'>
              <div>
                <p className='font-semibold text-lg'>$634.16</p>
                <p className='text-sm text-gray-500'>0 sold</p>
              </div>
              <div className='flex gap-3 text-sm justify-end'>
                <button className='text-blue-600 hover:underline'>Edit</button>
                <button className='text-red-600 hover:underline'>Delete</button>
              </div>
            </div>
          </div>
        </div>
        {/* Empty state */}
        {/*
  <div class="flex flex-col items-center py-12 text-gray-500">
    <img
src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png"
class="w-48"
    />
    <p class="mt-3">No listings found</p>
  </div>
  */}
      </div>
    </div>
  )
}

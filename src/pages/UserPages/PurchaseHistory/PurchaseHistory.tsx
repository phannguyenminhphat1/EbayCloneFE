import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constant/path'
import { purchaseStatusString } from 'src/constant/purchaseConstant'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatted, generateNameId } from 'src/utils/utils'
import Swal from 'sweetalert2'

export default function PurchaseHistory() {
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const status: string = queryParams.status

  const purchaseTab = [
    { status: purchaseStatusString.WaitingOwnerConfirmation, name: 'Waiting Confirmation' },
    { status: purchaseStatusString.Completed, name: 'Completed' },
    { status: purchaseStatusString.Canceled, name: 'Canceled' }
  ]

  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchases', { status: status }],
    queryFn: () => purchaseApi.getOrders({ status: status as PurchaseListStatus })
  })

  const cancelOrderMutation = useMutation({
    mutationFn: purchaseApi.cancelOrder,
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 1000 })
      refetch()
    }
  })
  console.log(purchasesData?.data.data?.data)

  useEffect(() => {
    if (!status) {
      navigate(
        {
          pathname: path.purchaseHistory,
          search: createSearchParams({
            status: purchaseStatusString.WaitingOwnerConfirmation
          }).toString()
        },
        { replace: true }
      )
    }
  }, [status, navigate])

  const handleCancelPurchase = (orderId: string) => {
    Swal.fire({
      title: 'Do you want to cancel this order ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Cancel',
      cancelButtonText: 'No Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrderMutation.mutate(orderId)
      }
    })
  }
  const purchasesTabLink = purchaseTab.map((item) => (
    <Link
      key={item.status}
      to={{
        pathname: path.purchaseHistory,
        search: createSearchParams({
          status: item.status
        }).toString()
      }}
      className={classNames('pb-3 transition-all', {
        'border-b-2 border-blue-600 text-blue-600': status === item.status,
        'text-gray-500 hover:text-blue-600': status !== item.status
      })}
    >
      {item.name}
    </Link>
  ))
  return (
    <div className='flex-1 bg-white rounded-lg shadow p-6'>
      {/* Tabs */}
      <div className='border-b mb-6'>
        <div className='flex space-x-10 font-semibold'>{purchasesTabLink}</div>
      </div>
      {/* Order Item */}
      {purchasesData &&
        purchasesData.data.data?.data.orders.map((order) => (
          <div key={order.order_id} className='border rounded-lg mb-6'>
            {/* Order Header */}
            <div className='flex items-center justify-between px-4 py-3 bg-gray-50 rounded-t-lg'>
              <div className='flex items-center gap-2'>
                <span className='font-semibold'>Order #{order.order_id}</span>
                <span className='text-xs text-green-600 bg-green-100 px-2 py-1 rounded'>{order.order_status}</span>
              </div>
              <div className='text-sm text-gray-500'>Created Date: {formatted(new Date(order.order_created_at))}</div>
            </div>

            {/* Order Details */}
            {order.order_details.map((item) => (
              <div key={item.order_detail_id} className='flex gap-4 p-4 border-t'>
                <img
                  src={item.product.product_image[0]?.image_url}
                  alt={item.product.product_name}
                  className='w-20 border p-2 h-20 object-cover rounded'
                />

                <div className='flex-1'>
                  <Link
                    to={`/product-detail/${generateNameId({ name: item.product.product_name, id: item.product.product_id.toString() })}`}
                    className='font-semibold line-clamp-2 hover:underline transition-all'
                  >
                    {item.product.product_name}
                  </Link>
                  <p className='text-sm text-gray-500 mt-1'>Quantity: {item.quantity}</p>

                  <div className='flex items-center gap-1 mt-1'>
                    <span className='text-sm text-gray-500'>Seller: </span>
                    <img
                      src={item.seller.seller_avatar || 'https://i.pravatar.cc/150'}
                      className='w-5 h-5 rounded-full border border-gray-600'
                    />
                    <span className='text-sm text-gray-600'>{item.seller.seller_fullname}</span>
                  </div>
                </div>

                <div className='text-right'>
                  <p className='font-semibold text-gray-900'>${item.unit_price.toFixed(2)}</p>
                </div>
              </div>
            ))}

            {/* Order Footer */}
            <div className='flex items-center justify-between px-4 py-3 border-t bg-gray-50'>
              <div className='text-sm'>
                <span className='text-gray-500'>Total:</span>
                <span className='font-semibold text-lg ml-2'>${order.total_amount.toFixed(2)}</span>
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={() => handleCancelPurchase(order.order_id.toString())}
                  className='px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50'
                >
                  Cancel order
                </button>
              </div>
            </div>
          </div>
        ))}

      {purchasesData && purchasesData.data.data?.data.orders.length === 0 && (
        <div className='p-4 text-sm flex flex-col items-center justify-center text-gray-600'>
          <img
            src='	https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
            alt='no-image'
            className='w-52 h-w-52 object-cover'
          />
          <p className='text-red-500 mt-2'>No items</p>
        </div>
      )}

      {/* Another Order (Completed example)
      <div className='border rounded-lg'>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-50 rounded-t-lg'>
          <div className='flex items-center gap-3'>
            <span className='font-semibold'>Acer Official Store</span>
            <span className='text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded'>Completed</span>
          </div>
          <span className='text-sm text-gray-500'>Order #EB654321</span>
        </div>
        <div className='flex gap-4 p-4 border-t'>
          <img src='https://via.placeholder.com/80' alt='asd' className='w-20 h-20 object-cover rounded' />
          <div className='flex-1'>
            <p className='font-semibold line-clamp-2'>Acer Aspire 3 Ryzen 5 16GB RAM 1TB SSD</p>
            <p className='text-sm text-gray-500 mt-1'>Qty: 1</p>
          </div>
          <div className='text-right'>
            <p className='font-semibold text-gray-900'>$295.99</p>
          </div>
        </div>
        <div className='flex items-center justify-between px-4 py-3 border-t bg-gray-50'>
          <div className='text-sm'>
            <span className='text-gray-500'>Total:</span>
            <span className='font-semibold text-lg ml-2'>$295.99</span>
          </div>
          <div className='flex gap-3'>
            <button className='px-4 py-2 text-sm border rounded hover:bg-gray-100'>View details</button>
            <button className='px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'>Buy again</button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

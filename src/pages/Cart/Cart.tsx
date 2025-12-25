import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import { purchaseStatusString } from 'src/constant/purchaseConstant'
import { OrderDetailType, PurchaseListStatus } from 'src/types/purchase.type'
import { produce } from 'immer'
import QuantityController from 'src/components/QuantityController'
import { toast } from 'react-toastify'
import { keyBy } from 'lodash'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constant/path'

export default function Cart() {
  const { extendedPurchaseInCartDetail, setExtendedPurchaseInCartDetail } = useContext(AppContext)
  const location = useLocation()
  const choosenOrderDetailIdFromLocation = (location.state as { orderDetailId: number | null })?.orderDetailId

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatusString.InCart }],
    queryFn: () => purchaseApi.getOrders({ status: purchaseStatusString.InCart as PurchaseListStatus })
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deleteOrderDetails,
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 1000 })
      refetch()
    }
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 1000 })
      refetch()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data?.data.orders
  const purchasesInCartDetail = purchasesInCartData?.data.data?.data.orders[0].order_details
  useEffect(() => {
    setExtendedPurchaseInCartDetail((prev) => {
      const extendedPurchaseObject = keyBy(prev, 'order_detail_id')
      return (
        purchasesInCartDetail?.map((purchase) => {
          const isChoosenOrderDetailIdFromLocation = purchase.order_detail_id === choosenOrderDetailIdFromLocation
          return {
            ...purchase,
            checked:
              isChoosenOrderDetailIdFromLocation || Boolean(extendedPurchaseObject[purchase.order_detail_id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
    return () => {
      history.replaceState(null, '')
    }
  }, [choosenOrderDetailIdFromLocation, purchasesInCartDetail, setExtendedPurchaseInCartDetail])

  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchaseInCartDetail(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updateOrderDetail,
    onSuccess: (res) => {
      refetch()
      toast.success(res.data.message, { autoClose: 500 })
    }
  })

  const isAllChecked = useMemo(
    () => extendedPurchaseInCartDetail.every((item) => item.checked),
    [extendedPurchaseInCartDetail]
  )
  const checkedPurchases = useMemo(
    () => extendedPurchaseInCartDetail.filter((item) => item.checked),
    [extendedPurchaseInCartDetail]
  )
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchases = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.quantity * current.unit_price
      }, 0),
    [checkedPurchases]
  )
  const handleCheckedAll = () => {
    setExtendedPurchaseInCartDetail((prev) =>
      prev.map((item) => {
        return {
          ...item,
          checked: !isAllChecked
        }
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchaseInCartDetail[purchaseIndex]
      setExtendedPurchaseInCartDetail(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ order_detail_id: purchase.order_detail_id, quantity: value.toString() })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchaseInCartDetail(
      produce((draft) => {
        draft[purchaseIndex].quantity = value
      })
    )
  }

  const handleDeletePurchase = (orderDetailId: number) => {
    deletePurchasesMutation.mutate({ ids: [orderDetailId] })
  }

  const handleDeleteManyPurchases = () => {
    const ids = checkedPurchases.map((item) => item.order_detail_id)
    deletePurchasesMutation.mutate({ ids })
  }

  const handleBuyProducts = () => {
    if (checkedPurchasesCount > 0) {
      const ids = checkedPurchases.map((item) => item.order_detail_id)
      buyProductsMutation.mutate({ ids })
    }
  }

  return (
    <div className='container py-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {extendedPurchaseInCartDetail.length > 0 ? (
        <>
          {/* LEFT: CART ITEMS */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Select all */}
            <div className='flex items-center justify-between border-b pb-4'>
              <div className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  className='w-5 h-5 text-blue-600 rounded-sm border border-gray-600'
                  onChange={handleCheckedAll}
                  checked={isAllChecked}
                />
                <span className='font-medium'>Select all items ({checkedPurchasesCount || 0})</span>
              </div>
              <button onClick={handleDeleteManyPurchases} className='text-sm text-gray-600 hover:text-red-600'>
                Delete selected
              </button>
            </div>
            {/* SELLER BLOCK */}
            {purchasesInCart &&
              extendedPurchaseInCartDetail.map((item, index) => {
                return (
                  <div className='border rounded-xl p-4 space-y-4' key={item.order_detail_id}>
                    {/* Seller header */}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={item.seller.seller_avatar}
                          alt='seller-ava'
                          className='w-7 h-7 object-cover rounded-full border border-red-700'
                        />
                        <div>
                          <p className='font-semibold'>{item.seller.seller_fullname}</p>
                          <p className='text-sm text-gray-500'>{item.seller.seller_email}</p>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCT ITEM */}
                    <div className='flex gap-4 border-t pt-4'>
                      {/* Checkbox */}
                      <input
                        type='checkbox'
                        className='mt-2 w-5 h-5 text-blue-600 border border-gray-500 rounded-sm'
                        checked={item.checked}
                        onChange={handleChecked(index)}
                      />
                      {/* Image */}
                      <img
                        src={item.product.product_image[0].image_url}
                        className='w-28 h-28 object-contain border rounded'
                      />
                      {/* Info */}
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <div className=''>
                            <p className='text-sm text-blue-700 font-semibold'>{item.product.product_name}</p>
                            <p className='text-sm my-2 text-gray-600'>Condition: Certified - Refurbished</p>
                            <p className='font-semibold text-base mb-2'>Unit Price: ${item.unit_price}</p>
                          </div>
                          <div className='font-semibold flex-shrink-0'>
                            <p>Total: ${item.unit_price * item.quantity}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center justify-between mt-2'>
                          {/* Quantity */}
                          <QuantityController
                            max={item.product.stock}
                            value={item.quantity}
                            onIncrease={(value) => handleQuantity(index, value, item.quantity <= item.product.stock)}
                            onDecrease={(value) => handleQuantity(index, value, item.quantity >= 1)}
                            onType={handleTypeQuantity(index)}
                            disabled={item.disabled}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                item.quantity >= 1 &&
                                  item.quantity <= item.product.stock &&
                                  value !== (purchasesInCartDetail as OrderDetailType[])[index].quantity
                              )
                            }
                          />
                          <button
                            className='text-gray-500 hover:text-red-500 transition-all'
                            onClick={() => handleDeletePurchase(item.order_detail_id)}
                          >
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
                    </div>
                  </div>
                )
              })}
          </div>
          {/* RIGHT: ORDER SUMMARY */}
          <div className='border rounded-xl p-6 space-y-4 h-fit'>
            <h2 className='text-xl font-bold'>Order summary</h2>
            <div className='flex justify-between text-sm'>
              <span>Items ({checkedPurchasesCount})</span>
              <span>${totalCheckedPurchases}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>Shipping</span>
              <span>$0</span>
            </div>
            <hr />
            <div className='flex justify-between font-bold text-lg'>
              <span>Subtotal</span>
              <span>${totalCheckedPurchases}</span>
            </div>
            <Button
              onClick={handleBuyProducts}
              disabled={buyProductsMutation.isPending}
              isLoading={buyProductsMutation.isPending}
              className={classNames('w-full  text-white py-3 rounded-full font-semibold transition-all', {
                'bg-blue-500 cursor-not-allowed': checkedPurchasesCount === 0,
                'bg-blue-600 hover:bg-blue-700 cursor-pointer': checkedPurchasesCount > 0
              })}
            >
              Checkout
            </Button>
            <div className='flex items-center gap-2 text-sm leading-tight text-gray-600'>
              <span className='text-blue-600 text-lg'>🛡️</span>
              Purchase protected by
              <span className='text-blue-600 font-medium'>eBay Money Back Guarantee</span>
            </div>
          </div>
        </>
      ) : (
        <div className='col-span-3 flex justify-center items-center'>
          <div className='p-4 text-sm flex flex-col items-center justify-center text-gray-600'>
            <img
              src='	https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
              alt='no-image'
              className='w-52 h-w-52 object-cover'
            />
            <p className='text-red-500 my-3'>No items in cart</p>
            <Link
              to={path.productList}
              className='py-2 px-4 text-white rounded bg-blue-500 hover:bg-blue-600 transition-all'
            >
              Buy now
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

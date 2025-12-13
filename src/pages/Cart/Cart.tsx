import { faAngleDown, faCircleQuestion, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchases.api'
import images from 'src/assets'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchases.type'
import { formatCurrency } from 'src/types/utils.type'
import { generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import ModalPopup from 'src/components/ModalPopup'
import { AppContext } from 'src/contexts/app.context'

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  // Update Cart
  const updatePurchasesMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  // Buy Product
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })

  // Delete Cart
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      // keyby lodash lấy dir rồi tạo obj từ arr
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleChackAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchaseIndex]

      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )

      updatePurchasesMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }
  return (
    <div className='bg-gray-100 text-sm'>
      {purchasesInCartData?.data.data.length !== 0 ? (
        <div className='max-w-6xl mx-auto pt-6 pb-20'>
          <div className='flex items-center py-4 px-5 mb-2 bg-white text-gray-600 text-sm shadow'>
            <div className='flex  w-2/5 pl-5'>
              <input
                type='checkbox'
                checked={isAllChecked}
                onChange={handleChackAll}
                className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary mr-3'
              />
              <span className='flex-1 text-black'>Sản Phẩm</span>
            </div>
            <div className='flex items-center w-3/5'>
              <div className='text-center w-1/4'>Đơn Giá</div>
              <div className='text-center w-1/4'>Số Lượng</div>
              <div className='text-center w-1/4'>Số Tiền</div>
              <div className='text-center w-1/4'>Thao Tác</div>
            </div>
          </div>

          {/* Danh sách giỏ hàng */}
          {extendedPurchases?.map((purchase, index) => (
            <div className='py-2 text-sm' key={purchase._id}>
              {/* <div className='flex py-4 px-5 border-b border-gray-200 bg-white pl-5 shadow'>
              <div className='pl-5'>
                <input
                  type='checkbox'
                  checked={purchase.checked}
                  onChange={handleCheck(index)}
                  className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary mr-3'
                />
              </div>
              <div className='flex-1 text-black items-center'>
                <div className='flex items-center'>
                  <span className='px-1 bg-primary text-white rounded text-xs'>Yêu thích</span>
                  <div className='mx-2'>Hunee.Store</div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-5 text-primary'
                  >
                    <path d='M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z' />
                    <path d='M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z' />
                  </svg>
                </div>
              </div>
            </div> */}
              <div className='grid grid-cols-9 items-center gap-5 pr py-6 px-5 bg-white shadow'>
                {/* Cột: Checkbox */}
                <div className='col-span-4 flex items-center'>
                  <div className='pl-5'>
                    <input
                      type='checkbox'
                      checked={purchase.checked}
                      onChange={handleCheck(index)}
                      className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary mr-3'
                    />
                  </div>

                  {/* Cột: Hình + tên sản phẩm */}
                  <Link
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                    className='flex items-center'
                  >
                    <div className='w-30 object-cover'>
                      <img
                        src={purchase.product.image}
                        alt={purchase.product.name}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div className='pl-2 pr-6'>
                      <div className='font-medium text-gray-800 line-clamp-2'>{purchase.product.name}</div>
                      <img src={images.saleCart} className='h-5 mt-1' />
                    </div>
                  </Link>

                  {/* Cột: Phân loại hàng */}
                  <div className='text-gray-500'>
                    <div className='text-xs flex items-start'>
                      Phân loại hàng: <FontAwesomeIcon icon={faSortDown} className='w-3 h-3' />
                    </div>
                    <div className='font-medium'>ĐEN, M</div>
                  </div>
                </div>

                <div className='col-span-5 grid grid-cols-4 gap-10 '>
                  {/* Cột: Giá */}
                  <div className='flex items-center justify-between flex-wrap'>
                    <div className='text-gray-400 line-through'>
                      {formatCurrency(purchase.product.price_before_discount)}₫
                    </div>
                    <div>{formatCurrency(purchase.product.price)}₫</div>
                  </div>

                  {/* Cột: Số lượng */}
                  <div className='col-span-1 flex items-center'>
                    <QuantityController
                      value={purchase.buy_count}
                      onDecrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                      onIncrease={(value) => handleQuantity(index, value, value >= 1)}
                      onType={handleTypeQuantity(index)}
                      onFocusOut={(value) =>
                        handleQuantity(
                          index,
                          value,
                          value >= 1 &&
                            value <= purchase.product.quantity &&
                            value !== (purchasesInCart as Purchase[])[index].buy_count
                        )
                      }
                      max={purchase.product.quantity}
                      disabled={purchase.disabled}
                    />
                  </div>

                  {/* Cột: Tổng tiền */}
                  <div className='col-span-1 text-orange-600 font-semibold flex items-center justify-center'>
                    {formatCurrency(purchase.product.price * purchase.buy_count)}₫
                  </div>

                  {/* Cột: Xóa + tương tự */}
                  <div className='flex flex-col items-center col-span-1 justify-center text-sm text-orange-600 cursor-pointer'>
                    <button onClick={handleDelete(index)} className='text-black cursor-pointer'>
                      Xóa
                    </button>
                    <button className='mt-1 cursor-pointer flex items-start'>
                      Tìm sản phẩm tương tự <FontAwesomeIcon icon={faSortDown} className='w-3 h-3' />
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className='flex items-center px-10 py-6 bg-white shadow border-b border-gray-200'>
              <img src={images.voucher} />
              <div className='mx-3.5'>Voucher giảm đến 30k₫</div>
              <div className='text-blue-500'>Xem thêm voucher</div>
            </div>
            <div className='flex items-center px-10 py-6 bg-white shadow'>
              <div className='flex items-center gap-1 text-teal-500'>
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className='mx-3.5'>Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫</div>
              <div className='bg-gray-800/20'>Tìm hiểu thêm</div>
            </div> */}
            </div>
          ))}

          {/* Sticky */}
          <div className='shadow bg-white bottom-0 z-10 sticky mt-6'>
            <div className='flex justify-end items-center py-4 px-5'>
              <div className='flex items-center'>
                <img src={images.voucher} />
                <div className='mx-3.5'>Shopee Voucher</div>
              </div>
              <button className='ml-20 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition duration-150 cursor-pointer'>
                Chọn hoặc nhập mã
              </button>
            </div>

            <div className='h-px bg-gray-200/70'></div>

            <div className='flex justify-end items-center py-4 px-5'>
              <div className='flex items-center gap-3'>
                {/* fake square checkbox */}
                <input
                  type='checkbox'
                  className='w-4 h-4 border-2 rounded-sm border-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-200'
                ></input>

                {/* coin badge + label */}
                <div className='flex items-center gap-2 text-sm text-gray-400 select-none'>
                  <div className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-5 text-yellow-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </div>

                  <div className='text-sm font-medium text-gray-500'>Shopee Xu</div>
                  <div className='text-sm text-gray-400'>
                    Bạn chưa chọn sản phẩm
                    <FontAwesomeIcon icon={faCircleQuestion} className='ml-1' />
                  </div>
                </div>
              </div>
              <div className='ml-20 text-primary'>-0₫</div>
            </div>

            <div className='h-px bg-gray-200/70'></div>
            <div className='flex justify-between items-center px-5 py-4 text-base'>
              {/* Cột trái */}
              <div className='col-span-6 flex items-center gap-6 '>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input type='checkbox' checked={isAllChecked} onChange={handleChackAll} className='w-4 h-4' />
                  <button onClick={handleChackAll} className='cursor-pointer'>
                    Chọn Tất Cả ({extendedPurchases.length})
                  </button>
                </label>

                <button onClick={() => setIsOpen(true)} className=' hover:text-primary cursor-pointer'>
                  Xóa
                </button>

                <ModalPopup
                  isOpen={isOpen}
                  message={
                    checkedPurchasesCount > 0
                      ? `Bạn có muốn xóa ${checkedPurchasesCount} sản phẩm này không?`
                      : 'Bạn chưa chọn sản phẩm nào để xóa'
                  }
                  onConfirm={handleDeleteManyPurchase}
                  onClose={() => setIsOpen(false)}
                  showConfirm={checkedPurchasesCount > 0}
                />

                <button className='text-primary/95 hover:text-primary cursor-not-allowed'>Lưu vào mục Đã thích</button>
              </div>

              <div className=' flex items-center gap-4'>
                <div className='text-right'>
                  <div className='flex items-center gap-2'>
                    <div className=' text-base'>Tổng cộng ({checkedPurchasesCount} sản phẩm):</div>
                    <div className='text-primary text-2xl'>
                      {formatCurrency(totalCheckedPurchasePrice)}₫{/* <FontAwesomeIcon icon={faAngleDown} /> */}
                      <FontAwesomeIcon icon={faAngleDown} className='cursor-pointer' />
                    </div>
                  </div>
                  <div className='flex justify-end items-center gap-6'>
                    <div>Tiết kiệm</div>
                    <div className=' text-primary'>{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>

                <button
                  onClick={handleBuyPurchase}
                  disabled={buyProductsMutation.isPending}
                  className='px-20 py-2 bg-primary text-white rounded-sm hover:opacity-90 text-base cursor-pointer'
                >
                  Mua Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto flex flex-col items-center justify-center min-h-screen py-10'>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
            className='w-40 h-40'
          />
          <div className=' text-gray-500 py-5 font-bold'>Giỏ hàng của bạn còn trống</div>
          <Link
            to={path.home}
            className='text-lg bg-primary py-2 px-10 rounded uppercase text-white cursor-pointer hover:bg-primary/95'
          >
            Mua Ngay
          </Link>
        </div>
      )}
    </div>
  )
}

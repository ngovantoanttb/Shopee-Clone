import { faAngleDown, faCircleQuestion, faSortDown, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'

import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchases.api'
import images from 'src/assets'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency } from 'src/types/utils.type'
import { generateNameId } from 'src/utils/utils'

export default function Cart() {
  const { data: PurchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const purchasesInCart = PurchasesInCartData?.data.data
  console.log(purchasesInCart)

  return (
    <div className='bg-gray-100 text-sm'>
      <div className='max-w-6xl mx-auto pt-6 pb-20'>
        <div className='flex items-center py-4 px-5 border-b border-gray-200 bg-white text-gray-600 text-sm'>
          <div className='flex  w-2/5 pl-5'>
            <input
              type='checkbox'
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
        {purchasesInCart?.map((purchase, index) => (
          <div className='py-4 text-sm' key={index}>
            <div className='flex py-4 px-5 border-b border-gray-200 bg-white pl-5'>
              <div className='pl-5'>
                <input
                  type='checkbox'
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
            </div>
            <div className='grid grid-cols-8 px-8 py-6 bg-white shadow pl-5 border-b border-gray-200'>
              {/* Cột: Checkbox */}
              <div className='col-span-3 flex items-center'>
                <div className='pl-5'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary mr-3'
                  />
                </div>

                {/* Cột: Hình + tên sản phẩm */}
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex items-center'
                >
                  <div>
                    <img src={purchase.product.image} className='w-20 object-cover' />
                  </div>

                  <div className='pl-2 pr-6 w-2/3'>
                    <div className='font-medium text-gray-800 line-clamp-2'>{purchase.product.name}</div>
                    <img src={purchase.product.image} className='h-5 mt-1' />
                  </div>
                </Link>
              </div>

              {/* Cột: Phân loại hàng */}
              <div className='flex items-center col-span-1'>
                <div className='text-gray-500'>
                  <div className='text-xs flex items-start'>
                    Phân loại hàng: <FontAwesomeIcon icon={faSortDown} className='w-3 h-3' />
                  </div>
                  <div className='font-medium'>ĐEN, M</div>
                </div>
              </div>

              {/* Cột: Giá */}
              <div className='col-span-1 flex items-center flex-wrap'>
                <div className='text-gray-400 line-through mr-4'>
                  {formatCurrency(purchase.product.price_before_discount)}₫
                </div>
                <div>{formatCurrency(purchase.product.price)}₫</div>
              </div>

              {/* Cột: Số lượng */}
              <div className='col-span-1 flex items-center'>
                <QuantityController
                  value={purchase.buy_count}
                  // onDecrease={handleBuyCount}
                  // onIncrease={handleBuyCount}
                  // onType={handleBuyCount}
                  max={purchase.product.quantity}
                />
              </div>

              {/* Cột: Tổng tiền */}
              <div className='col-span-1 text-orange-600 font-semibold flex items-center justify-center'>
                {formatCurrency(purchase.product.price * purchase.buy_count)}₫
              </div>

              {/* Cột: Xóa + tương tự */}
              <div className='flex flex-col items-center col-span-1 justify-center text-sm text-orange-600 cursor-pointer'>
                <button className='text-black cursor-pointer'>Xóa</button>
                <button className='mt-1 cursor-pointer flex items-start'>
                  Tìm sản phẩm tương tự <FontAwesomeIcon icon={faSortDown} className='w-3 h-3' />
                </button>
              </div>
            </div>

            <div className='flex items-center px-10 py-6 bg-white shadow border-b border-gray-200'>
              <img src={images.voucher} />
              <div className='mx-3.5'>Voucher giảm đến 30k₫</div>
              <div className='text-blue-500'>Xem thêm voucher</div>
            </div>
            <div className='flex items-center px-10 py-6 bg-white shadow border-b border-gray-200'>
              <div className='flex items-center gap-1 text-teal-500'>
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className='mx-3.5'>Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫</div>
              <div className='bg-gray-800/20'>Tìm hiểu thêm</div>
            </div>
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
              <input className='w-4 h-4 border-2 rounded-sm border-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-200'></input>

              {/* coin badge + label */}
              <div className='flex items-center gap-2 text-sm text-gray-400 select-none'>
                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='size-5 text-yellow-400'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
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
                <input type='checkbox' className='w-4 h-4' />
                <div>Chọn Tất Cả (4)</div>
              </label>

              <button className=' hover:text-primary'>Xóa</button>

              <button className='text-primary/95 hover:text-primary cursor-pointer'>Lưu vào mục Đã thích</button>
            </div>

            <div className=' flex items-center gap-4'>
              <div className='text-right'>
                <div className='flex items-center gap-2'>
                  <div className=' text-base'>Tổng cộng (0 sản phẩm):</div>
                  <div className='text-primary text-2xl'>
                    500.000₫
                    {/* <FontAwesomeIcon icon={faAngleDown} /> */}
                    <FontAwesomeIcon icon={faAngleDown} className='cursor-pointer' />
                  </div>
                </div>
                {/* <div className='flex justify-end items-center gap-6'>
                  <div>Tiết kiệm</div>
                  <div className=' text-primary'>50k</div>
                </div> */}
              </div>

              <button className='px-20 py-2 bg-primary text-white rounded-sm hover:opacity-90 text-base cursor-pointer'>
                Mua Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

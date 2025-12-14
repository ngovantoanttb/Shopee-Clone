import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchases.api'
import images from 'src/assets'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchasesTabs = [
  {
    status: purchasesStatus.all,
    name: 'Tất cả'
  },
  {
    status: purchasesStatus.waitForConfirmation,
    name: 'Chờ xác nhận'
  },
  {
    status: purchasesStatus.waitForGetting,
    name: 'Vận chuyển'
  },
  {
    status: purchasesStatus.inProgress,
    name: 'Chờ giao hàng'
  },
  {
    status: purchasesStatus.delivered,
    name: 'Hoàn thành'
  },
  {
    status: purchasesStatus.cancelled,
    name: 'Đã hủy'
  }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchasesTabsLink = purchasesTabs.map((tab, index) => (
    <Link
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('pb-4 flex-1 text-center cursor-pointer transition-colors', {
        'text-primary border-b-2 border-primary': status === tab.status,
        'hover:text-primary border-b-2 border-gray-200': status !== tab.status
      })}
      key={index}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <Helmet>
        <title>Shopee | Mua và bán online</title>
        <meta name='description' content='Shopee Mua bán online' />
      </Helmet>
      <div className='sticky top-0 flex items-center justify-between pt-4 text-base font-medium text-gray-700 bg-white z-50'>
        {purchasesTabsLink}
      </div>
      <div className='bg-gray-200 py-4 px-2 flex items-center mt-4 '>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-2 text-gray-400' />
        <input
          type='text'
          placeholder='Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
          className='w-full outline-none text-sm'
        />
      </div>
      {purchasesInCart?.length !== 0 ? (
        <div>
          {purchasesInCart?.map((purchase) => (
            <div className='bg-white shadow mt-4 text-sm px-6' key={purchase._id}>
              {/* Header */}
              {/* <div className='flex items-center justify-end py-3 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                  <span className='bg-red-500 text-white text-xs px-2 py-0.5 rounded'>Yêu thích</span>
                  <span className='font-bold'>Tiệm Ăn Vặt Thùy Bùi</span>

                  <button className='bg-primary px-2 py-0.5 text-xs rounded-xs hover:bg-gray-50 flex items-center text-white gap-1'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-3'>
                      <path d='M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z' />
                      <path d='M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z' />
                    </svg>
                    Chat
                  </button>
                  <button className='border px-2 py-0.5 text-xs rounded-xs hover:bg-gray-50 flex items-center text-gray-600 gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-3'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                      />
                    </svg>
                    Xem Shop
                  </button>
                </div>

                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-teal-500 flex items-center gap-1'>
                    <FontAwesomeIcon icon={faTruck} />
                    {}
                    Giao hàng thành công
                    <FontAwesomeIcon icon={faCircleQuestion} className='text-gray-400' />
                  </span>
                  <span className='border-r-2 border-orange-200/30 h-4'></span>
                  <span className='text-red-500 font-medium uppercase'>{}</span>
                </div>
              </div> */}

              {/* Product */}
              <Link
                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                className='flex gap-4 py-4 border-b border-gray-200 items-center'
              >
                <img src={purchase.product.image} alt={purchase.product.name} className='w-20 h-20 object-cover' />

                <div className='flex-1'>
                  <div className='font-medium line-clamp-2'>{purchase.product.name}</div>
                  <div className='text-gray-500 mt-1'>Phân loại hàng: </div>
                  <div className='mt-1'>x{purchase.buy_count}</div>
                </div>

                <div className='text-right flex flex-wrap items-center gap-2'>
                  <div className='line-through text-gray-400 text-xs'>
                    {formatCurrency(purchase.product.price_before_discount)}₫
                  </div>
                  <div className='text-red-500 font-medium'>{formatCurrency(purchase.product.price)}₫</div>
                </div>
              </Link>

              {/* Footer */}
              <div className='py-4 flex flex-col items-end gap-3'>
                <div className='text-sm'>
                  Thành tiền:{' '}
                  <span className='text-red-500 text-lg font-medium'>
                    {formatCurrency(purchase.product.price * purchase.buy_count)}₫
                  </span>
                </div>

                <div className='flex gap-3'>
                  <button className='bg-primary text-white px-6 py-2 rounded hover:bg-primary/95 cursor-pointer'>
                    Mua Lại
                  </button>
                  <button className='border border-gray-400 text-gray-600 px-6 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                    Liên Hệ Người Bán
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-lg py-30 bg-white mt-4'>
          <img src={images.noPurchase} className='mx-auto w-30 h-30' />
          <div className='mt-4'>Chưa có đơn hàng</div>
        </div>
      )}
    </div>
  )
}

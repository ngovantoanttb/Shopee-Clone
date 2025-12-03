import { faLocationDot, faStar, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import images from 'src/assets'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/types/utils.type'

interface Props {
  product: ProductType
}
export default function Product({product}: Props) {
  return (
    <Link to={'/product'}>
      <div className='bg-white rounded-md shadow-sm hover:shadow-lg hover:-translate-y-1 duration-150 overflow-hidden relative'>
        {/* Badge top */}
        <div className='absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-br-md z-10'></div>

        {/* Image */}
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image ? product.image : images.avt}
            alt={product.name}
            className='absolute inset-0 w-full h-full object-cover'
          />

          {/* Badge 12.12 */}
          <div className='absolute bottom-0 w-full h-full'>
            <img
              src={images.badge ? images.badge : images.badgeshort}
              alt='badge'
              className='w-full pointer-events-none'
            />
          </div>

          {/* Buy icon */}
          <div className='absolute bottom-2 right-2'></div>
        </div>

        {/* Content */}
        <div className='p-2'>
          {/* Title */}
          <div className='line-clamp-2 text-sm leading-relaxed min-h-[40px]'>
            <span className='bg-primary text-white px-1 py-0.5 rounded-xs text-xs mr-1'>Yêu thích</span>
            {product.name}
          </div>

          {/* Price */}
          <div className='flex items-center gap-1 mt-1 flex-wrap min-h-[44px]'>
            <span className='line-through text-gray-500 text-sm'>{formatCurrency(product.price_before_discount)}đ</span>
            <span className='text-red-500 text-lg font-semibold'>{formatCurrency(product.price)}đ</span>
            {/* <span className='text-red-500 ml-1 bg-red-100 rounded text-xs px-1 py-0.5'>-34%</span> */}
          </div>

          {/* Tag giảm */}
          {/* <div className='inline-flex items-center h-4 text-xs text-white'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='h-full flex-none -mr-px'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth='1'
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
            <span className='px-1 bg-[#F69113]'>Giảm 5k₫</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='-0.5 -0.5 4 16'
              className='h-full rotate-180 flex-none -ml-px'
            >
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth='1'
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
          </div> */}

          {/* Rating + Sold */}
          <div className='flex items-center mt-2 text-xs'>
            <div className='border bg-amber-200/40 p-1 rounded-md border-amber-300'>
              <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-1' />
              <span className='text-gray-700'>{product.rating}</span>
            </div>
            <span className='border border-gray-100 h-4 mx-2'></span>
            <span className='text-gray-700'>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
          </div>

          {/* Shipping + Location */}
          <div className='flex items-center mt-1 text-xs text-gray-600'>
            <div className='flex items-center gap-1 text-teal-500'>
              <FontAwesomeIcon icon={faTruck} />
              <span>2 - 3 ngày</span>
            </div>
            <span className='border border-gray-100 h-4 mx-2'></span>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Hà Nội</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

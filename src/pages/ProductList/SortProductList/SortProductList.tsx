import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function SortProductList() {
  const [active, setActive] = useState('newest')
  return (
    <div className='pt-4'>
      <div className='bg-gray-200/70 p-4 text-sm'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center flex-wrap gap-2'>
            <div className='text-gray-600'>Sắp xếp theo</div>

            <button
              className={`px-3 h-8 cursor-pointer rounded-xs ${
                active === 'popular' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setActive('popular')}
            >
              Phổ Biến
            </button>

            {/* Newest */}
            <button
              className={`px-3 h-8 cursor-pointer rounded-xs ${
                active === 'newest' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setActive('newest')}
            >
              Mới Nhất
            </button>

            {/* Best Selling */}
            <button
              className={`px-3 h-8 cursor-pointer rounded-xs ${
                active === 'best' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setActive('best')}
            >
              Bán Chạy
            </button>
            {/* Price Dropdown */}
            <div className='relative'>
              <select
                className='h-8 w-50 px-3 rounded-xs bg-white cursor-pointer text-left
                 border-none focus:border-none focus:ring-0 appearance-none'
              >
                <option value='' hidden>
                  Giá
                </option>
                <option value='price:asc' className='hover:text-primary hover:bg-white'>
                  Giá: Thấp đến Cao
                </option>
                <option value='price:desc' className='hover:text-primary hover:bg-white'>
                  Giá: Cao đến Thấp
                </option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
              />
            </div>
          </div>
          <div className='flex items-center gap-4 text-sm'>
            <span>
              <span className='text-primary font-semibold'>1</span>/9
            </span>

            <div className='flex rounded-xs overflow-hidden '>
              <button className='px-3 h-8 bg-white text-gray-400'>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className='px-3 h-8 bg-white text-gray-700 border-l border-gray-200 cursor-pointer'>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

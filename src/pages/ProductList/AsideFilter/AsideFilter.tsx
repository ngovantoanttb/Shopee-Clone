import { faCaretRight, faChevronDown, faFilter, faList, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className='pt-6 text-gray-800'>
      {/* Tất cả danh mục */}
      <div>
        <Link to={path.home} className='border-gray-300 py-4 border-b'>
          <FontAwesomeIcon icon={faList} className='mr-2' />
          <span className='font-bold uppercase'>Tất Cả Danh Mục</span>
        </Link>
        <ul className='mt-4 text-sm'>
          <li className='py-2 relative pl-4'>
            <span className='absolute left-0 top-1/2 -translate-y-1/2'>
              <FontAwesomeIcon icon={faCaretRight} className='text-primary' />
            </span>

            <span className='block font-semibold text-primary'>Thời trang nam</span>
          </li>

          <li className='py-2 relative pl-4'>
            <span>Áo Khoác</span>
          </li>
          <li className='py-2 relative pl-4'>
            <span>Áo Vest và Blazer</span>
          </li>
          <li className='py-2 relative pl-4'>
            <span>Áo Hoodie, Áo Len & Áo Nỉ</span>
          </li>
          <li className='py-2 relative pl-4'>
            <span>Quần Jeans</span>
          </li>
          <div className='py-2 relative pl-4 cursor-pointer'>
            <span>Thêm</span>
            <FontAwesomeIcon icon={faChevronDown} className='absolute ml-2 top-1/2 -translate-y-1/2' />
          </div>
        </ul>
      </div>

      {/* Bộ lọc tìm kiếm */}
      <div className='mt-4'>
        <Link to={path.home} className='border-gray-300 py-4 border-b'>
          <FontAwesomeIcon icon={faFilter} className='mr-2' />
          <span className='font-bold uppercase'>Bộ lọc tìm kiếm</span>
        </Link>
        <ul className='mt-4 text-sm'>
          <li className='py-2'>
            <span className='block font-medium'>Nơi bán</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Hà Nội</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>TP. Hồ Chí Minh</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Quận Hà Đông</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Quận Hoàng Mai</span>
          </li>

          <div className='py-2 pl-2 cursor-pointer flex items-center relative w-fit'>
            <span>Thêm</span>
            <FontAwesomeIcon icon={faChevronDown} className='ml-1 text-gray-500' />
          </div>
        </ul>

        <ul className='mt-4 text-sm'>
          <li className='py-2 relative'>
            <span className='block'>Đơn vị vận chuyển</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Hỏa tốc</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Nhanh</span>
          </li>

          <li className='py-2 flex items-center gap-2 pl-2'>
            <input type='checkbox' />
            <span>Tiết kiệm</span>
          </li>
        </ul>
        <div className='mt-4 text-sm border-gray-300 py-4 border-b'>
          <div className='py-2'>
            <span>Khoảng giá</span>
          </div>
          <form className='mt-2'>
            <div className='flex items-center'>
              <Input
                type='text'
                name='from'
                placeholder='₫ TỪ'
                className='grow'
                classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
              />

              <div className='w-8 h-px bg-gray-300 mx-2 self-center -translate-y-3'></div>

              <Input
                type='text'
                name='to'
                placeholder='₫ ĐẾN'
                className='grow'
                classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
              />
            </div>
            <Button className=' hover:bg-orange-600 rounded w-full bg-primary shadow-[#00000017] text-white py-2 px-2 uppercase opacity-90 text-sm flex items-center justify-center'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='mt-4 text-sm space-y-1'>
          <div className='font-medium'>Đánh Giá</div>

          {/* 5 sao */}
          <li className='flex items-center hover:bg-gray-300 p-1 rounded-xl cursor-pointer'>
            <ul className='text-amber-400 flex gap-1 ml-2'>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
            </ul>
            <span className='ml-3 text-gray-700'></span>
          </li>

          {/* 4 sao */}
          <li className='flex items-center hover:bg-gray-300 p-1 rounded-xl cursor-pointer'>
            <div className='text-amber-400 flex gap-1 ml-2'>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              <FontAwesomeIcon className='text-gray-500' icon={faStar} />
            </div>
            <span className='ml-3 text-gray-700'>trở lên</span>
          </li>

          {/* 3 sao */}
          <li className='flex items-center hover:bg-gray-300 p-1 rounded-xl cursor-pointer'>
            <div className='text-amber-400 flex gap-1 ml-2'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className='text-gray-500' />
                ))}
            </div>
            <span className='ml-3 text-gray-700'>trở lên</span>
          </li>

          {/* 2 sao */}
          <li className='flex items-center hover:bg-gray-300 p-1 rounded-xl cursor-pointer'>
            <div className='text-amber-400 flex gap-1 ml-2'>
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className='text-gray-500' />
                ))}
            </div>
            <span className='ml-3 text-gray-700'>trở lên</span>
          </li>
          {/* Nút Thêm */}
          <div className='py-2 relative pl-4 cursor-pointer'>
            <span>Thêm</span>
            <FontAwesomeIcon icon={faChevronDown} className='absolute ml-2 top-1/2 -translate-y-1/2' />
          </div>
        </div>
      </div>
      <div className='w-full h-px bg-gray-300 my-6'></div>
      <Button className=' hover:bg-orange-600 rounded w-full bg-primary shadow-[#00000017] text-white py-2 px-2 uppercase opacity-90 text-sm flex items-center justify-center'>
        Xóa tất cả
      </Button>
    </div>
  )
}

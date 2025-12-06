import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'

export default function ShopMall() {
  const brands = [
    'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-m02qx1cjpd655f',
    'https://down-vn.img.susercontent.com/file/21c730c26e8d3a6fab107a6ea75c057a',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrd9uw184nw23',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdd8w0nkmaa8',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c2ih4ogjw444',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrd8xvnhqho26',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdawrhrgrgdf',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdbklywkyq4e',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-m02qx1cjpd655f',
    'https://down-vn.img.susercontent.com/file/21c730c26e8d3a6fab107a6ea75c057a',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrd9uw184nw23',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdd8w0nkmaa8',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c2ih4ogjw444',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrd8xvnhqho26',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdawrhrgrgdf',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdbklywkyq4e',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c2ih4ogjw444',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrd8xvnhqho26',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdawrhrgrgdf',
    'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-mcrdbklywkyq4e'
  ]

  const categories = [
    {
      img: 'https://down-vn.img.susercontent.com/file/3854ad0615cfa2d15eb06a446816465d',
      title: 'FREESHIP & HOÀN XU…',
      price: 'Từ 19.800đ'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/f05c3231cb59b6d0c233db3ea7a30b8f',
      title: 'SHOP XU HƯỚNG',
      price: 'Từ 2.000đ'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/40ccf6a1162d77a99cd703885034d631',
      title: 'HÀNG QUỐC TẾ',
      price: 'Từ 9.196đ'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/19b560edefa4b6869c0eac2f979c9f64',
      title: 'SHOPEE MALL',
      price: 'Từ 4.000đ'
    },
    {
      img: 'https://down-vn.img.susercontent.com/file/f4499fa8d8fec743f8d8b2e63a973e79',
      title: 'SHOP HÀNG XƯỞNG',
      price: 'Từ 5.000đ'
    }
  ]

  const [page, setPage] = useState(0)

  // CHIA MỖI TRANG 12 LOGO
  const pages = useMemo(() => {
    const result = []
    for (let i = 0; i < brands.length; i += 12) {
      result.push(brands.slice(i, i + 12))
    }
    return result
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = pages.length

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  return (
    <div className='relative mt-4 flex justify-center'>
      <div className='bg-white mt-4 max-w-6xl mx-auto'>
        <div>
          {/* HEADER */}
          <div className='flex justify-between items-center p-4'>
            <h2 className='text-red-600 text-lg'>SHOPEE MALL</h2>
            <button className='text-red-500 text-sm flex items-center gap-1 cursor-pointer'>
              Xem tất cả
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* BRAND GRID 2 ROW */}
          <div className='relative bg-white rounded-md mt-4 overflow-visible group'>
            {/* BUTTON TRÁI */}
            {page > 0 && (
              <button
                onClick={prev}
                className='absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2
w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center
transition-transform group-hover:scale-200 hover:scale-200 z-30 cursor-pointer'
              >
                <FontAwesomeIcon icon={faChevronLeft} className='w-2 h-2 text-gray-600' />
              </button>
            )}

            {/* WRAPPER */}
            <div className='overflow-hidden cursor-pointer'>
              <div
                className='flex transition-transform duration-500'
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {pages.map((brandsInPage, pageIndex) => (
                  <div key={pageIndex} className='grid grid-cols-6 grid-rows-2 w-full shrink-0'>
                    {brandsInPage.map((img, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-center h-30 overflow-hidden border-gray-100 border'
                      >
                        <img src={img} alt='' className='max-h-40 object-contain' />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON PHẢI */}
            {page < totalPages - 1 && (
              <button
                onClick={next}
                className='absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2
w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center
transition-transform group-hover:scale-200 hover:scale-200 z-30 cursor-pointer'
              >
                <FontAwesomeIcon icon={faChevronRight} className='w-2 h-2 text-gray-600' />
              </button>
            )}
          </div>
        </div>

        <div className='p-4'>
          {/* CATEGORY TITLE */}
          <h3 className='mt-6 mb-3 text-gray-600 font-medium uppercase text-lg'>
            Siêu shop thịnh hành - Bung deal siêu phẩm
          </h3>

          {/* CATEGORY LIST */}
          <div className='grid grid-cols-5 gap-8 px-4'>
            {categories.map((item, i) => (
              <div
                key={i}
                className='shadow rounded hover:shadow cursor-pointer bg-white hover:-translate-y-1 transition-transform duration-300'
              >
                <img src={item.img} className='w-full aspect-square object-cover' />
                <div className='p-2 text-center'>
                  <div className='text-gray-700 line-clamp-1'>{item.title}</div>
                  <div className='text-red-500 mt-1'>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

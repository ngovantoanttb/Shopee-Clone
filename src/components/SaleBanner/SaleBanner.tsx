import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'
import IMAGES from 'src/assets'


const MOCK_BANNERS = [
  {
    id: 1,
    img: IMAGES.bn1,
    alt: 'Banner 1'
  },
  {
    id: 2,
    img: IMAGES.bn2,
    alt: 'Banner 2'
  },
  {
    id: 3,
    img: IMAGES.bn3,
    alt: 'Banner 3'
  },
  {
    id: 4,
    img: IMAGES.bn4,
    alt: 'Banner 4'
  },
  {
    id: 5,
    img: IMAGES.bn5,
    alt: 'Banner 5'
  },
  {
    id: 6,
    img: IMAGES.bn6,
    alt: 'Banner 6'
  },
  {
    id: 7,
    img: IMAGES.bn7,
    alt: 'Banner 7'
  },
  {
    id: 8,
    img: IMAGES.bn8,
    alt: 'Banner 8'
  },
  {
    id: 9,
    img: IMAGES.bn9,
    alt: 'Banner 9'
  }
]

export default function SaleBanner() {
  const [index, setIndex] = useState(1)
  const [noAnim, setNoAnim] = useState(false)
  const isAnimating = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sử dụng dữ liệu mock trực tiếp
  const banners = MOCK_BANNERS

  const slides = banners.length > 0 ? [banners[banners.length - 1], ...banners, banners[0]] : []
  const totalSlides = banners.length

  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)

  // useEffect cho Auto Slide (giữ nguyên)
  useEffect(() => {
    startAutoSlide()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const startAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => next(), 5000)
  }

  const next = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    setNoAnim(false)
    setIndex((prev) => prev + 1)
  }

  const prev = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    setNoAnim(false)
    setIndex((prev) => prev - 1)
  }

  const handleTransitionEnd = () => {
    isAnimating.current = false
    if (index === 0) {
      setNoAnim(true)
      setIndex(totalSlides)
    } else if (index === slides.length - 1) {
      setNoAnim(true)
      setIndex(1)
    }
  }

  // --- Kéo / Vuốt ---
  const resetDrag = () => {
    isDragging.current = false
    startX.current = null
    startAutoSlide()
  }

  const handleStart = (x: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    startX.current = x
    isDragging.current = true
  }

  const handleMove = (x: number) => {
    if (!isDragging.current || isAnimating.current || startX.current == null) return
    const delta = x - startX.current
    if (delta > 50) {
      prev()
      resetDrag()
    } else if (delta < -50) {
      next()
      resetDrag()
    }
  }

  // Nếu không có banner nào (dù đã mock), hiển thị loading placeholder đơn giản
  if (banners.length === 0) {
    return <div className='w-full h-80 bg-gray-200 rounded-xl shadow-lg' />
  }

  return (
    <div className='max-w-6xl mx-auto bg-gray-100'>
      <div className='pt-10 pb-4 grid grid-cols-6 gap-1'>
        <div className='col-span-4'>
          <div
            className='relative overflow-hidden hadow-lg z-10 select-none group cursor-pointer'
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={resetDrag}
            onMouseLeave={resetDrag}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={resetDrag}
          >
            {/* Slides */}
            <div
              className={`flex ${noAnim ? '' : 'transition-transform duration-700 ease-out'}`}
              style={{ transform: `translateX(-${index * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((item, index) => (
                <img
                  key={index}
                  src={item.img}
                  alt={item.alt}
                  className='shrink-0 h-full object-cover pointer-events-none'
                  // Thêm onerror để đảm bảo không bị lỗi nếu mock link hỏng
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = 'https://placehold.co/1200x320/cccccc/000?text=Image+Load+Error'
                  }}
                />
              ))}
            </div>

            {/* Buttons - chỉ hiện khi hover */}
            <button
              onClick={prev}
              className='absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20'
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={next}
              className='absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20'
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Dots */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20'>
              {banners.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer 
                ${i + 1 === index ? 'bg-primary shadow-md' : 'bg-white/40 hover:bg-white/70'}`}
                  onClick={() => {
                    setNoAnim(false)
                    setIndex(i + 1)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='gap-0.5 grid'>
            <div>
              <img src={IMAGES.sale1} alt='Sale-1' className='h-full w-full object-cover' />
            </div>
            <div>
              <img src={IMAGES.sale2} alt='Sale-2' className='h-full w-full object-cover' />
            </div>
          </div>
        </div>
      </div>
      
      <div className='grid grid-cols-6 w-full px-4 gap-4 my-2'>
        {/* Item 1 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img1} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Deal Từ 1.000Đ</span>
        </div>

        {/* Item 2 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img2} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Shopee Xử Lý</span>
        </div>

        {/* Item 3 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img3} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Deal Hot Giờ Vàng</span>
        </div>

        {/* Item 4 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img4} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Shopee Style Voucher 30%</span>
        </div>

        {/* Item 5 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img5} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Khách Hàng Thân Thiết</span>
        </div>

        {/* Item 6 */}
        <div className='flex flex-col items-center'>
          <img src={IMAGES.img6} className='w-12 h-12 object-cover' />
          <span className='text-sm text-center text-gray-700'>Mã Giảm Giá</span>
        </div>
      </div>

      {/* Banner */}
      {/* <div className='mt-4'>
        <img src={IMAGES.salebanner} alt='Sale-banner' />
      </div> */}
    </div>
  )
}

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductRating({ rating }: { rating: number }) {
  const handleWidth = (order: number) => {
    if (order <= rating) return '100%'
    if (order > rating && order - rating < 1) return (rating - Math.floor(rating)) * 100 + '%'
    return '0%'
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='relative w-5 h-5' style={{ lineHeight: 0 }}>
            {/* Lớp dưới (xám) */}
            <FontAwesomeIcon icon={faStar} className='text-gray-300 absolute top-0 left-0 w-5 h-5 leading-none' />

            {/* Lớp trên (vàng) */}
            <div className='absolute top-0 left-0 overflow-hidden h-full' style={{ width: handleWidth(index + 1) }}>
              <FontAwesomeIcon icon={faStar} className='text-yellow-400 w-5 h-5 leading-none' />
            </div>
          </div>
        ))}
    </div>
  )
}

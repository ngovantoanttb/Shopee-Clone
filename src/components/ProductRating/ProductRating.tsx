import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductRating({
  rating = 0,
  activeClassname = 'leading-none',
  noActiveClassname = 'absolute top-0 left-0 leading-none',
  classStar = 'relative w-4 h-5'
}: {
  rating?: number
  activeClassname?: string
  noActiveClassname?: string
  classStar?: string
}) {
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
          <div key={index} className={`relative ${classStar}`} style={{ lineHeight: 0 }}>
            {/* Lớp dưới (xám) */}
            <FontAwesomeIcon icon={faStar} className={noActiveClassname} />

            {/* Lớp trên (vàng) */}
            <div className='absolute top-0 left-0 overflow-hidden h-full' style={{ width: handleWidth(index + 1) }}>
              <FontAwesomeIcon icon={faStar} className={activeClassname} />
            </div>
          </div>
        ))}
    </div>
  )
}

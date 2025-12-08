import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

// index 0: Có 5 sao vàng tương ứng từ index 0 -> 4
// index 1: Có 4 sao vàng tương ứng từ index 0 -> 3
// index 2: Có 3 sao vàng tương ứng từ index 0 -> 2
// index 3: Có 2 sao vàng tương ứng từ index 0 -> 1
// index 4: Có 1 sao vàng tương ứng từ index 0 -> 0

// indexStar < 5 - index => Vàng

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStarts({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='flex items-center hover:bg-gray-200 p-1 rounded-xl cursor-pointer'>
            <div
              className='flex gap-1 ml-2 cursor-pointer'
              onClick={() => handleFilterStar(5 - index)}
              tabIndex={0}
              aria-hidden='true'
              role='button'
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index)
                    return <FontAwesomeIcon key={indexStar} icon={faStar} className='text-yellow-400' />
                  return <FontAwesomeIcon key={indexStar} icon={faStar} className='text-gray-300' />
                })}
            </div>
            <span className='ml-3'>{index !== 0 ? 'Trở lên' : ''}</span>
          </div>
        ))}

      {/* Nút Thêm */}
      {/* <div className='py-2 relative pl-4 cursor-pointer'>
        <span>Thêm</span>
        <FontAwesomeIcon icon={faChevronDown} className='absolute ml-2 top-1/2 -translate-y-1/2' />
      </div> */}
    </div>
  )
}

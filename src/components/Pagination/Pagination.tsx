import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='py-2 px-3 text-gray-400 mx-2'>
            ...
          </span>
        )
      }
    }

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <div key={index} className='py-2 px-3 text-gray-400 mx-2'>
            ...
          </div>
        )
      }
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('py-1 px-4 flex items-center justify-center rounded mx-2 cursor-pointer transition', {
              'bg-primary text-white': pageNumber === page,
              'text-gray-500': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-10 justify-center text-xl items-center'>
      {page === 1 ? (
        <div className='text-xl text-gray-300 hover:text-gray-400 cursor-not-allowed mr-2'>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='text-xl text-gray-400 hover:text-gray-600 cursor-pointer mr-2'
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      )}
      {/* Prev */}

      {renderPagination()}

      {/* Next */}

      {page === pageSize ? (
        <div className='text-xl text-gray-300 hover:text-gray-600 cursor-not-allowed ml-2'>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='text-xl text-gray-400 hover:text-gray-600 cursor-pointer ml-2'
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      )}
    </div>
  )
}

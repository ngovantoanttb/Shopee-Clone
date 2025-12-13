import { faCaretRight, faChevronDown, faFilter, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import InputNumber from 'src/components/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStarts from '../RatingStarts'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import InputV2 from 'src/components/InputV2'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */

const priceSchema = schema.pick(['price_min', 'price_max']) as yup.ObjectSchema<FormData>

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='pt-6 text-gray-800'>
      {/* Tất cả danh mục */}
      <div>
        <Link to={path.home} className='border-gray-300 py-4 border-b'>
          <FontAwesomeIcon icon={faList} className='mr-2' />
          <span className='font-bold uppercase'>Tất Cả Danh Mục</span>
        </Link>
        <ul className='mt-4 text-sm'>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 relative pl-4' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: new URLSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                >
                  {isActive ? (
                    <div>
                      <span className='absolute left-0 top-1/2 -translate-y-1/2'>
                        <FontAwesomeIcon icon={faCaretRight} className='text-primary' />
                      </span>
                      <span className='block text-primary'>{categoryItem.name}</span>
                    </div>
                  ) : (
                    <span className='block text-gray-700'>{categoryItem.name}</span>
                  )}
                </Link>
              </li>
            )
          })}

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
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-center'>
              {/* <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      placeholder='₫ TỪ'
                      className='grow'
                      classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              /> */}
              <InputV2
                control={control}
                name='price_min'
                type='number'
                placeholder='₫ TỪ'
                className='grow'
                classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
                classNameError='hidden'
                onChange={() => {
                  trigger('price_max')
                }}
              />
              <div className='w-8 h-px bg-gray-300 mx-2 self-center -translate-y-0'></div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      placeholder='₫ ĐẾN'
                      className='grow'
                      classNameInput='p-1 w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div className='my-1 text-red-400 text-sm min-h-[20px]'>{errors.price_min?.message}</div>
            <Button className=' hover:bg-primary/90 rounded w-full bg-primary shadow text-white py-2 px-2 uppercase opacity-90 text-sm flex items-center justify-center'>
              Áp dụng
            </Button>
          </form>
        </div>

        {/* Đánh giá */}
        <div className='mt-4 text-sm space-y-1'>
          <div className='font-medium'>Đánh Giá</div>
          <RatingStarts queryConfig={queryConfig} />
        </div>
      </div>
      <div className='w-full h-px bg-gray-300 my-6'></div>
      <Button
        onClick={handleRemoveAll}
        className=' hover:bg-orange-600 rounded w-full bg-primary shadow-[#00000017] text-white py-2 px-2 uppercase opacity-90 text-sm flex items-center justify-center'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

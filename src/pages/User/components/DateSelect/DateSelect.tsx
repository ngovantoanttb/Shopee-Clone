import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1990
      })
    }
  }, [value])
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueFromSelect } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange?.(new Date(Date.UTC(newDate.year, newDate.month, newDate.date)))
  }

  return (
    <div className='w-full text-sm'>
      <div className='flex items-center justify-start w-full relative'>
        <label className='w-40 text-gray-600 text-sm text-right pr-4'>Ngày sinh</label>
        <div className='flex items-center gap-4'>
          <select
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
            className='border border-gray-300 px-3 py-2 rounded w-24 hover:border-primary cursor-pointer'
          >
            {range(1, 32).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='border border-gray-300 px-3 py-2 rounded w-24 hover:border-primary cursor-pointer'
          >
            {range(0, 12).map((item) => (
              <option key={item} value={item}>{item + 1}</option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
            className='border border-gray-300 px-3 py-2 rounded w-24 hover:border-primary cursor-pointer'
          >
            {range(1910, 2026).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='absolute ml-40 text-primary'>{errorMessage}</div>
    </div>
  )
}

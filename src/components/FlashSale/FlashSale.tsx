import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

interface Props {
  duration: number | { hours?: number; minutes?: number; seconds?: number }
}

export default function FlashSale({ duration }: Props) {
  const getInitialSeconds = () => {
    if (typeof duration === 'number') return duration

    const { hours = 0, minutes = 0, seconds = 0 } = duration
    return hours * 3600 + minutes * 60 + seconds
  }

  const [timeLeft, setTimeLeft] = useState<number>(getInitialSeconds())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const format = (n: number) => String(n).padStart(2, '0')

  const hours = format(Math.floor(timeLeft / 3600))
  const minutes = format(Math.floor((timeLeft % 3600) / 60))
  const seconds = format(timeLeft % 60)

  return (
    <div className='w-full mt-4'>
      {/* HEADER */}
      <div className='bg-flashsale-gradient text-white flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2 text-lg font-bold'>FLASH SALE</div>

        <div className='flex items-center gap-2 text-sm'>
          <span className='opacity-90'>
            <FontAwesomeIcon icon={faClock} /> KẾT THÚC TRONG
          </span>

          <div className='flex gap-1'>
            <span className='bg-black text-white px-2 py-1 rounded-sm text-sm font-bold'>{hours}</span>
            <span className='bg-black text-white px-2 py-1 rounded-sm text-sm font-bold'>{minutes}</span>
            <span className='bg-black text-white px-2 py-1 rounded-sm text-sm font-bold'>{seconds}</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className='bg-gradient-to-r from-white to-primary/10 p-4'>
        <div className='flex items-center gap-3'>
          <p className='text-primary text-3xl'>17.100₫</p>
          <p className='text-gray-400 line-through text-base'>18.000₫</p>
          <p className='text-primary font-bold text-xs bg-primary/10 px-1'>-5%</p>
        </div>
      </div>
    </div>
  )
}


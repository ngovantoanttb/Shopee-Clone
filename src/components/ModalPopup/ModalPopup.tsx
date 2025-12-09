import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  message: string
}

export default function ModalPopup({ open, onClose, message }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-lg'>
        <div className='text-gray-800 text-left text-base'>{message}</div>

        <button
          onClick={onClose}
          className='w-full mt-6 bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/95 cursor-pointer'
        >
          OK
        </button>
      </div>
    </div>
  )
}

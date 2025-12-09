import { useEffect } from 'react'

interface Props {
  isOpen: boolean
  onConfirm?: () => void
  onClose?: () => void
  message: string
  showConfirm?: boolean
}

export default function ModalPopup({
  isOpen,
  onConfirm,
  onClose,
  message,
  showConfirm = true // 👈 mặc định có nút OK
}: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm?.()
    onClose?.()
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4' onClick={onClose}>
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-lg' onClick={(e) => e.stopPropagation()}>
        <div className='text-gray-800 text-left text-base'>{message}</div>

        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 mt-6 bg-gray-500 text-white py-3 rounded-md font-semibold hover:bg-gray-500/95 cursor-pointer'
          >
            Trở lại
          </button>
          {showConfirm && (
            <button
              onClick={handleConfirm}
              className='px-10 mt-6 bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/95 cursor-pointer'
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

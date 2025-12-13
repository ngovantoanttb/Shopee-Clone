import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= 1048576 || !fileFromLocal.type.includes('image'))) {
      toast.error('Kích thước ảnh quá lớn. Ảnh phải tối đa 1MB')
    } else {
      onChange?.(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          ;(event.target as HTMLInputElement).value = ''
        }}
      />

      <button
        type='button'
        onClick={handleUpload}
        className='py-2 px-5 border border-gray-400 opacity-80 my-3 cursor-pointer'
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}

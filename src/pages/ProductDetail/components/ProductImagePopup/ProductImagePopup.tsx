import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  name: string
  images: string[]
  initialImage: string
  onClose: () => void
}

export default function ProductImagePopup({ name, images, initialImage, onClose }: Props) {
  const [currentImage, setCurrentImage] = React.useState<string>(initialImage || images[0])

  React.useEffect(() => {
    // if initialImage changes (opening at a different image), reset currentImage
    setCurrentImage(initialImage || images[0])
  }, [initialImage, images])

  const currentIndex = images.indexOf(currentImage)

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (currentIndex > 0) {
      setCurrentImage(images[currentIndex - 1])
    }
  }

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (currentIndex < images.length - 1) {
      setCurrentImage(images[currentIndex + 1])
    }
  }

  return (
    <div className='fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4' onClick={onClose}>
      <div className='bg-white rounded shadow-xl grid grid-cols-8 max-w-3xl p-3' onClick={(e) => e.stopPropagation()}>
        <div className='relative col-span-5 flex items-center justify-center'>
          <button
            className='py-3 px-2 bg-black/30 absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-4xl'
            onClick={goPrev}
            aria-label='Previous image'
          >
            <FontAwesomeIcon icon={faChevronLeft} className=' text-white' />
          </button>

          <img src={currentImage} className='object-contain max-h-[70vh] w-full' alt='' />

          <button
            className='py-3 px-2 bg-black/30 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-4xl'
            onClick={goNext}
            aria-label='Next image'
          >
            <FontAwesomeIcon icon={faChevronRight} className=' text-white' />
          </button>
        </div>

        <div className='col-span-3'>
          <div className='pl-4 pt-3'>
            <div className='line-clamp-2 text-base pr-2'>{name}</div>
            <div className='max-h-96 overflow-y-auto pr-2 mt-2'>
              <div className='grid grid-cols-3 gap-1'>
                {images.map((img, index) => (
                  <div key={index} className='cursor-pointer p-1 rounded group'>
                    <button
                      onClick={() => setCurrentImage(img)}
                      className={`block w-full h-full p-0 border rounded overflow-hidden cursor-pointer ${
                        img === currentImage ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        className='object-cover w-full h-full transition duration-200 group-hover:opacity-90'
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-white text-4xl cursor-pointer'
          aria-label='Close'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path stroke-linecap='round' stroke-linejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
    </div>
  )
}

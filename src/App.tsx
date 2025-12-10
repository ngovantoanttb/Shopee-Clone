import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import { useState, useEffect, useContext } from 'react'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Theo dõi scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 30
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }
  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-900'>
      {routeElements}
      <ToastContainer />
      {/* Nút scroll to top với hiệu ứng mượt mà */}
      <button
        onClick={scrollToTop}
        className={`cursor-pointer fixed bottom-8 right-4 bg-primary/95 hover:bg-primary/100 text-white p-3 rounded-sm shadow-lg 
    transition-all duration-500 ease-in-out transform hover:scale-110
    ${showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-20'}`}
        aria-label='Quay lại đầu trang'
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

export default App

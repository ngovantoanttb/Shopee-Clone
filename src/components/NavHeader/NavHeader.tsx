import { faAngleDown, faBell, faCircleQuestion, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import images from 'src/assets'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popover from '../Popover'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { purchasesStatus } from 'src/constants/purchase'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-between items-center text-sm'>
      <div className='flex items-center gap-4'>
        <Link className='cursor-pointer' to={''}>
          Kênh Người Bán
        </Link>
        <span className='border-r-2 border-orange-200/30 h-4'></span>
        <Link className='cursor-pointer' to={''}>
          Tải ứng dụng
        </Link>
        <span className='border-r-2 border-orange-200/30 h-4'></span>
        <span className='cursor-pointer flex items-center gap-1'>
          Kết nối
          <FontAwesomeIcon className='mx-1' icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <span className='cursor-pointer flex items-center gap-1'>
          <FontAwesomeIcon icon={faBell} />
          Thông Báo
        </span>

        <span className='cursor-pointer flex items-center gap-1'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          Hỗ Trợ
        </span>

        {/* Ngôn ngữ */}
        <Popover
          as='span'
          className='cursor-pointer flex items-center gap-1'
          renderPopover={
            <div className='flex flex-col items-start p-2'>
              <button className='cursor-pointer p-2 hover:text-primary w-full text-left pr-20'>Tiếng Việt</button>
              <button className='cursor-pointer p-2 hover:text-primary w-full text-left pr-20'>English</button>
            </div>
          }
        >
          <FontAwesomeIcon icon={faGlobe} />
          Tiếng Việt
          <FontAwesomeIcon icon={faAngleDown} />
        </Popover>

        {/* Profiles */}
        {!isAuthenticated ? (
          <div className='flex items-center gap-4'>
            <Link to={path.register} className='hover:text-gray-300'>
              Đăng Ký
            </Link>
            <span className='border-r-2 border-orange-200/30 h-4'></span>
            <Link to={path.login} className='hover:text-gray-300'>
              Đăng Nhập
            </Link>
          </div>
        ) : (
          <Popover
            className='cursor-pointer flex items-center gap-1'
            renderPopover={
              <div className='flex flex-col items-start p-2'>
                <Link
                  to={path.profile}
                  className='cursor-pointer hover:text-emerald-400 hover:bg-gray-200/20 w-full text-left p-2 block'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='cursor-pointer hover:text-emerald-400 hover:bg-gray-200/20 w-full text-left p-2 block'
                >
                  Đơn mua
                </Link>
                <button
                  onClick={handleLogout}
                  className='cursor-pointer hover:text-emerald-400 hover:bg-gray-200/20 w-full text-left p-2 block'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <img src={images.avt} alt='avatar' className='h-5 w-5 rounded-full' />
            {profile?.email.split('@gmail.com')}
          </Popover>
        )}
      </div>
    </div>
  )
}

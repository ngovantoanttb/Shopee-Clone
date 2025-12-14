import { faClipboardList, faLock, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { INVALID_AVATAR_URL } from 'src/assets'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center text-sm border-b border-gray-200 pb-5 pt-5.5'>
        {!profile?.avatar || profile?.avatar === INVALID_AVATAR_URL ? (
          <FontAwesomeIcon icon={faUser} className='text-lg p-3 text-gray-400 border border-gray-300 rounded-full' />
        ) : (
          <img src={profile?.avatar} alt={profile?.name} className='rounded-full w-12 h-12 object-cover' />
        )}

        <div className='ml-4'>
          <div className='font-bold truncate w-28 line-clamp-1'>
            {profile?.name ? profile.name : `user` + Math.floor(1000000000 + Math.random() * 9000000000)}
          </div>
          <Link to={path.profile} className='text-gray-400'>
            <FontAwesomeIcon icon={faPen} className='mr-1' />
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-7 text-sm'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capi cursor-pointertalize  transition-colors', {
              'text-primary': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div>
            <FontAwesomeIcon className='mr-3 text-base' icon={faUser} />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center cursor-pointer capitalize transition-colors', {
              'text-primary': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div>
            <FontAwesomeIcon className='mr-3 text-base' icon={faLock} />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center cursor-pointer  capitalize transition-colors', {
              'text-primary': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div>
            <FontAwesomeIcon className='mr-3 text-base' icon={faClipboardList} />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}

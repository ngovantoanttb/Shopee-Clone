
import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div className='bg-gray-100 pb-20'>
      <div className='max-w-6xl mx-auto grid grid-cols-12 gap-4'>
        <div className='col-span-2 mt-7'><UserSideNav /></div>
        <div className='col-span-10 mt-7'><Outlet/></div>
      </div>
    </div>
  )
}

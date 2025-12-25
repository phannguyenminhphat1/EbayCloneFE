import { Outlet } from 'react-router-dom'
import UserSideNav from 'src/components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='container py-8'>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-3 lg:col-span-2'>
          <UserSideNav />
        </div>
        <div className='col-span-9 lg:col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

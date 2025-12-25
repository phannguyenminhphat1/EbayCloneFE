import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constant/path'
import { AppContext } from 'src/contexts/app.context'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='flex flex-col md:flex-row gap-6 h-full rounded overflow-hidden pt-6'>
      {/* SIDEBAR */}
      <aside className='w-full md:w-64 bg-white'>
        <div className='flex items-center gap-2 mb-4'>
          <img
            src={profile?.ava ? profile.ava : 'https://i.pravatar.cc/150'}
            alt='avatar'
            className='w-10 h-10 rounded-full border border-gray-600 object-cover'
          />
          <div className=''>
            <p className='truncate font-semibold mb-1'>{profile?.fullname}</p>
            <Link to={path.profile} className='block text-gray-400 text-[13px]'>
              Change profile
            </Link>
          </div>
        </div>
        <nav className='space-y-2'>
          <a href='#' className='flex items-center gap-3 px-3 py-2 rounded-md bg-blue-50 text-blue-600 font-medium'>
            Profile
          </a>
          <a href='#' className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100'>
            Change Password
          </a>
          <a href='#' className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100'>
            Purchase History
          </a>
        </nav>
      </aside>
    </div>
  )
}

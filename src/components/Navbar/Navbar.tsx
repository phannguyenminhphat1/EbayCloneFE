export default function Navbar() {
  return (
    <div>
      {/* NAV BAR */}
      <nav className='bg-gray-100 border-t'>
        <div className='container py-2 flex gap-6 text-sm'>
          <a href='#' className='hover:underline'>
            Home
          </a>
          <a href='#' className='hover:underline'>
            Electronics
          </a>
          <a href='#' className='hover:underline'>
            Fashion
          </a>
          <a href='#' className='hover:underline'>
            Collectibles
          </a>
          <a href='#' className='hover:underline'>
            Health & Beauty
          </a>
          <a href='#' className='hover:underline'>
            Motors
          </a>
          <a href='#' className='hover:underline'>
            Deals
          </a>
        </div>
      </nav>
    </div>
  )
}

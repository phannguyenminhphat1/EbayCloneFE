export default function CategoryListing() {
  return (
    <div className='ebay-font max-w-7xl mx-auto px-6 py-6 flex gap-10'>
      {/* Sidebar */}
      <aside className='w-64'>
        <h2 className='text-lg font-semibold mb-4'>Shop by category</h2>

        <ul className='space-y-2 text-[15px]'>
          <li className='font-semibold cursor-pointer hover:underline'>Computers/Tablets & Networking</li>

          <li className='ml-4 font-bold text-black'>Laptops & Netbooks</li>

          <li className='ml-6 text-gray-700 hover:underline cursor-pointer'>Apple Laptops</li>

          <li className='ml-6 text-gray-700 hover:underline cursor-pointer'>PC Laptops & Netbooks</li>
        </ul>

        <hr className='my-5' />
      </aside>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Title */}
        <h1 className='text-4xl font-semibold'>Laptops & Netbooks</h1>

        {/* Filter Bar */}
        <div className='flex flex-wrap gap-2 mt-6'>
          <FilterButton title='Brand' />
          <FilterButton title='Most Suitable For' />
          <FilterButton title='Condition' />
          <FilterButton title='Price' />
          <FilterButton title='Buying Format' />
          <FilterButton title='Delivery Options' />

          <button className='border px-4 py-2 rounded-full text-sm hover:bg-gray-100'>
            <span className='mr-1'>⚙</span> All Filters
          </button>
        </div>

        {/* Sort Row */}
        <div className='flex justify-between items-center mt-6 text-sm'>
          <p className='text-gray-600'>287,550 results</p>

          <div className='flex items-center gap-4'>
            <button className='flex items-center gap-1'>
              <span>⇅</span>
              Sort: Best Match
            </button>

            <button className='text-xl'>☰</button>
            <button className='text-xl'>☷</button>
          </div>
        </div>

        {/* Product List */}
        <div className='mt-6 space-y-6'>
          {/* Product Card */}
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}

function FilterButton({ title }: { title: string }) {
  return <button className='border px-4 py-2 rounded-full text-sm hover:bg-gray-100'>{title} ▼</button>
}

function ProductCard() {
  return (
    <div className='flex gap-6 p-4 border rounded-lg shadow-sm hover:shadow transition'>
      {/* Product Image */}
      <div className='w-52 h-40 bg-gray-100 rounded-lg overflow-hidden'>
        <img
          src='https://i.ebayimg.com/images/g/t08AAOSw-qdjZqUP/s-l1600.webp'
          alt='item'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Product Info */}
      <div className='flex flex-col justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Lenovo ThinkPad Laptop Light Gaming PC Core i7 16GB RAM 512GB SSD</h3>

          <p className='text-gray-600 text-sm'>Good · Refurbished · Lenovo</p>

          <p className='text-2xl font-bold text-black mt-2'>8,362,350.84 VND</p>

          <p className='text-gray-600 text-sm'>Free international shipping</p>
          <p className='text-red-500 text-sm'>2,294 sold</p>
        </div>

        <div>
          <span className='inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs'>eBay Refurbished</span>
        </div>
      </div>
    </div>
  )
}

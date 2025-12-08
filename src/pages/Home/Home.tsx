import CarouselHome from 'src/components/CarouselHome'

export default function Home() {
  return (
    <div>
      {/* MAIN CONTENT */}
      <main className='ebay-font'>
        {/* HERO BANNER */}

        <CarouselHome />

        {/* DAILY DEALS */}
        <section className='container mt-10'>
          <h2 className='text-xl font-semibold mb-4'>Daily Deals</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'>
            <div className='bg-white shadow rounded p-3 hover:shadow-lg transition'>
              <img src='https://i.ebayimg.com/images/g/nB0AAOSwFvFjU7Ht/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm text-gray-700'>Wireless Earbuds</p>
              <p className='text-lg font-semibold text-red-600'>$18.99</p>
            </div>

            <div className='bg-white shadow rounded p-3 hover:shadow-lg transition'>
              <img src='https://i.ebayimg.com/images/g/pnEAAOSwjq5kOW7b/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm text-gray-700'>Smart Watch Series 7</p>
              <p className='text-lg font-semibold text-red-600'>$39.99</p>
            </div>

            <div className='bg-white shadow rounded p-3 hover:shadow-lg transition'>
              <img src='https://i.ebayimg.com/images/g/gvIAAOSwTW5kKOy-/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm'>Bluetooth Speaker</p>
              <p className='text-lg font-semibold text-red-600'>$12.49</p>
            </div>
          </div>
        </section>

        {/* POPULAR CATEGORIES */}
        <section className='container mt-12'>
          <h2 className='text-xl font-semibold mb-4'>Popular Categories</h2>
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center'>
            {['Electronics', 'Fashion', 'Home & Garden', 'Health & Beauty', 'Sports', 'Toys'].map((cat) => (
              <div key={cat}>
                <div className='w-full h-24 bg-gray-200 rounded' />
                <p className='mt-2 text-sm'>{cat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED ITEMS */}
        <section className='container mt-12 mb-16'>
          <h2 className='text-xl font-semibold mb-4'>Featured Items</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            <div className='bg-white shadow rounded hover:shadow-lg transition p-3'>
              <img src='https://i.ebayimg.com/images/g/Z3oAAOSwGCtkfjU~/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm'>Gaming Headset</p>
              <p className='font-semibold mt-1'>$25.90</p>
            </div>

            <div className='bg-white shadow rounded hover:shadow-lg transition p-3'>
              <img src='https://i.ebayimg.com/images/g/8lkAAOSwh2xki7tO/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm'>Laptop Sleeve Case</p>
              <p className='font-semibold mt-1'>$14.75</p>
            </div>

            <div className='bg-white shadow rounded hover:shadow-lg transition p-3'>
              <img src='https://i.ebayimg.com/images/g/7loAAOSwZ6dkqTWn/s-l1600.webp' className='rounded mb-2' />
              <p className='text-sm'>USB-C Charger</p>
              <p className='font-semibold mt-1'>$9.89</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

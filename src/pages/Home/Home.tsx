import CarouselHome from 'src/components/CarouselHome'
import ListCategories from 'src/components/ListCategories'
import ProductsCarousel from 'src/components/ProductsCarousel'

export default function Home() {
  return (
    <div>
      {/* MAIN CONTENT */}
      <main className='ebay-font'>
        {/* HERO BANNER */}
        <CarouselHome />

        {/* POPULAR CATEGORIES */}
        <section className='container mt-12'>
          <h2 className='text-xl font-semibold mb-4'>Popular Categories</h2>

          <ListCategories classNames='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 text-center' />
        </section>

        {/* FEATURED ITEMS */}
        <section className='container mt-12 mb-16'>
          <h2 className='text-xl font-semibold mb-4'>Featured Items</h2>
          {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
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
          </div> */}
          <ProductsCarousel />
        </section>

        {/* NO RELATED */}
        <section className='container mt-6'>
          <div className='w-full h-60 md:h-96 rounded-lg shadow overflow-hidden relative'>
            <div className='flex justify-around items-center gap-4 bg-gray-100 w-full h-full px-10'>
              <div className='flex flex-col gap-4'>
                <p className='font-bold text-black text-3xl'>Catch today's flash offers.</p>
                <p className=''>Shop eBay Deals that move fast</p>
                <button className='rounded-full  font-bold transition-all px-6 hover:bg-opacity-80 py-2.5 bg-black text-white border w-fit'>
                  Grab your Deal
                </button>
              </div>
              <div className='ml-32'>
                <img
                  alt='i'
                  src='https://i.ebayimg.com/images/g/gjQAAeSwbgxo0~8N/s-l960.webp'
                  data-load-time='1764902638887'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='container mt-12'>
          <div className='w-full h-60 md:h-96 rounded-lg shadow overflow-hidden relative'>
            <div className='flex justify-around items-center gap-4 bg-gray-100 w-full h-full px-10'>
              <div className='flex flex-col gap-4'>
                <p className='font-bold text-black text-3xl'>Shopping made easy</p>
                <p className=''>Enjoy reliability, secure deliveries and hassle-free returns.</p>
                <button className='rounded-full font-bold transition-all px-6 hover:bg-opacity-80 py-2.5 bg-black text-white border w-fit'>
                  Start now
                </button>
              </div>
              <div className=''>
                <img alt='i' src='https://i.ebayimg.com/images/g/ODwAAeSwZ1No1ACf/s-l960.webp' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

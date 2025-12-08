import { Carousel } from 'flowbite-react'

export default function CarouselHome() {
  return (
    <section className='container mt-6'>
      <div className='w-full h-60 md:h-96 rounded-lg shadow overflow-hidden relative'>
        <Carousel className='rounded-lg'>
          <div className='flex justify-around items-center gap-4 bg-gray-100 w-full h-full px-10'>
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-black text-3xl'>Top tech for your ride</p>
              <p className='font-semibold'>Don't miss a chance to save on items you've been looking for</p>
              <button className='rounded-full transition-all px-6 hover:bg-opacity-80 py-3 bg-black text-white border w-fit'>
                Explore now
              </button>
            </div>
            <div className=''>
              <img
                alt='i'
                src='https://i.ebayimg.com/images/g/GyQAAeSwrApo0~tp/s-l960.webp'
                data-load-time='1764902638887'
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-4 bg-gray-100 w-full h-full px-10'>
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-black text-3xl'>Top tech for your ride</p>
              <p className='font-semibold'>Don't miss a chance to save on items you've been looking for</p>
              <button className='rounded-full transition-all px-6 hover:bg-opacity-80 py-3 bg-black text-white border w-fit'>
                Explore now
              </button>
            </div>
            <div className='flex justify-between items-center gap-1'>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='Entertainment'
                  data-src='https://i.ebayimg.com/images/g/HRQAAeSwYEBouWT7/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/HRQAAeSwYEBouWT7/s-l300.webp'
                />
                <p className='font-semibold'>Entertainment</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='GPS'
                  data-src='https://i.ebayimg.com/images/g/cDgAAeSw8wlouWT9/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/cDgAAeSw8wlouWT9/s-l300.webp'
                />
                <p className='font-semibold'>GPS</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='Security devices'
                  data-src='https://i.ebayimg.com/images/g/dq0AAeSwtxlouWT-/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/dq0AAeSwtxlouWT-/s-l300.webp'
                />
                <p className='font-semibold'>Security Device</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center gap-4 bg-gray-100 w-full h-full px-10'>
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-black text-3xl'>From selfies to streaming</p>
              <p className='font-semibold'>Discover top brands and the latest models at prices you'll love</p>
              <button className='rounded-full transition-all px-6 hover:bg-opacity-80 py-3 bg-black text-white border w-fit'>
                Upgrade now
              </button>
            </div>
            <div className='flex justify-between items-center gap-1'>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='Apple'
                  data-src='https://i.ebayimg.com/images/g/cWIAAeSw3ABo0~sF/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/cWIAAeSw3ABo0~sF/s-l300.webp'
                />
                <p className='font-semibold'>Apple</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='Samsung'
                  data-src='https://i.ebayimg.com/images/g/cmAAAeSwJFpo0~sH/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/cmAAAeSwJFpo0~sH/s-l300.webp'
                />
                <p className='font-semibold'>Samsung</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <img
                  alt='Xiaomi'
                  data-src='https://i.ebayimg.com/images/g/qi4AAeSwxwRo0~sI/s-l300.webp'
                  data-size='290'
                  src='https://i.ebayimg.com/images/g/qi4AAeSwxwRo0~sI/s-l300.webp'
                />
                <p className='font-semibold'>Xiaomi</p>
              </div>
            </div>
          </div>
          <div
            className='flex justify-between items-center gap-4 w-full h-full px-10  bg-contain bg-no-repeat'
            style={{
              background: "url('https://i.ebayimg.com/images/g/9nwAAOSwfX5n1EXY/s-l1600.webp')",
              backgroundPosition: 'center'
            }}
          >
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-white text-3xl'>There's a deal for you, too</p>
              <p className='font-semibold text-white'>Don't miss a chance to save on items you've been looking for</p>
              <button className='rounded-full transition-all px-6 hover:bg-opacity-80 py-3 bg-slate-100 text- font-semibold border w-fit'>
                Upgrade now
              </button>
            </div>
            <div className=''></div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

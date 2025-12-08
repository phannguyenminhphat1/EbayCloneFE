export default function Footer() {
  return (
    <footer className='border-t mt-10 bg-gray-100 text-sm text-gray-700 ebay-font'>
      <div className='container py-10'>
        {/* TOP LINKS */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8'>
          <div>
            <h3 className='font-semibold mb-3'>Buy</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Registration
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  eBay Money Back Guarantee
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Bidding &amp; Buying Help
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Stores
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Sell</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Start selling
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Learn to sell
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Business sellers
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Affiliates
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Tools &amp; Apps</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Mobile apps
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  eBay Vault
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  eBay for Business
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Site map
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>About eBay</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Company info
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  News
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Investors
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Help &amp; Contact</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Seller Information Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Contact us
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Resolution Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Safety Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-3'>Community</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Announcements
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Discussion boards
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  eBay Giving Works
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  eBay for Charity
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* BOTTOM */}
        <div className='border-t mt-8 pt-6 text-xs text-gray-500'>
          <div className='flex flex-wrap justify-between items-center gap-3'>
            <p>© 1995–2025 eBay Inc. All Rights Reserved.</p>
            <div className='flex flex-wrap gap-4'>
              <a href='#' className='hover:underline'>
                Accessibility
              </a>
              <a href='#' className='hover:underline'>
                User Agreement
              </a>
              <a href='#' className='hover:underline'>
                Privacy
              </a>
              <a href='#' className='hover:underline'>
                Cookie Policy
              </a>
              <a href='#' className='hover:underline'>
                AdChoice
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

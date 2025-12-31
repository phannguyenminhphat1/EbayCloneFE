const path = {
  home: '/',
  user: '/user',
  purchaseHistory: '/user/purchase-history',
  changePassword: '/user/password',
  profile: '/user/profile',
  cart: '/cart',
  post: '/post',
  postCategory: '/post/:nameId',
  login: '/login',
  register: '/register',
  productList: '/product-list',
  productDetail: '/product-detail/:nameId'
} as const

export default path

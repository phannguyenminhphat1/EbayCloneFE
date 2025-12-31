import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

function handlePasswordSchemaYup() {
  return yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    )
}

export const schema = yup.object({
  fullname: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters'),

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters'),

  email: yup.string().required('Email is required').email('Invalid email format'),

  password: handlePasswordSchemaYup(),

  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Confirm password does not match'),

  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+?84|0)(3|5|7|8|9)[0-9]{8}$/, 'Invalid phone number format'),

  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid price range',
    test: testPriceMinMax
  }),

  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid price range',
    test: testPriceMinMax
  }),

  product_name: yup.string().trim().required('Product name is required')
})

export const userSchema = yup.object({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(100, 'Username must not exceed 100 characters'),
  fullname: yup.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup
    .string()
    .trim()
    .matches(/^(\+84|0)(3|5|7|8|9)([0-9]{8})$/, 'Invalid phone number'),

  date_of_birth: yup.date().max(new Date(), 'Please select a date in the past'),

  address: yup.string().max(255, 'Address must not exceed 255 characters'),

  password: yup.string().required('Password is required'),

  old_password: yup.string().required('Old password is required'),

  new_password: handlePasswordSchemaYup(),

  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('new_password')], 'Confirm password does not match'),

  ava: yup.string().matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i, 'Invalid image URL')
})

export const listingSchema = yup.object({
  category_id: yup.number().required('Category is required').typeError('Category is required'),

  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(255, 'Title must not exceed 255 characters'),

  listing_description: yup
    .string()
    .trim()
    .required('Listing description is required')
    .max(1000, 'Listing description must not exceed 1000 characters'),

  product_name: yup
    .string()
    .trim()
    .required('Product name is required')
    .max(255, 'Product name must not exceed 255 characters'),

  description: yup
    .string()
    .trim()
    .required('Description is required')
    .max(2000, 'Description must not exceed 2000 characters'),

  starting_price: yup
    .number()
    .required('Starting price is required')
    .typeError('Starting price must be a number')
    .min(1, 'Starting price must be greater than 0'),

  stock: yup
    .number()
    .required('Stock is required')
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(1, 'Stock must be at least 1'),
  images: yup.array().optional()

  // images: yup
  //   .array()
  //   .of(yup.string().matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i, 'Invalid image URL'))
  //   .min(1, 'At least one image is required')
  //   .required('Images are required')

  // is_auction: yup.boolean().required('Auction type is required'),

  // end_date: yup.string().when('is_auction', {
  //   is: true,
  //   then: (schema) =>
  //     schema
  //       .required('End date is required for auction')
  //       .test('is-future-date', 'End date must be in the future', (value) => {
  //         if (!value) return false
  //         return new Date(value).getTime() > Date.now()
  //       }),
  //   otherwise: (schema) => schema.notRequired()
  // })
})

export const registerSchema = schema.omit(['phone_number', 'price_max', 'price_min', 'product_name'])
export const loginSchema = userSchema.pick(['email', 'password'])
export const updateUserSchema = userSchema.pick(['username', 'fullname', 'phone', 'address', 'ava'])
export const createPostSchema = listingSchema

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type CreatePostSchema = yup.InferType<typeof createPostSchema>

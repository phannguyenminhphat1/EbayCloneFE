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
  fullname: yup.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone_number: yup
    .string()
    .trim()
    .matches(/^(\+84|0)(3|5|7|8|9)([0-9]{8})$/, 'Invalid phone number'),

  date_of_birth: yup.date().max(new Date(), 'Please select a date in the past'),

  address: yup.string().max(255, 'Address must not exceed 255 characters'),

  password: yup.string().required('Password is required'),

  new_password: handlePasswordSchemaYup(),

  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('new_password')], 'Confirm password does not match'),

  avatar: yup.string().matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i, 'Invalid image URL')
})
export const registerSchema = schema.omit(['phone_number', 'price_max', 'price_min', 'product_name'])
export const loginSchema = userSchema.pick(['email', 'password'])

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>

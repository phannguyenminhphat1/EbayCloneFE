import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/util.type'
import { toast } from 'react-toastify'
import Button from 'src/components/Button'

type FormData = RegisterSchema

export default function Register() {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    register
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (data: FormData) => authApi.register(data)
  })
  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (res) => {
        reset()
        toast.success(res.data.message, { autoClose: 2000 })
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(err)) {
          const formError = err.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-gray-100'>
      <div className='min-h-screen flex items-center justify-around py-4 px-2 gap-4'>
        <div className='buyerImage rounded-lg'>
          <img
            className='rounded-lg'
            src='https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_individual.jpg'
            alt='img buyer'
          />
        </div>

        <div className='bg-white shadow-md rounded-lg w-full max-w-lg p-8'>
          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <NavLink to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='117'
                height='48'
                viewBox='0 0 122 48.592'
                id='gh-logo'
                aria-labelledby='ebayLogoTitle'
              >
                <title id='ebayLogoTitle'>eBay Home</title>
                <g>
                  <path
                    fill='#F02D2D'
                    d='M24.355 22.759c-.269-5.738-4.412-7.838-8.826-7.813-4.756.026-8.544 2.459-9.183 7.915zM6.234 26.93c.364 5.553 4.208 8.814 9.476 8.785 3.648-.021 6.885-1.524 7.952-4.763l6.306-.035c-1.187 6.568-8.151 8.834-14.145 8.866C4.911 39.844.043 33.865-.002 25.759c-.05-8.927 4.917-14.822 15.765-14.884 8.628-.048 14.978 4.433 15.033 14.291l.01 1.625z'
                  ></path>
                  <path
                    fill='#0968F6'
                    d='M46.544 35.429c5.688-.032 9.543-4.148 9.508-10.32s-3.947-10.246-9.622-10.214-9.543 4.148-9.509 10.32 3.974 10.245 9.623 10.214zM30.652.029l6.116-.034.085 15.369c2.978-3.588 7.1-4.65 11.167-4.674 6.817-.037 14.412 4.518 14.468 14.454.045 8.29-5.941 14.407-14.422 14.454-4.463.026-8.624-1.545-11.218-4.681a33.237 33.237 0 01-.19 3.731l-5.994.034c.09-1.915.185-4.364.174-6.322z'
                  ></path>
                  <path
                    fill='#FFBD14'
                    d='M77.282 25.724c-5.548.216-8.985 1.229-8.965 4.883.013 2.365 1.94 4.919 6.7 4.891 6.415-.035 9.826-3.556 9.794-9.289v-.637c-2.252.02-5.039.054-7.529.152zm13.683 7.506c.01 1.778.071 3.538.232 5.1l-5.688.032a33.381 33.381 0 01-.225-3.825c-3.052 3.8-6.708 4.909-11.783 4.938-7.532.042-11.585-3.915-11.611-8.518-.037-6.665 5.434-9.049 14.954-9.318 2.6-.072 5.529-.1 7.945-.116v-.637c-.026-4.463-2.9-6.285-7.854-6.257-3.68.021-6.368 1.561-6.653 4.2l-6.434.035c.645-6.566 7.53-8.269 13.595-8.3 7.263-.04 13.406 2.508 13.448 10.192z'
                  ></path>
                  <path
                    fill='#92C821'
                    d='M91.939 19.852l-4.5-8.362 7.154-.04 10.589 20.922 10.328-21.02 6.486-.048-18.707 37.251-6.85.039 5.382-10.348-9.887-18.393'
                  ></path>
                </g>
              </svg>
            </NavLink>
          </div>
          {/* Title */}
          <h2 className='text-2xl font-semibold text-gray-800 text-center mb-2'>Create an account</h2>
          <p className='text-center text-sm text-gray-600 mb-6'>
            Already have an account?
            <NavLink to='/login' className='text-blue-600 hover:underline ml-1'>
              Sign in
            </NavLink>
          </p>
          {/* Form */}
          <form className='grid grid-cols-1 gap-1' onSubmit={onSubmit} noValidate>
            {/* Email */}
            <Input
              name='fullname'
              classNameLabel='text-sm text-gray-700'
              label='Fullname'
              type='text'
              className=''
              classNameInput='w-full px-4 py-2 border border-gray-300 rounded focus:ring-2
             focus:ring-blue-600 focus:outline-none text-[15px]'
              register={register}
              classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
              errorMessage={errors.fullname?.message}
            />

            {/* Username */}
            <Input
              name='username'
              classNameLabel='text-sm text-gray-700'
              label='Username'
              type='text'
              className=''
              classNameInput='w-full px-4 py-2 border border-gray-300 rounded focus:ring-2
             focus:ring-blue-600 focus:outline-none text-[15px]'
              register={register}
              classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
              errorMessage={errors.username?.message}
            />
            {/* Email */}
            <Input
              name='email'
              classNameLabel='text-sm text-gray-700'
              label='Email'
              type='text'
              className=''
              classNameInput='w-full px-4 py-2 border border-gray-300 rounded focus:ring-2
             focus:ring-blue-600 focus:outline-none text-[15px]'
              register={register}
              classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
              errorMessage={errors.email?.message}
            />
            {/* Password */}
            <Input
              name='password'
              classNameLabel='text-sm text-gray-700'
              label='Password'
              type='password'
              className='relative'
              classNameInput='w-full px-4 py-2 border border-gray-300 rounded focus:ring-2
             focus:ring-blue-600 focus:outline-none text-[15px]'
              register={register}
              classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
              errorMessage={errors.password?.message}
            />
            {/* Confirm Password */}
            <Input
              name='confirm_password'
              classNameLabel='text-sm text-gray-700'
              label='Confirm password'
              type='password'
              className='relative'
              classNameInput='w-full px-4 py-2 border border-gray-300 rounded focus:ring-2
             focus:ring-blue-600 focus:outline-none text-[15px]'
              register={register}
              classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
              errorMessage={errors.confirm_password?.message}
            />
            {/* Register Button */}
            <Button
              children={'Sign in'}
              className='w-full justify-center bg-blue-600 text-white py-2 rounded-md mt-4 flex items-center gap-2
           hover:bg-blue-700 transition text-[16px]'
              disabled={registerAccountMutation.isPending}
              isLoading={registerAccountMutation.isPending}
            />
          </form>
          {/* Divider */}
          <div className='flex items-center my-3'>
            <div className='flex-grow h-px bg-gray-300' />
            <span className='px-3 text-gray-500 text-sm'>or</span>
            <div className='flex-grow h-px bg-gray-300' />
          </div>
          {/* Google */}
          <button
            className='w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition-all 
               flex items-center justify-center gap-2'
          >
            <img src='https://www.svgrepo.com/show/355037/google.svg' className='h-5' />
            Continue with Google
          </button>

          <p className='text-xs text-gray-500 mt-5 leading-5'>
            By creating an account, you agree to eBay’s
            <a href='#' className='text-blue-600 hover:underline'>
              {' '}
              User Agreement
            </a>{' '}
            and acknowledge reading our{' '}
            <a href='#' className='text-blue-600 hover:underline'>
              User Privacy Notice
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

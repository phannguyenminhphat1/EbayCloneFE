import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/util.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'old_password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['old_password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    reset,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const changePasswordMutation = useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 1000 })
      reset()
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

  const onSubmit = handleSubmit((data) => {
    changePasswordMutation.mutate(data)
  })
  return (
    <div className='flex-1 bg-white rounded-lg shadow p-6'>
      <h1 className='text-xl font-semibold mb-6'>Change Password</h1>
      <form className='flex flex-col md:flex-row gap-6' onSubmit={onSubmit}>
        <div className='w-[60%]'>
          <Input
            className='relative'
            classNameLabel='block text-sm font-medium mb-1'
            label='Old password'
            placeholder='old password'
            type='password'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='old_password'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.old_password?.message}
          />
          <Input
            className='relative'
            classNameLabel='block text-sm font-medium mb-1'
            label='New password'
            placeholder='new password'
            type='password'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='new_password'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.new_password?.message}
          />
          <Input
            className='relative'
            classNameLabel='block text-sm font-medium mb-1'
            label='Confirm password'
            placeholder='confirm password'
            type='password'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='confirm_password'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.confirm_password?.message}
          />
          <div className='pt-4'>
            <Button
              type='submit'
              children={'Save changes'}
              className='justify-center bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2
                     hover:bg-blue-700 transition-all'
              disabled={changePasswordMutation.isPending}
              isLoading={changePasswordMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

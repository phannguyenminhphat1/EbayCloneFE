import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/util.type'
import { setProfileToLS } from 'src/utils/auth'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'username' | 'address' | 'ava' | 'fullname' | 'phone'>

const profileSchema = userSchema.pick(['username', 'fullname', 'address', 'ava', 'phone'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  const {
    register,
    setValue,
    setError,
    watch,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      ava: '',
      fullname: '',
      phone: '',
      username: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getMe
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: (res) => {
      refetch()
      setProfile(res.data.data as User)
      setProfileToLS(res.data.data as User)
      toast.success(res.data.message, { autoClose: 1000 })
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
  const avatar = watch('ava')

  const uploadAvaMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const onSubmit = handleSubmit(
    async (data) => {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('ava', file)
        const uploadRes = await uploadAvaMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('ava', avatarName)
      }
      updateProfileMutation.mutate({ ...data, ava: avatarName })
      console.log(data)
    },
    (err) => {
      console.log(err)
    }
  )

  useEffect(() => {
    if (profile) {
      setValue('username', profile.username)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('fullname', profile.fullname)
      setValue('ava', profile.ava)
    }
  }, [profile, setValue])

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    setFile(fileFromLocal)
  }
  return (
    <div className='flex-1 bg-white rounded-lg shadow p-6'>
      <h1 className='text-xl font-semibold mb-6'>Profile Information</h1>
      {/* AVATAR */}
      <form className='flex flex-col md:flex-row gap-6' onSubmit={onSubmit}>
        <div className='w-full md:w-1/4 flex flex-col items-center'>
          <img
            src={previewImage || avatar}
            alt='avatar'
            className='w-40 h-40 border-gray-600 rounded-full border-2 object-cover'
          />

          <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
          <button
            onClick={handleUpload}
            type='button'
            className='mt-4 px-4 py-2 border border-gray-300 transition-all rounded text-sm hover:bg-gray-100'
          >
            Change avatar
          </button>
          <p className='text-xs mt-3 text-gray-500 flex flex-wrap'>Max file size 1MB. File accept *.jpg .png .jpeg*</p>
        </div>
        {/* FORM */}
        <div className='flex-1'>
          <Input
            value={profileData?.data.data?.username}
            className=''
            classNameLabel='block text-sm font-medium mb-1'
            label='Username'
            placeholder='username'
            type='text'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='username'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.username?.message}
          />
          <Input
            className=''
            classNameLabel='block text-sm font-medium mb-1'
            label='Full name'
            placeholder='fullname'
            type='text'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='fullname'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.fullname?.message}
          />
          <div className='mb-5'>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              value={profile?.email ?? ''}
              disabled
              className='bg-gray-100 disabled cursor-not-allowed w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Phone</label>
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
                  className=''
                  classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
                  placeholder='+84 912 345 678'
                  {...field}
                  onChange={field.onChange}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </div>
          <Input
            className=''
            classNameLabel='block text-sm font-medium mb-1'
            label='Address'
            placeholder='address'
            type='text'
            classNameInput='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500'
            register={register}
            name='address'
            classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
            errorMessage={errors.address?.message}
          />

          <div className='pt-4'>
            <Button
              type='submit'
              children={'Save changes'}
              className='justify-center bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2
           hover:bg-blue-700 transition-all'
              disabled={updateProfileMutation.isPending}
              isLoading={updateProfileMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

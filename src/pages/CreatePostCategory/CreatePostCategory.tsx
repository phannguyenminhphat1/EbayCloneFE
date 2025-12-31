import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import listingApi from 'src/apis/listing.api'
import Input from 'src/components/Input'
import { config } from 'src/constant/config'
import { ResponseApi } from 'src/types/util.type'
import { createPostSchema, CreatePostSchema } from 'src/utils/rules'
import { getIdFromNameId, getNameFromNameId, isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = CreatePostSchema

export default function CreatePostCategory() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const categoryName = getNameFromNameId(nameId as string)
  const [files, setFiles] = useState<FileList | null>(null)

  const previewImages = useMemo(() => {
    if (!files || files.length === 0) return []
    return Array.from(files).map((file) => URL.createObjectURL(file))
  }, [files])

  const {
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    register
  } = useForm<FormData>({
    defaultValues: {
      category_id: Number(id)
    },
    resolver: yupResolver(createPostSchema)
  })

  const uploadImagesMutation = useMutation({
    mutationFn: listingApi.uploadImages
  })

  const createPostMutation = useMutation({
    mutationFn: listingApi.createPost,
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 1000 })
      reset()
      setFiles(null)
    },
    onError: (err) => {
      console.log(err)

      if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(err)) {
        const formError = err.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'server'
            })
          })
        }
      }
    }
  })

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesFromLocal = e.target.files
    if (!filesFromLocal) return
    if (filesFromLocal && filesFromLocal?.length > 3) {
      toast.error('Please select 3 images', { autoClose: 1000 })
      return
    }
    const hasInvalidFile = Array.from(filesFromLocal).some(
      (file) => file.size > config.maxFileSizeUpload || !file.type.includes('image')
    )
    if (hasInvalidFile) {
      toast.error('Invalid image - Per image max file size 1MB. File accept *.jpg .png .jpeg*', {
        autoClose: 1000
      })
      return
    }

    setFiles(filesFromLocal)
  }

  const onSubmit = handleSubmit(
    async (data) => {
      let fileList: string[] = []
      if (!files || files.length === 0) {
        toast.error('Images is required', { autoClose: 1000 })
        return
      } else if (files && files.length > 0) {
        const form = new FormData()
        Array.from(files).forEach((item) => {
          form.append('images', item)
        })
        const uploadRes = await uploadImagesMutation.mutateAsync(form)
        fileList = uploadRes.data.data as string[]
      }
      createPostMutation.mutate({ ...data, category_id: Number(id), images: fileList })
      console.log(data)
    },
    (err) => {
      console.log(err)
    }
  )
  return (
    <div className='container mx-auto py-8'>
      <div className='max-w-6xl mx-auto bg-white rounded-lg shadow'>
        <form onSubmit={onSubmit}>
          {/* Header */}
          <div className='px-6 py-4 border-b'>
            <h2 className='text-xl font-semibold text-gray-800'>Post new listing</h2>
          </div>
          {/* Form */}
          <div onSubmit={onSubmit} className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* LEFT */}
            <div className='space-y-4'>
              {/* Title */}
              <Input
                label='Title'
                classNameLabel='block text-sm font-medium text-gray-700 mb-1'
                className=''
                type='text'
                classNameInput='w-full border rounded placeholder:text-gray-500  px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                name='title'
                register={register}
                classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
                errorMessage={errors.title?.message}
              />
              {/* Category */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                <input
                  value={categoryName}
                  disabled
                  className='w-full bg-gray-100 cursor-not-allowed border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                />
              </div>
              {/* Short Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Short description</label>
                <textarea
                  rows={4}
                  className='w-full border placeholder:text-gray-500 rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200'
                  defaultValue={''}
                  {...register('listing_description')}
                />
                <div className='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'>
                  {errors.listing_description?.message}
                </div>
              </div>
              {/* Price */}
              <Input
                label='Price ($)'
                classNameLabel='block text-sm font-medium text-gray-700 mb-1'
                className=''
                type='text'
                classNameInput='w-full border rounded placeholder:text-gray-500 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                name='starting_price'
                register={register}
                classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
                errorMessage={errors.starting_price?.message}
              />
            </div>
            {/* RIGHT */}
            <div className='space-y-4'>
              {/* Product Name */}
              <Input
                label='Product name'
                classNameLabel='block text-sm font-medium text-gray-700 mb-1'
                className=''
                type='text'
                classNameInput='w-full placeholder:text-gray-500 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                name='product_name'
                register={register}
                classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
                errorMessage={errors.product_name?.message}
              />
              {/* Full Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Detailed description</label>
                <textarea
                  rows={5}
                  className='w-full placeholder:text-gray-500 border rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200'
                  defaultValue={''}
                  {...register('description')}
                />
                <div className='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'>{errors.description?.message}</div>
              </div>
              {/* Stock */}
              <Input
                label='Stock'
                classNameLabel='block text-sm font-medium text-gray-700 mb-1'
                className=''
                type='number'
                classNameInput='w-full placeholder:text-gray-500 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                name='stock'
                register={register}
                classNameError='mt-1 text-red-500 text-[13px] min-h-[1.25rem]'
                errorMessage={errors.stock?.message}
              />
              {/* Images */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Images</label>
                <div className='flex items-center gap-3 mb-3'>
                  <input
                    className='text-sm hidden'
                    type='file'
                    accept='.jpg,.jpeg,.png'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileChange}
                  />
                  <button
                    onClick={handleUpload}
                    type='button'
                    className='mt-1 px-4 py-2 border border-gray-300 transition-all rounded text-sm hover:bg-gray-100'
                  >
                    Uploads
                  </button>
                </div>
                <div className='grid grid-cols-3 gap-3'>
                  {previewImages.length > 0 ? (
                    previewImages.map((url, index) => (
                      <div key={index} className='border rounded h-28 overflow-hidden'>
                        <img src={url} alt={`preview-${index}`} className='object-contain h-full w-full' />
                      </div>
                    ))
                  ) : (
                    <>
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className='border rounded h-24 flex items-center justify-center text-gray-400 text-sm'
                        >
                          No image
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <p className='text-xs mt-3 text-gray-500 flex flex-wrap'>
                  Per file size max 1MB. File accept *.jpg .png .jpeg*
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className='px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-lg'>
            <button className='px-4 py-2 text-sm border rounded hover:bg-gray-100'>Cancel</button>
            <button className='px-5 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'>Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

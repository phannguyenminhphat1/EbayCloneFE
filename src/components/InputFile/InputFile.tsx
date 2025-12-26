import { useRef } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/constant/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxFileSizeUpload || fileFromLocal.type.includes('image'))) {
      toast.error('Invalid image - Max file size 1MB. File accept *.jpg .png .jpeg*', { autoClose: 1000 })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <button
        onClick={handleUpload}
        type='button'
        className='mt-4 px-4 py-2 border border-gray-300 transition-all rounded text-sm hover:bg-gray-100'
      >
        Change avatar
      </button>
    </>
  )
}

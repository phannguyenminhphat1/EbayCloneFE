import { ListingProductDetail } from 'src/types/product.type'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  prod: ListingProductDetail
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}

export default function QuantityController({ prod, max, onIncrease, onDecrease, onType, value, ...rest }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onType && onType(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onDecrease && onDecrease(_value)
  }

  // const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
  //   if (onFocusOut) {
  //     onFocusOut(Number(event.target.value))
  //   }
  // }
  return (
    <div className='my-4'>
      <p className='font-semibold mb-2'>Quantity:</p>
      <div className='flex items-center'>
        <button
          className='flex h-9 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>
        </button>
        <InputNumber
          value={value}
          className=''
          classNameError='hidden'
          classNameInput='h-9 w-14 border-t border-b border-gray-300 text-gray-600 p-1 text-center outline-none'
          onChange={handleChange}
          {...rest}
        />
        <button
          className='flex h-9 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
          onClick={increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
        <span className='ml-3 text-gray-500'>• {prod.total_sold} sold</span>
      </div>
      <p className='text-sm mt-2 text-gray-600'>In stock: {prod.stock}</p>
    </div>
  )
}

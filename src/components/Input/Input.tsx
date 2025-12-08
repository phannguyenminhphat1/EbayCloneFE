import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameLabel?: string
  label: string
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  className,
  classNameLabel,
  type,
  classNameError,
  classNameInput,
  errorMessage,
  register,
  rules,
  name,
  label
}: Props) {
  return (
    <div className={className}>
      <label className={classNameLabel}>{label}</label>
      <input type={type} className={classNameInput} {...register(name as string, rules)} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

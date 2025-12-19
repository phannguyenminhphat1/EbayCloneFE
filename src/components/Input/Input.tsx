import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameLabel?: string
  label?: string
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  className,
  classNameLabel,
  placeholder,
  type,
  classNameError,
  classNameInput,
  errorMessage,
  register,
  rules,
  name,
  label
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      {label && <label className={classNameLabel}>{label}</label>}

      <input placeholder={placeholder} type={type} className={classNameInput} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

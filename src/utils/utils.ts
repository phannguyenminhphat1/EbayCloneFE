import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'

export function isAxiosError<T>(err: unknown): err is AxiosError<T> {
  return axios.isAxiosError(err)
}

export function isAxiosUnprocessableEntityError<FormError>(err: unknown): err is AxiosError<FormError> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(err: unknown): err is AxiosError<UnauthorizedError> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.Unauthorized
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
export const getNameFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[0]
}

export const formatted = (valueDate: Date) => {
  return `${valueDate.getFullYear()}/${String(valueDate.getMonth() + 1).padStart(2, '0')}/${String(valueDate.getDate()).padStart(2, '0')}
 - ${String(valueDate.getHours()).padStart(2, '0')}:${String(valueDate.getMinutes()).padStart(2, '0')}`
}

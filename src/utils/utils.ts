import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError<FormError>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g,  '-') + `-i.${id}`
}

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i.')
    return arr[arr.length -1]
}

export const getAvatarUrl = (avatarName?: string) => `${config.baseURL}/images/${avatarName}`
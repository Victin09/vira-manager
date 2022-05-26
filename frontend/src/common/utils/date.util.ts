import { capitalizeFirstLetter } from '@vira/common/utils/text.util'

export const getDateName = (locale: string): string => {
  const date = new Date()
  const day = date.getDay()
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date)
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
  return `${capitalizeFirstLetter(weekday)}, ${day} de ${capitalizeFirstLetter(month)}`
}

export const formatToDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

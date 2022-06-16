export const getApiUrl = (): string => {
  if (!process.env.API_PORT || process.env.API_PORT === '') return `${process.env.API_URL}`
  return `${process.env.API_URL}:${process.env.API_PORT}`
}

export const generateApiUrl = (url: string, port: number): string => {
  return `${url}:${port}`
}

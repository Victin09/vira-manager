export const getApiUrl = (): string => {
  return `http://${process.env.API_URL}:${process.env.API_PORT}`
}

export const generateApiUrl = (url: string, port: number): string => {
  return `http://${url}:${port}`
}

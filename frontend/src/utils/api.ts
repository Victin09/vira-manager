export const getApiUrl = (): string => {
  if (!process.env.REACT_APP_API_PORT || process.env.REACT_APP_API_PORT === "")
    return `${process.env.REACT_APP_API_PATH}`;
  return `${process.env.REACT_APP_API_PATH}:${process.env.REACT_APP_API_PORT}`;
};

export const generateApiUrl = (url: string, port: number): string => {
  return `${url}:${port}`;
};

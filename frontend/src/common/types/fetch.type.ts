export type Cache<T> = { [url: string]: T };

export type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export type Response<T> = {
  status: number;
  message: string;
  data?: T;
};

export type State<T> = {
  data?: T;
  error?: Error;
  fetchData: (endpoint: string, options?: RequestInit) => void;
};

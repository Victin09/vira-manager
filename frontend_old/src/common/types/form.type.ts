export type Validation = {
  required?: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
};

export type RegisterField<T> = {
  value: string | T[keyof T];
  onChange: (e: any) => void;
  onBlur: () => void;
};

export type Form<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  register: (name: keyof T, validation?: Validation | undefined) => RegisterField<T>;
  handleSubmit: (callback: any) => (e: React.FormEvent<HTMLFormElement>) => void;
};

export type Error<T> = Partial<Record<keyof T, string>>;

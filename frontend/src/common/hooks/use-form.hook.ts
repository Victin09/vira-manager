import React, { useState } from 'react'
import { Form, RegisterField, Error, Validation } from '@vira/common/types/form.type'

export const useForm = <T extends Record<keyof T, any> = Record<string, unknown>>(): Form<T> => {
  const [values, setValues] = useState<T>({} as T)
  const [errors, setErrors] = useState<Error<T>>({} as T)

  const validateField = (value: any, validation?: Validation): string => {
    if (validation) {
      if (validation.required) {
        if (!value || !value.trim()) {
          return validation.required.message || 'This field is required'
        }
      }

      if (validation.minLength) {
        if (value.length < validation.minLength.value) {
          return (
            validation.minLength.message ||
            `This field must be at least ${validation.minLength.value} characters`
          )
        }
      }

      if (validation.maxLength) {
        if (value.length > validation.maxLength.value) {
          return (
            validation.maxLength.message ||
            `This field must be less than ${validation.maxLength.value} characters`
          )
        }
      }

      if (validation.pattern) {
        if (!validation.pattern.value.test(value)) {
          return validation.pattern.message || 'Invalid value'
        }
      }
    }

    return ''
  }

  const register = (name: keyof T, validation?: Validation): RegisterField<T> => {
    return {
      value: values[name] || '',
      onChange: (e: any) => {
        setValues({
          ...values,
          [name]: e.target.value
        })
      },
      onBlur: () => {
        const error = validateField(values[name], validation)
        setErrors({
          ...errors,
          [name]: error
        })
      }
    }
  }

  const handleSubmit =
    (callback: any) =>
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      const error = Object.values(errors).find((err) => err)
      if (!error) {
        return callback()
      }
    }

  return {
    values,
    errors,
    register,
    handleSubmit
  }
}

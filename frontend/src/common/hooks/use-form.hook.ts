import React, { useState } from "react";
import { Form, RegisterField, Error, Validation } from "@vira/common/types/form.type";

// eslint-disable-next-line @typescript-eslint/ban-types
export const useForm = <T extends Record<keyof T, any> = {}>(): Form<T> => {
  const [values, setValues] = useState<T>({} as T);
  const [errors, setErrors] = useState<Error<T>>({} as T);

  const validateField = (value: any, validation?: Validation): string => {
    // check if the rules exist since a field can not have validations
    if (validation) {
      // if the required rule is present
      if (validation.required) {
        // if the value is empty
        console.log("im in");
        if (!value || !value.trim()) {
          return validation.required.message || "This field is required";
        }
      }

      // if the minLength rule is present
      if (validation.minLength) {
        // if the value is less than the minLength
        if (value.length < validation.minLength.value) {
          console.log("MINLENGTH");
          return (
            validation.minLength.message ||
            `This field must be at least ${validation.minLength.value} characters`
          );
        }
      }

      // if the maxLength rule is present
      if (validation.maxLength) {
        // if the value is greater than the maxLength
        if (value.length > validation.maxLength.value) {
          return (
            validation.maxLength.message ||
            `This field must be less than ${validation.maxLength.value} characters`
          );
        }
      }

      // if the pattern rule is present
      if (validation.pattern) {
        // if the value does not match the pattern
        if (!validation.pattern.value.test(value)) {
          return validation.pattern.message || "Invalid value";
        }
      }
    }

    // if the are not errors
    return "";
  };

  const register = (name: keyof T, validation?: Validation): RegisterField<T> => {
    return {
      // set the initial value
      value: values[name] || "",
      // value: values[name],
      onChange: (e: any) => {
        setValues({
          ...values,
          [name]: e.target.value
        });
      },
      onBlur: () => {
        const error = validateField(values[name], validation);
        setErrors({
          ...errors,
          [name]: error
        });
      }
    };
  };

  // handle form submission
  const handleSubmit =
    (callback: any) =>
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const error = Object.values(errors).find((err) => err);
      if (!error) {
        return callback();
      }
    };

  return {
    values,
    errors,
    register,
    handleSubmit
  };
};

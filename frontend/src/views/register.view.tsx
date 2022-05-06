import { useForm } from "@vira/common/hooks/use-form.hook";
import { useAuth } from "@vira/common/providers/auth.provider";
import { SignUp } from "@vira/models/auth.model";
import React from "react";

const Register = (): JSX.Element => {
  const { values, errors, register, handleSubmit } = useForm<SignUp>();
  const { signup, error } = useAuth();

  const sendForm = async (): Promise<void> => {
    console.log("values", values);
    console.log("errors", errors);
    signup({ ...values });
    if (error) return;
  };

  return (
    <div className="row h-100 align-items-center justify-content-center">
      <div className="col-sm-12 col-md-4">
        <div className="card shadow-sm p-3">
          <div className="card-body">
            <h2 className="card-title text-center mb-2">Signup</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit(sendForm)} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={"form-control" + (errors.email ? " is-invalid" : "")}
                  id="email"
                  placeholder="vira@toller.com"
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <div className="text-danger fst-italic">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className={"form-control" + (errors.fullname ? " is-invalid" : "")}
                  id="fullname"
                  placeholder="vira@toller.com"
                  name="fullname"
                  {...register("fullname", {
                    required: {
                      value: true,
                      message: "Full name is required"
                    }
                  })}
                />
                {errors.fullname && <div className="text-danger fst-italic">{errors.fullname}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={"form-control" + (errors.password ? " is-invalid" : "")}
                  id="password"
                  placeholder="··············"
                  name="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required"
                    }
                  })}
                />
                {errors.password && <div className="text-danger fst-italic">{errors.password}</div>}
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary d-grid gap-2">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useForm } from "../../hooks/use-form";
import { useAuth } from "../../providers/auth";
import { SignUp } from "../../types/auth";

const SignUpView = () => {
  const { values, errors, register, handleSubmit } = useForm<SignUp>();
  const { signup, error } = useAuth();

  const sendForm = async (): Promise<void> => {
    signup({ ...values });
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="card shadow border-0" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Registrate</h5>
          <p className="card-text">
            <form
              className="uk-form-stacked"
              onSubmit={handleSubmit(sendForm)}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className={`${
                    errors.fullname ? "is-invalid " : ""
                  }form-control`}
                  id="fullname"
                  placeholder="Vira Manager"
                  name="fullname"
                  {...register("fullname", {
                    required: {
                      value: true,
                      message: "El correo es obligatorio",
                    },
                  })}
                />
                {errors.fullname && (
                  <div className="invalid-feedback">
                    <span className="fw-semibold">Opps!</span> {errors.fullname}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className={`${errors.email ? "is-invalid " : ""}form-control`}
                  id="email"
                  placeholder="vira@vira.es"
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo es obligatorio",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "El correo no es válido",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    <span className="fw-semibold">Opps!</span> {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className={`${
                    errors.password ? "is-invalid " : ""
                  }form-control`}
                  id="password"
                  placeholder="*********"
                  name="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es obligatoria",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    <span className="fw-semibold">Opps!</span> {errors.password}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;

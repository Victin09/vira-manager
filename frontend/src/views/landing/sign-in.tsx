import { useForm } from "../../hooks/use-form";
import { useAuth } from "../../providers/auth";
import { SignIn } from "../../types/auth";

const SignInView = () => {
  const { values, errors, register, handleSubmit } = useForm<SignIn>();
  const { signin } = useAuth();

  const sendForm = async (): Promise<void> => {
    const { email, password } = values;
    signin({ email, password });
  };

  return (
    <div className="h-100 d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="card shadow border-0" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Inicia sesión</h5>
          <form
            className="card-text"
            onSubmit={handleSubmit(sendForm)}
            noValidate
          >
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
        </div>
      </div>
    </div>
  );
};

export default SignInView;

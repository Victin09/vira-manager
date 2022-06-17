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
    <div
      className="uk-flex uk-flex-center uk-flex-middle"
      data-uk-height-viewport="offset-top: true"
    >
      <div
        className="uk-card uk-card-default uk-box-shadow-medium uk-card-body uk-border-rounded"
        style={{ width: "24rem" }}
      >
        <h5 className="uk-card-title uk-text-bold uk-text-center">
          Registrate
        </h5>
        <form
          className="uk-form-stacked"
          onSubmit={handleSubmit(sendForm)}
          noValidate
        >
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="fullname">
              Nombre
            </label>
            <div className="uk-form-controls">
              <input
                className={`${
                  errors.fullname ? "uk-form-danger " : ""
                }uk-input uk-border-rounded`}
                id="fullname"
                type="text"
                placeholder="Vira manager"
                name="fullname"
                {...register("fullname", {
                  required: {
                    value: true,
                    message: "El nombre es obligatorio",
                  },
                })}
              />
            </div>
            {errors.fullname && (
              <div className="uk-text-danger">
                <span className="uk-text-bold">Opps!</span> {errors.fullname}
              </div>
            )}
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="email">
              Correo electrónico
            </label>
            <div className="uk-form-controls">
              <input
                className={`${
                  errors.email ? "uk-form-danger " : ""
                }uk-input uk-border-rounded`}
                id="email"
                type="text"
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
            </div>
            {errors.email && (
              <div className="uk-text-danger">
                <span className="uk-text-bold">Opps!</span> {errors.email}
              </div>
            )}
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="password">
              Contraseña
            </label>
            <div className="uk-form-controls">
              <input
                className={`${
                  errors.password ? "uk-form-danger " : ""
                }uk-input uk-border-rounded`}
                id="password"
                type="password"
                name="password"
                placeholder="***********"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
                  },
                })}
              />
            </div>
            {errors.password && (
              <div className="uk-text-danger">
                <span className="uk-text-bold">Opps!</span> {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="uk-width-1-1 uk-border-rounded uk-button uk-button-primary"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;

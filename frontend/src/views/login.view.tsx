import { useForm } from '@vira/common/hooks/use-form.hook'
import { useAuth } from '@vira/common/providers/auth.provider'
import React from 'react'

type LoginProps = {
  email: string
  password: string
}

const Login = () => {
  const { values, errors, register, handleSubmit } = useForm<LoginProps>()
  const { signin } = useAuth()

  const sendForm = async (): Promise<void> => {
    console.log('values', values)
    console.log('errors', errors)
    const { email, password } = values
    signin({ email, password })
  }

  return (
    <div className='hero flex-grow bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        {/* <div className='basis-1/4 text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Inicia sesión!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div> */}
        <div className='card w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl'>
          <div className='card-body'>
            <h2 className='card-title'>Inicia sesión</h2>
            <form onSubmit={handleSubmit(sendForm)}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='text'
                  placeholder='john@lennon.com'
                  className={`input input-bordered${errors.email ? ' input-error' : ''}`}
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'El email es obligatorio'
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.email}</span>
                </label>
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  placeholder='johnlennon123'
                  className='input input-bordered'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La contraseña es obligatoria'
                    }
                  })}
                />
                {/* <label className='label'>
                <a href='#' className='link link-hover label-text-alt'>
                Forgot password?
                </a>
              </label> */}
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.password}</span>
                </label>
              </div>
              <div className='form-control mt-6'>
                <button type='submit' className='btn btn-primary'>
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

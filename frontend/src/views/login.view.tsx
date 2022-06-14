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
    const { email, password } = values
    signin({ email, password })
  }

  return (
    <div className='d-flex h-full justify-content-center align-items-center'>
      <div className='card shadow' style={{ width: '24rem' }}>
        <div className='card-body'>
          <h5 className='card-title text-center mb-4'>Inicia sesión</h5>
          {/* <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6> */}
          <form onSubmit={handleSubmit(sendForm)} noValidate>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Correo electrónico
              </label>
              <input
                type='email'
                className={`${errors.email ? 'is-invalid ' : ''}form-control`}
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='vira@vira.es'
                name='email'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El correo es obligatorio'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'El correo no es válido'
                  }
                })}
              />
              {errors.email && (
                <div className='invalid-feedback'>
                  <span className='fw-bold'>Oops!</span> {errors.email}
                </div>
              )}
              <div id='emailHelp' className='form-text'>
                Nunca compartiremos tu correo electrónico con nadie más.
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Contraseña
              </label>
              <input
                type='password'
                className={`${errors.password ? 'is-invalid ' : ''}form-control`}
                id='exampleInputPassword1'
                placeholder='***********'
                name='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'La contraseña es obligatoria'
                  }
                })}
              />
              {errors.password && (
                <div className='invalid-feedback'>
                  <span className='fw-bold'>Oops!</span> {errors.password}
                </div>
              )}
            </div>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='exampleCheck1' />
              <label className='form-check-label' htmlFor='exampleCheck1'>
                Mantener sesión iniciada
              </label>
            </div>
            <button type='submit' className='w-full btn btn-primary'>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

import { useForm } from '@vira/common/hooks/use-form.hook'
import { useAuth } from '@vira/common/providers/auth.provider'
import { SignUp } from '@vira/models/auth.model'
import React from 'react'

const Register = () => {
  const { values, errors, register, handleSubmit } = useForm<SignUp>()
  const { signup, error } = useAuth()

  const sendForm = async (): Promise<void> => {
    signup({ ...values })
    if (error) {
      console.log(error)
    }
  }

  return (
    <div className='hero bg-base-200'>
      <div className='hero-content lg:flex-row-reverse'>
        <div className='basis-1/4 text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Registrate!</h1>
          <p className='py-6'>
            Regístrate y podrás disfrutar de todas las herramientas de VIRA MANAGER, tales como un{' '}
            <span className='font-semibold italic'>tablero kanban</span>, un{' '}
            <span className='font-semibold italic'>espacio de trabajo remoto</span> para equipos y
            hasta un <span className='font-semibold italic'>chat</span>!. Todo esto con solo pulsar
            un botón.
          </p>
        </div>
        <div className='card w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl'>
          <div className='card-body'>
            <h2 className='card-title'>Registrate</h2>
            <form onSubmit={handleSubmit(sendForm)}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Nombre y apellidos</span>
                </label>
                <input
                  type='text'
                  placeholder='John Lennon'
                  className={`input input-bordered${errors.fullname ? ' input-error' : ''}`}
                  {...register('fullname', {
                    required: {
                      value: true,
                      message: 'El nombre es obligatorio'
                    }
                  })}
                />
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.fullname}</span>
                </label>
              </div>
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
                    },
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe ser mínimo de 8 caracteres'
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

export default Register

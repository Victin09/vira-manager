import { useForm } from '@vira/common/hooks/use-form.hook'
import { useAuth } from '@vira/common/providers/auth.provider'
import React from 'react'
import { Link } from 'react-router-dom'

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
    <div className='flex h-full items-center justify-center'>
      <div className='p-4 w-80 bg-white rounded border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='space-y-6' onSubmit={handleSubmit(sendForm)} noValidate>
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className={`${
                    errors.email && 'text-red-900'
                  } w-5 h-5 text-gray-500 dark:text-gray-400`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='email-address-icon'
                className={`${
                  errors.email && 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700'
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder='vira@manager.com'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Email is not valid'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                <span className='font-medium'>Oops!</span> {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className={`${
                    errors.password && 'text-red-900'
                  } w-5 h-5 text-gray-500 dark:text-gray-400`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  ></path>
                </svg>
              </div>
              <input
                type='password'
                className={`${
                  errors.password &&
                  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700'
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder='••••••••'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                <span className='font-medium'>Oops!</span> {errors.password}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Login to your account
          </button>
          <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
            Not registered?{' '}
            <Link to='/sign-up' className='text-blue-700 hover:underline dark:text-blue-500'>
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='flex flex-col flex-1 h-full justify-center items-center text-center dark:text-white'>
      <h1 className='text-5xl font-bold'>Vira Manager</h1>
      <p className='py-6'>
        Vira Manager es un software que incluye herramientas para la gestión de proyectos.
      </p>
      <Link
        to='/sign-in'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        Empezar ahora
      </Link>
    </div>
  )
}

export default Landing

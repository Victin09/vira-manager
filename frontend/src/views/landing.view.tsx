import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='hero flex-grow bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Vira Manager</h1>
          <p className='py-6'>
            Vira Manager es un software que incluye herramientas para la gestión de proyectos.
          </p>
          <Link to='/sign-in' className='btn btn-primary'>
            Empezar ahora
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing

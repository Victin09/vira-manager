import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const LandingTemplate = () => {
  return (
    <div className='container flex h-screen min-h-screen flex-col overflow-hidden'>
      <div className='navbar sticky top-0 z-50 bg-base-100 shadow-sm'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost text-xl normal-case'>
            vira.MANAGER
          </Link>
        </div>
        <div className='navbar-end'>
          <Link to='sign-in' className='mr-4'>
            Iniciar sesión
          </Link>
          <Link to='sign-up' className='btn btn-primary'>
            Registrarse
          </Link>
        </div>
      </div>

      <div className='flex flex-1 flex-wrap overflow-auto'>{<Outlet />}</div>
    </div>
  )
}

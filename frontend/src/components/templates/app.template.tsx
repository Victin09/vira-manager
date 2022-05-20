import React from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getInitials } from '@vira/common/utils/text.util'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { ThemeSelector } from '@vira/components/navbar/theme-selector.component'

export const AppTemplate = () => {
  const { getUser } = useAuth()
  const location = useLocation()

  return (
    <div className='flex h-screen min-h-screen w-full flex-col overflow-hidden'>
      <div className='navbar sticky top-0 z-50 bg-primary text-primary-content shadow-sm'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'>
              <li>
                <NavLink
                  to='/kanban'
                  className={(navData) => (navData.isActive ? 'bg-base-300' : '')}
                >
                  Tablero kanban
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={location.pathname}
                  className={`disabled ${(navData) => (navData.isActive ? ' active' : '')}`}
                >
                  Documentación
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={location.pathname}
                  className={`disabled ${(navData) => (navData.isActive ? ' active' : '')}`}
                >
                  Chat
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to='/' className='btn btn-ghost text-xl normal-case'>
            viraMANAGER
          </Link>
          <ul className='menu menu-horizontal hidden p-0 lg:flex'>
            <li>
              <NavLink
                to='/kanban'
                className={(navData) => (navData.isActive ? ' bg-secondary' : 'hover:border-b-2')}
              >
                Tablero kanban
              </NavLink>
            </li>
            <li>
              <NavLink
                to={location.pathname}
                className={`disabled ${(navData) => (navData.isActive ? ' active' : '')}`}
              >
                Documentación
              </NavLink>
            </li>
            <li>
              <NavLink to={location.pathname} className='disabled'>
                Drive
              </NavLink>
            </li>
            <li>
              <NavLink to={location.pathname} className='disabled'>
                Chat
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='avatar placeholder btn btn-ghost btn-circle'>
              <div className='w-10 rounded-full bg-neutral-focus text-neutral-content'>
                <span>{getInitials(getUser()!.fullname)}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
            >
              <li>
                <a>Perfil</a>
              </li>
              <li>
                <a>Ajustes</a>
              </li>
              <li>
                <a>Cerrar sesión</a>
              </li>
            </ul>
          </div>
          <ThemeSelector />
        </div>
      </div>
      <div className='flex flex-1 flex-wrap overflow-auto'>{<Outlet />}</div>
    </div>
  )
}
function useRouteMatch(arg0: { path: any; exact: any; strict: any }) {
  throw new Error('Function not implemented.')
}

import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ThemeSelector } from '../navbar/theme-selector.component'

export const LandingTemplate = () => {
  return (
    <div className='flex flex-col h-full'>
      <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 p-4 sm:p-4 py-2.5 dark:bg-gray-800'>
        <div className='flex flex-wrap justify-between md:justify-end items-center mx-auto'>
          <Link to='/' className='flex items-center md:mr-auto'>
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              vira.MANAGER
            </span>
          </Link>
          <div className='flex items-center md:order-2 ml-3'>
            <ThemeSelector />
            <button
              data-collapse-toggle='mobile-menu'
              type='button'
              className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className='hidden justify-start items-center w-full md:flex md:ml-4 md:w-auto md:order-1 md:ml-auto'
            id='mobile-menu'
          >
            <ul className='flex flex-col mt-4 md:flex-row md:space-x-3 md:mt-0 md:text-sm md:font-medium'>
              <li>
                <NavLink
                  to='/sign-in'
                  className={(navData) =>
                    navData.isActive
                      ? 'text-blue-700 block py-2 pr-4 pl-3 rounded md:p-0 dark:text-blue-600'
                      : 'block py-2 pr-4 pl-3 rounded md:p-0 dark:text-white'
                  }
                >
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/sign-up'
                  className={(navData) =>
                    navData.isActive
                      ? 'text-blue-700 block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-blue-600'
                      : 'block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-white'
                  }
                >
                  Sign up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='w-ful h-full bg-white dark:bg-gray-800'>
        <Outlet />
      </div>
    </div>
  )
}

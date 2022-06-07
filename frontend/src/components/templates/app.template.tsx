/* eslint-disable multiline-ternary */
import React from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getInitials } from '@vira/common/utils/text.util'
import { NavLink, Link, Outlet } from 'react-router-dom'

export const AppTemplate = () => {
  const { getUser } = useAuth()

  return (
    <div className='flex flex-col h-full'>
      <nav className='bg-white border-b border-gray-200 px-4 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
        <div className='flex flex-wrap justify-between md:justify-start items-center mx-auto'>
          <button
            data-collapse-toggle='sidebar-menu'
            type='button'
            className='inline-flex items-center p-2 mr-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            aria-controls='sidebar-menu'
            aria-expanded='true'
          >
            <span className='sr-only'>Open sidebar</span>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
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
          <Link to='/' className='flex items-center'>
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              vira.MANAGER
            </span>
          </Link>
          <div className='flex items-center md:order-2 md:ml-auto'>
            <button
              type='button'
              className='inline-flex items-center p-2 mr-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              data-dropdown-toggle='dropdown'
            >
              <span className='sr-only'>Open apps menu</span>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                ></path>
              </svg>
            </button>
            <div
              className='hidden z-50 my-4 w-52 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
              id='dropdown'
            >
              <div className='py-3 px-4 bg-gray-100'>
                <span className='block text-md text-center font-semibold text-gray-900 dark:text-white'>
                  Apps
                </span>
              </div>
              <ul className='py-1' aria-labelledby='dropdown'>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            <button
              type='button'
              className='relative w-10 h-10 overflow-hidden bg-blue-600 rounded-full dark:bg-gray-600'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='dropdown'
            >
              <span className='sr-only'>Open user menu</span>
              {getUser()!.avatar ? (
                <img
                  className='w-10 h-10 rounded-full'
                  src='/docs/images/people/profile-picture-5.jpg'
                  alt='Rounded avatar'
                ></img>
              ) : (
                <span className='text-white'>{getInitials(getUser()!.fullname)}</span>
              )}
            </button>
            <div
              className='hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
              id='dropdown'
              data-popper-reference-hidden=''
              data-popper-escaped=''
              data-popper-placement='top'
            >
              <div className='py-3 px-4'>
                <span className='block text-sm font-semibold text-gray-900 dark:text-white'>
                  {getUser()!.fullname}
                </span>
                <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                  {getUser()!.email}
                </span>
              </div>
              <ul className='py-1' aria-labelledby='dropdown'>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mobile-menu-2'
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
            className='hidden justify-start items-center w-full md:flex md:ml-4 md:w-auto md:order-1'
            id='mobile-menu-2'
          >
            <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
              <li>
                <NavLink
                  to='/kanban'
                  className={(navData) =>
                    navData.isActive
                      ? 'text-blue-700 block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-white'
                      : 'block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 dark:text-white'
                  }
                >
                  Kanban
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

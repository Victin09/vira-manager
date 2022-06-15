import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const KanbanTemplate = () => {
  const { pathname } = useLocation()

  return (
    <div className='container-fluid h-full overflow-hidden'>
      <div className='row flex-nowrap h-full'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 h-full'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 h-full shadow-sm'>
            <ul
              className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
              id='menu'
            >
              <li className='nav-item'>
                <a href='#' className='nav-link align-middle px-0'>
                  <span className='ms-1 d-flex align-items-center'>
                    {' '}
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
                        d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                      ></path>
                    </svg>{' '}
                    Proyectos
                  </span>
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link align-middle px-0'>
                  <span className='ms-1 d-flex align-items-center'>
                    {' '}
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
                        d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
                      ></path>
                    </svg>{' '}
                    Tareas
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='col'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

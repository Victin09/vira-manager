import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const KanbanTemplate = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('params', pathname)
  }, [pathname])

  return (
    <div className='flex grow h-full overflow-hidden'>
      <aside
        id='sidebar-menu'
        className='min-w-fit w-48 border-r-2 border-r-gray-100'
        aria-label='Sidebar'
      >
        <div className='overflow-y-auto h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800'>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/kanban'
                className={`${
                  pathname.includes('kanban') && !pathname.includes('kanban/tasks')
                    ? 'text-blue-700 bg-gray-200 dark:bg-gray-700'
                    : 'text-gray-500'
                } flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <svg
                  className={`${
                    pathname.includes('kanban') && !pathname.includes('kanban/tasks')
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  } flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Proyectos</span>
              </Link>
            </li>
            <li>
              <Link
                to='/kanban/tasks'
                className={`${
                  pathname.includes('kanban/tasks')
                    ? 'text-blue-700 bg-gray-200 dark:bg-gray-700'
                    : 'text-gray-500'
                } flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <svg
                  className={`${
                    pathname.includes('kanban/tasks') ? 'text-blue-700' : 'text-gray-500'
                  } flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  ></path>
                </svg>

                <span className='flex-1 ml-3 whitespace-nowrap'>Tareas</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className='flex grow'>
        <Outlet />
      </div>
    </div>
  )
}

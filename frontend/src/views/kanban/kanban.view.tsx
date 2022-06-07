/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { getApiUrl } from '@vira/common/utils/api.util'
import { Kanban } from '@vira/models/kanban/kanban.model'
import { Link } from 'react-router-dom'
import { CreateKanbanProjectModal } from '@vira/components/kanban/create-project.kanban'

const KanbanView = () => {
  const [data, setData] = useState<Kanban>()
  const [filterProject, setFilterProject] = useState('')
  const { getUser } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const result: Response = await fetch(`${getApiUrl()}/kanban/projects/${getUser()!.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const resultData: ApiResponse<Kanban> = await result.json()
      if (resultData.status === 200) setData(resultData.data)
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='flex justify-between px-2'>
        <span className='text-2xl px-2 font-bold'>Tus proyectos</span>
        <button
          className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='button'
          data-modal-toggle='createKanbanProject'
        >
          Crear proyecto
        </button>
        <CreateKanbanProjectModal />
      </div>

      {data ? (
        <div className='flex flex-1 flex-col p-2'>
          <div className='mt-2 flex flex-1'>
            <div className='mb-3 w-full font-normal text-gray-700 dark:text-gray-400'>
              {!data.projects.length ? (
                <span className='fw-light'>
                  No tienes ningún proyecto asociado, puedes crear uno{' '}
                  <a className='text-blue-600' href='#create-project-modal' role='button'>
                    aquí
                  </a>
                </span>
              ) : (
                <div className='overflow-x-auto'>
                  <div className='px-2'>
                    <label htmlFor='table-search' className='sr-only'>
                      Buscar
                    </label>
                    <div className='relative mt-1'>
                      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <svg
                          className='w-5 h-5 text-gray-500 dark:text-gray-400'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </div>
                      <input
                        type='text'
                        id='table-search'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-52 pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Busca un proyecto'
                        onChange={(e) => setFilterProject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap mt-4 p-2 overflow-y-auto'>
                    {data.projects
                      .filter((item) => {
                        if (!filterProject) return true
                        if (
                          item.name.includes(filterProject) ||
                          item.name.includes(filterProject)
                        ) {
                          return true
                        }
                        return false
                      })
                      .map((project, index) => (
                        <Link
                          to={`/kanban/${project._id}`}
                          className='block p-6 mr-2 max-w-sm w-56 bg-white rounded border border-gray-200 shadow hover:bg-gray-100 hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                          key={index}
                        >
                          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            {project.name}
                          </h5>
                          <p className='italic truncate font-normal text-gray-700 dark:text-gray-400'>
                            {project.description ? project.description : 'Sin descripción'}
                          </p>
                        </Link>
                      ))}
                  </div>
                  {/* <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs border-b-2 border-b-gray-300  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Nombre
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Código
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Descripción
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Fecha de creación
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          <span className='sr-only'>Ver</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='border-b-2 border-b-gray-300'>
                      {data.projects.map((project, index) => (
                        <tr
                          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                          key={index}
                        >
                          <th
                            scope='row'
                            className='px-6 py-4 font-medium text-blue-700 dark:text-white whitespace-nowrap'
                          >
                            <Link to={`/kanban/${project._id}`}>{project.name}</Link>
                          </th>
                          <td className='px-6 py-4'>{project.name}</td>
                          <td className='px-6 py-4'>{project.description}</td>
                          <td className='px-6 py-4'>{formatToDate(project.createdAt)}</td>
                          <td className='px-6 py-4 text-right'>
                            <Link
                              to={`/kanban/${project._id}`}
                              className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                            >
                              Ver
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-1 items-center justify-center'>
          <svg
            role='status'
            className='mr-2 h-8 w-8 animate-spin fill-primary text-primary-content'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            ></path>
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            ></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default KanbanView

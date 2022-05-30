/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { formatToDate, getDateName } from '@vira/common/utils/date.util'
import { getApiUrl } from '@vira/common/utils/api.util'
import { Kanban } from '@vira/models/kanban/kanban.model'
import { Link } from 'react-router-dom'
import KanbanProjectView from './kanban-project.view'

const KanbanView = () => {
  const [data, setData] = useState<Kanban>()
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

      console.log('url', `${getApiUrl()}/kanban/projects/${getUser()!.id}`)
      const resultData: ApiResponse<Kanban> = await result.json()
      console.log('resultData', resultData)

      if (resultData.status === 200) setData(resultData.data)
      console.log('data', data)
    }
    // fetchData()
  }, [])

  return (
    <>
      {data ? (
        <div className='flex flex-1 flex-col p-2'>
          <div className='mt-2 text-center'>
            <span className='italic'>{getDateName('es-ES')}</span>
            <h3 className='text-2xl font-bold'>Hola de nuevo, {getUser()!.fullname}</h3>
          </div>
          <div className='mt-2'>
            <div className='grid grid-flow-col grid-cols-2 gap-2 sm:grid-cols-2'>
              <div className='card bg-base-200 shadow'>
                <div className='card-body p-4'>
                  <div className='fw-bold card-title flex items-center text-center'>
                    Tareas <div className='badge badge-primary'>{data.cards.length}</div>
                  </div>
                  <div className='card-text'>
                    <span className='fw-light'>
                      {!data.cards.length ? (
                        'Para tener tareas asignadas, primero debes crear un proyecto'
                      ) : (
                        <>
                          {data.cards.map((card) => (
                            <div
                              className='card h-24 cursor-pointer bg-base-100 shadow-sm hover:bg-primary-content'
                              key={card.id}
                            >
                              <div className='card-body p-4'>
                                <span className='card-title truncate'>{card.name}</span>
                                <div className='flex items-end'>
                                  {/* <div className='badge badge-primary'>{project.name}</div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className='card bg-base-200 shadow'>
                <div className='card-body p-4'>
                  <div className='fw-bold card-title'>
                    Proyectos <div className='badge badge-primary'>{data.projects.length}</div>
                  </div>
                  <div className='mt-2'>
                    {!data.projects.length ? (
                      <span className='fw-light'>
                        No tienes ningún proyecto asociado, puedes crear uno{' '}
                        <a className='link-primary' href='#create-project-modal' role='button'>
                          aquí
                        </a>
                      </span>
                    ) : (
                      <>
                        {data.projects.map((project) => (
                          <Link
                            to={`/kanban/${project._id}`}
                            className='card h-24 cursor-pointer bg-base-100 shadow-sm hover:bg-primary-content'
                            key={project.name}
                          >
                            <div className='card-body p-4'>
                              <span className='card-title truncate'>{project.name}</span>
                              <div className='flex items-center font-thin'>
                                <p className='font-thin'>{project.description}</p>
                                {/* <HiOutlineCalendar /> */}
                                <span className='self-end'>{formatToDate(project.createdAt)}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <KanbanProjectView />
        // <div className='flex flex-1 items-center justify-center'>
        //   <svg
        //     role='status'
        //     className='mr-2 h-8 w-8 animate-spin fill-primary text-primary-content'
        //     viewBox='0 0 100 101'
        //     fill='none'
        //     xmlns='http://www.w3.org/2000/svg'
        //   >
        //     <path
        //       d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
        //       fill='currentColor'
        //     ></path>
        //     <path
        //       d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
        //       fill='currentFill'
        //     ></path>
        //   </svg>
        // </div>
      )}
    </>
  )
}

export default KanbanView

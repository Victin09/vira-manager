/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Kanban } from '@vira/models/kanban/kanban.model'
import { useAuth } from '@vira/common/providers/auth.provider'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { getDateName } from '@vira/common/utils/date.util'
import { CreateKanbanProjectModal } from '@vira/components/kanban/create-project.kanban'

const KanbanView = () => {
  const { getUser } = useAuth()
  const [data, setData] = useState<Kanban>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/kanban/projects/${getUser()!.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const responseData: ApiResponse<Kanban> = await response.json()
      console.log(data)
      if (responseData.status === 200) {
        setData(responseData.data)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {data ? (
        <div className='flex w-full flex-col items-center'>
          <div className='mt-2 w-full text-center'>
            <span className=''>{getDateName('es-ES')}</span>
            <h1 className='text-2xl font-bold'>Hola de nuevo, {getUser()!.fullname}</h1>
          </div>
          <div className='mt-4 flex flex-wrap'>
            <div className='card bg-base-200 shadow'>
              <div className='card-body'>
                <div className='fw-bold card-title'>Tareas</div>
                <div className='card-text'>
                  <span className='fw-light'>
                    {!data.projects.length
                      ? 'Para tener tareas asignadas, primero debes crear un proyecto'
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className='card ml-4 bg-base-200 shadow'>
              <div className='card-body'>
                <div className='fw-bold card-title'>Proyectos</div>
                <div className='card-text'>
                  {!data.projects.length ? (
                    <span className='fw-light'>
                      No tienes ningún proyecto asociado, puedes crear uno{' '}
                      <label
                        htmlFor='create-project-modal'
                        className='modal-button link-primary cursor-pointer font-bold'
                      >
                        aquí
                      </label>
                    </span>
                  ) : (
                    <div>MAP</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <CreateKanbanProjectModal />
        </div>
      ) : (
        <div className='flex flex-1 items-center justify-center'>
          <svg
            role='status'
            className='mr-2 inline h-12 w-12 animate-spin fill-primary text-primary-content'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        </div>
      )}
    </>
  )
}

export default KanbanView

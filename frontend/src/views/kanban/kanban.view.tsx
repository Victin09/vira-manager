import React, { useEffect } from 'react'
import { useFetch } from '@vira/common/hooks/use-fetch.hook'
import { Kanban } from '@vira/models/kanban/kanban.model'
import { useAuth } from '@vira/common/providers/auth.provider'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { getDateName } from '@vira/common/utils/date.util'
import { ListKanban } from '@vira/components/kanban/list.kanban'

const Kanban = () => {
  const { fetchData, data, error } = useFetch<ApiResponse<any>>()
  const { getUser } = useAuth()

  useEffect(() => {
    fetchData(`/kanban/projects/${getUser()!.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    console.log('data', data)
  }, [])

  return (
    <>
      {data && data.status === 200 ? (
        <div className='h-100 d-flex flex-column align-items-center container'>
          <div className='w-100 mt-2 text-center'>
            <span>{getDateName('es-ES')}</span>
            <h3>Hola de nuevo, {getUser()!.fullname}</h3>
          </div>
          <div className='w-100 h-100 row d-flex flex-wrap p-2'>
            <div className='col-6'>
              <div className='card shadow-sm'>
                <div className='card-body'>
                  <div className='fw-bold card-title'>Tareas</div>
                  <div className='card-text'>
                    <span className='fw-light'>
                      {!data.data.lenght
                        ? 'Para tener tareas asignadas, primero debes crear un proyecto'
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='card shadow-sm'>
                <div className='card-body'>
                  <div className='fw-bold card-title'>Proyectos</div>
                  <div className='card-text'>
                    {!data.data.lenght ? (
                      <span className='fw-light'>
                        No tienes ningún proyecto asociado, puedes crear uno{' '}
                        <a
                          className='link-primary'
                          data-vds-toggle='modal'
                          href='#createProjectModal'
                          role='button'
                        >
                          aquí
                        </a>
                      </span>
                    ) : (
                      <div>MAP</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ListKanban />
      )}
    </>
  )
}

export default Kanban

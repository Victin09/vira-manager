import React, { useEffect } from 'react'
import Select from 'react-select'
import { useForm } from '@vira/common/hooks/use-form.hook'
import { CreateProject } from '@vira/models/kanban/board.model'
import { useFetch } from '@vira/common/hooks/use-fetch.hook'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { User } from '@vira/models/user.model'
import { getApiUrl } from '@vira/common/utils/api.util'

export const CreateKanbanProjectModal = (): JSX.Element => {
  const { register, values, handleSubmit, errors } = useForm<CreateProject>()
  const { fetchData, data, error } = useFetch<ApiResponse<any>>()
  const [users, setUsers] = React.useState<any[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${getApiUrl()}/users/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await response.json()
      data.data.map((user) => setUsers([...users, { value: user._id, label: user.fullname }]))
    }

    getUsers()
  }, [])

  const sendForm = () => {
    fetchData('/kanban/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(values)
    })
  }

  return (
    <>
      {users && (
        <>
          <input type='checkbox' id='createProjectModal' className='modal-toggle' />
          <div className='modal modal-bottom sm:modal-middle'>
            <div className='modal-box'>
              <h3 className='text-lg font-bold'>Crear un proyecto nuevo</h3>
              <form onSubmit={handleSubmit(sendForm)}>
                <div className='form-control w-full max-w-xs'>
                  <label className='label'>
                    <span className='label-text'>Nombre del proyecto</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Proyecto uno'
                    className={`input input-bordered w-full max-w-xs${
                      errors.name && ' input-error'
                    }`}
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'El nombre del proyecto es obligatorio'
                      }
                    })}
                  />
                  <label className='label'>
                    <span className='label-text-alt'>Alt label</span>
                  </label>
                </div>
              </form>
              <div className='modal-action'>
                <label htmlFor='createProjectModal' className='btn'>
                  Yay!
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

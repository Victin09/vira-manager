import React, { useEffect } from 'react'
import Select from 'react-select'
import { useAuth } from '@vira/common/providers/auth.provider'
import { useForm } from '@vira/common/hooks/use-form.hook'
import { CreateProject } from '@vira/models/kanban/board.model'
import { useFetch } from '@vira/common/hooks/use-fetch.hook'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { User } from '@vira/models/user.model'
import { getApiUrl } from '@vira/common/utils/api.util'

export const CreateKanbanProjectModal = (): React.ReactElement => {
  const { getUser } = useAuth()
  const { register, values, handleSubmit, errors } = useForm<CreateProject>()
  const [users, setUsers] = React.useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([])

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

  const sendForm = async () => {
    const projectUsers = [...selectedUsers.map((user) => user.value), getUser()!.id]
    const response = await fetch('/kanban/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ ...values, users: projectUsers })
    })
    const data: ApiResponse<any> = await response.json()
    console.log({ data })
    if (data.status === 200) {
      // Set new project to kanban provider
    }
  }

  return (
    <>
      {users && (
        <>
          <input type='checkbox' id='create-project-modal' className='modal-toggle' />
          <div className='modal modal-bottom sm:modal-middle'>
            <div className='modal-box'>
              <label
                htmlFor='create-project-modal'
                className='btn btn-circle btn-sm absolute right-2 top-2'
              >
                ✕
              </label>
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
                    <span className='label-text-alt text-error'>{errors.name}</span>
                  </label>
                </div>
                <div className='form-control w-full max-w-xs'>
                  <label className='label'>
                    <span className='label-text'>Descripción del proyecto</span>
                  </label>
                  <textarea
                    placeholder='Proyecto uno'
                    className={`input input-bordered w-full max-w-xs${
                      errors.description && ' input-error'
                    }`}
                    {...register('description')}
                    rows={4}
                    style={{ resize: 'none' }}
                  />
                </div>
                <div className='form-control w-full max-w-xs'>
                  <label className='label'>
                    <span className='label-text'>Usuarios</span>
                  </label>
                  <Select
                    isMulti
                    name='users'
                    options={users}
                    className='basic-multi-select w-full'
                    classNamePrefix='select'
                    onChange={(selected) => setSelectedUsers([...selectedUsers, selected])}
                  />
                </div>
                <div className='mt-5'>
                  <button type='submit' className='btn btn-primary'>
                    Crear proyecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

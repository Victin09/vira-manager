/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useKanban } from '@vira/common/providers/kanban.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { formatToDate } from '@vira/common/utils/date.util'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getInitials } from '@vira/common/utils/text.util'

export const ViewCardModal = (props: any) => {
  const { getUser } = useAuth()
  const [editName, setEditName] = useState<boolean>(false)
  const [editDescription, setEditDescription] = useState<boolean>(false)
  const [cardUsers, setCardUsers] = React.useState<any[]>([])
  const [users, setUsers] = React.useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([])

  useEffect(() => {
    const getCardUsers = async () => {
      props.card.users.forEach(async (userId) => {
        const response = await fetch(`${getApiUrl()}/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await response.json()
        data.data.map((user) => setCardUsers([...cardUsers, user]))
      })
    }

    const getUsers = async () => {
      const response = await fetch(`${getApiUrl()}/users/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await response.json()
      data.data.forEach((user) => {
        if (user.fullname === getUser()!.fullname) user.fullname = 'Tú'
        setUsers([...users, { value: user._id, label: user.fullname }])
      })
    }

    getCardUsers()
    getUsers()
  }, [])

  return (
    <div
      className='modal modal-xl fade'
      id='exampleModal'
      tabIndex={-1}
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          {/* <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {props.list}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-vds-dismiss='modal'
              aria-label='Close'
            ></button>
          </div> */}
          <div className='modal-body'>
            <div className='row'>
              <div className='d-flex justify-content-between'>
                <div className='d-flex flex-col'>
                  <span className='fs-4'>{props.card.name}</span>
                  <span className='fw-light'>En la lista {props.list}</span>
                </div>
                <button
                  type='button'
                  className='btn-close'
                  data-vds-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className='d-flex flex-col'>
                  <div className='my-3 d-flex flex-col'>
                    <label
                      htmlFor='descriptionTextarea'
                      className='d-flex align-items-center form-label fw-semibold'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4 6h16M4 10h16M4 14h16M4 18h16'
                        />
                      </svg>
                      <span className='ms-2'>Descripción</span>
                    </label>
                    {props.card.description && !editDescription ? (
                      <p>{props.card.description}</p>
                    ) : (
                      <>
                        {!editDescription && (
                          <span
                            className='w-full text-opcity-75 bg-gray-200 p-2 rounded'
                            onClick={() => setEditDescription(true)}
                          >
                            Añade una descripción
                          </span>
                        )}
                      </>
                    )}
                    {editDescription && (
                      <form noValidate>
                        <textarea className='form-control' id='descriptionTextarea' rows={3} />
                        <button type='submit' className='btn btn-primary me-2 mt-1'>
                          Guardar
                        </button>
                        <button
                          className='btn btn-secondary mt-1'
                          onClick={() => setEditDescription(false)}
                        >
                          Cancelar
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                <div className='mt-3 d-flex flex-col'>
                  <label
                    htmlFor='commentsTextarea'
                    className='d-flex align-items-center form-label fw-semibold'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                      />
                    </svg>
                    <span className='ms-2'>Actividad</span>
                  </label>
                  {/* Render card comments */}
                  <form noValidate>
                    <textarea className='form-control' id='commentsTextarea' rows={2} />
                    <button type='submit' className='btn btn-primary me-2 mt-1'>
                      Guardar
                    </button>
                  </form>
                </div>
              </div>
              <div className='col-6'>
                <div className='mt-4 d-flex flex-col'>
                  <label
                    htmlFor='commentsTextarea'
                    className='d-flex align-items-center form-label fw-semibold'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                    <span className='ms-2'>Miembros</span>
                  </label>
                  <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name='users'
                    options={users}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={(selected) => setSelectedUsers([...selectedUsers, selected])}
                    styles={{
                      input: (base) => ({
                        ...base,
                        'input:focus': {
                          boxShadow: 'none'
                        }
                      })
                    }}
                  />
                </div>
                <div className='mt-4 d-flex flex-col'>
                  <label
                    htmlFor='commentsTextarea'
                    className='d-flex align-items-center form-label fw-semibold'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                      />
                    </svg>
                    <span className='ms-2'>Etiquetas</span>
                  </label>
                  <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name='users'
                    options={users}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={(selected) => setSelectedUsers([...selectedUsers, selected])}
                    styles={{
                      input: (base) => ({
                        ...base,
                        'input:focus': {
                          boxShadow: 'none'
                        }
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

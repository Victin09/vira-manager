/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useKanban } from '@vira/common/providers/kanban.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { formatToDate } from '@vira/common/utils/date.util'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getInitials } from '@vira/common/utils/text.util'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { Card } from '@vira/models/kanban/card.model'
import { UserSearch } from '@vira/components/shared/user-search.component'

export const ViewCardModal = (props: any) => {
  const { getUser } = useAuth()
  const [card, setCard] = useState<Card>(props.card)
  const [editName, setEditName] = useState<boolean>(false)
  const [newCardName, setNewCardName] = useState<string>(props.card.name)
  const [editDescription, setEditDescription] = useState<boolean>(false)
  const [newCardDescription, setNewCardDescription] = useState<string>(props.card.description)
  const [cardUsers, setCardUsers] = React.useState<any[]>([])
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
        data.data.map((user) => setSelectedUsers([...selectedUsers, user]))
      })
    }

    getCardUsers()
  }, [])

  const handleNameKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const response = await fetch(`${getApiUrl()}/kanban/cards/${props.card._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name: newCardName })
      })
      const result: ApiResponse<Card> = await response.json()
      if (result.status === 200) {
        setEditName(false)
        setCard({ ...card, name: result.data.name })
      }
    }
  }

  const handleDescriptionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(`${getApiUrl()}/kanban/cards/${props.card._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ description: newCardDescription })
    })
    const result: ApiResponse<Card> = await response.json()
    if (result.status === 200) {
      setEditDescription(false)
      setCard({ ...card, description: result.data.description })
      setNewCardDescription(result.data.description)
    }
  }

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
          <div className='modal-body'>
            <div className='row'>
              <div className='d-flex justify-content-between'>
                <span className='fs-4'>{props.card.code}</span>
                <button
                  type='button'
                  className='btn-close'
                  data-vds-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
            </div>
            <div className='row'>
              {!editName ? (
                <span className='fs-5 fw-semibold' onClick={() => setEditName(true)}>
                  {card.name}
                </span>
              ) : (
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                />
              )}
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
                    {card.description && !editDescription ? (
                      <p onClick={() => setEditDescription(true)}>{card.description}</p>
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
                      <form noValidate onSubmit={(e) => handleDescriptionSubmit(e)}>
                        <textarea
                          className='form-control'
                          id='descriptionTextarea'
                          rows={3}
                          value={newCardDescription}
                          onChange={(e) => setNewCardDescription(e.target.value)}
                        />
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
                  {!selectedUsers.length ? (
                    <span
                      id='dropdownMenuButton1'
                      data-vds-toggle='dropdown'
                      aria-expanded='false'
                      style={{ cursor: 'pointer' }}
                    >
                      Sin asignar
                    </span>
                  ) : (
                    <>
                      {selectedUsers.map((user, index) => (
                        <div
                          style={{ width: '10%' }}
                          className='bg-info rounded-circle'
                          key={index}
                        >
                          {getInitials(user.fullname)}
                        </div>
                      ))}
                    </>
                  )}
                  <UserSearch selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                  {/* <Select
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
                    /> */}
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
                  {/* <Select
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
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

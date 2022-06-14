/* eslint-disable multiline-ternary */
import Select from 'react-select'
import { useKanban } from '@vira/common/providers/kanban.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import React, { useEffect, useState } from 'react'
import { formatToDate } from '@vira/common/utils/date.util'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getInitials } from '@vira/common/utils/text.util'

export const ViewCardModal = () => {
  const { getUser } = useAuth()
  const { setDisplayCardModal, selectedCard } = useKanban()
  const [editName, setEditName] = useState<boolean>(false)
  const [editDescription, setEditDescription] = useState<boolean>(false)
  const [cardUsers, setCardUsers] = React.useState<any[]>([])
  const [users, setUsers] = React.useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([])

  useEffect(() => {
    console.log({ selectedCard })
    const getCardUsers = async () => {
      selectedCard.users.forEach(async (userId) => {
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
    <>
      <div
        id='defaultModal'
        tabIndex={-1}
        aria-hidden='true'
        className='fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex'
      >
        {cardUsers && users && (
          <div className='relative p-4 w-full max-w-7xl h-full md:h-auto'>
            <div className='relative bg-white rounded shadow dark:bg-gray-700 md:h-96'>
              <div className='flex justify-between items-start p-4 rounded-t'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  {selectedCard.name}
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  // data-modal-toggle='defaultModal'
                  onClick={() => setDisplayCardModal(false)}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
              <div className='p-6 space-y-2 h-72 grid grid-cols-2 gap-4'>
                <div className='flex flex-col p-2 overflow-y-auto'>
                  <div className='mb-6'>
                    {editName ? (
                      <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={selectedCard.name}
                      />
                    ) : (
                      <span
                        className='p-2 text-xl font-semibold w-full rounded cursor-pointer hover:bg-gray-200'
                        onClick={() => setEditName(true)}
                      >
                        {selectedCard.name}
                      </span>
                    )}
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='description'
                      className='p-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Descripción
                    </label>
                    {editDescription ? (
                      <textarea
                        id='description'
                        rows={3}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Añade una descripción...'
                      ></textarea>
                    ) : (
                      <span
                        className='italic font-thin w-full p-2 rounded cursor-pointer hover:bg-gray-200'
                        onClick={() => setEditDescription(true)}
                      >
                        Añade una descripción
                      </span>
                    )}
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='description'
                      className='p-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Comentarios
                    </label>

                    <textarea
                      id='comments'
                      rows={2}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Añade un comentario...'
                    ></textarea>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='mb-6'>
                    <label
                      htmlFor='users'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Usuarios
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
                    {cardUsers && (
                      <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
                        {cardUsers.map((user, index) => (
                          <li className='py-3 sm:py-4' key={index}>
                            <div className='flex items-center space-x-4'>
                              <div className='flex-shrink-0'>
                                {user.image ? (
                                  <img
                                    className='w-8 h-8 rounded-full'
                                    src='/docs/images/people/profile-picture-1.jpg'
                                    alt='Neil image'
                                  />
                                ) : (
                                  <div className='relative w-10 h-10 overflow-hidden bg-blue-600 rounded-full dark:bg-gray-600'>
                                    {getInitials(user.fullname)}
                                  </div>
                                )}
                              </div>
                              <div className='flex-1 min-w-0'>
                                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                                  {user.fullname}
                                </p>
                                <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                  {user.email}
                                </p>
                              </div>
                              <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                                Eliminar
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='tags'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Etiquetas
                    </label>
                  </div>
                  <div className='text-sm flex flex-col'>
                    <span className='font-thin'>
                      Creado el {formatToDate(selectedCard.createdAt)}
                    </span>
                    <span className='font-thin'>
                      Actualizado el {formatToDate(selectedCard.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        modal-backdrop
        className='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
      ></div>
    </>
  )
}

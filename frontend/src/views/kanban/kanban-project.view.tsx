/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { useParams } from 'react-router-dom'
import { Project } from '@vira/models/kanban/project.model'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '@vira/components/kanban/board/list.kanban'
import { reorder, removeAndReorder, insertAndReorder } from '@vira/common/utils/kanban.util'
import { useForm } from '@vira/common/hooks/use-form.hook'
import { User } from '@vira/models/user.model'
import { getInitials } from '@vira/common/utils/text.util'
import { ViewCardModal } from '@vira/components/kanban/modals/view-card-modal.kanban'
import { useKanban } from '@vira/common/providers/kanban.provider'

const KanbanProjectView = () => {
  const { getUser } = useAuth()
  const { displayCardModal } = useKanban()
  const { handleSubmit, register, values, errors } = useForm<{ name: string }>()
  const { projectId } = useParams()
  const [project, setProject] = useState<Project>()
  const [lists, setLists] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [newList, setNewList] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await fetch(
        `${getApiUrl()}/kanban/projects/${getUser()!.id}/${projectId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      )
      const result: ApiResponse<Project> = await apiResult.json()
      if (result.status === 200) {
        result.data.users!.forEach(async (userId) => {
          const apiResponse = await fetch(`${getApiUrl()}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const response: ApiResponse<User> = await apiResponse.json()
          if (response.status === 200) {
            setUsers([...users, response.data])
          }
        })
        setProject(result.data)
        setLists(result.data.lists ? result.data.lists : [])
      }
    }

    fetchData()
  }, [])

  const onDragEnd = async (result) => {
    const { destination, source } = result

    if (!destination) return

    if (result.type === 'task') {
      const sourceList = lists.find((list) => list._id === source.droppableId)
      const destinationList = lists.find((list) => list._id === destination.droppableId)

      if (sourceList && destinationList) {
        if (sourceList._id === destinationList._id) {
          const newCards = reorder(sourceList.cards!, source.index, destination.index)

          await Promise.all(
            newCards.map(async (card) => {
              try {
                const apiResponse = await fetch(`${getApiUrl()}/kanban/cards/${card._id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(card)
                })
                const result: ApiResponse<any> = await apiResponse.json()
                if (result.status !== 200) return
              } catch (error) {
                console.log('error', error)
              }
            })
          )
          const newState = lists.map((list) => {
            list._id === sourceList._id && (list.cards = newCards)
            return list
          })
          setLists(newState)
        } else {
          // Remove from list and reorder cards
          const { removed, result } = removeAndReorder(
            sourceList.cards!,
            source.index,
            destination.index
          )
          // Update new source list cards order
          await Promise.all(
            result.map(async (card) => {
              try {
                const apiResponse = await fetch(`${getApiUrl()}/kanban/cards/${card._id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(card)
                })
                const result: ApiResponse<any> = await apiResponse.json()
                if (result.status !== 200) return
              } catch (error) {
                console.log('error', error)
              }
            })
          )

          // Update card new list
          removed.list = destinationList._id
          // Insert into new list
          const newCards = insertAndReorder(destinationList!.cards, removed, destination.index)
          // Update new cards order
          await Promise.all(
            newCards.map(async (card) => {
              try {
                const apiResponse = await fetch(`${getApiUrl()}/kanban/cards/${card._id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(card)
                })
                const result: ApiResponse<any> = await apiResponse.json()
                if (result.status !== 200) return
              } catch (error) {
                console.log('error', error)
              }
            })
          )
          const newState = lists.map((list) => {
            list._id === sourceList._id && (list.cards = result)
            list._id === destinationList._id && (list.cards = newCards)
            return list
          })
          setLists(newState)
        }
      }
    } else {
      const listsTmp = [...lists]
      const reorderedList = reorder(listsTmp, source.index, destination.index)
      await Promise.all(
        reorderedList.map(async (list) => {
          try {
            const apiResponse = await fetch(`${getApiUrl()}/kanban/lists/${list._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(list)
            })
            const result: ApiResponse<any> = await apiResponse.json()
            if (result.status !== 200) return
          } catch (error) {
            console.log('error', error)
          }
        })
      )
      setLists(reorderedList)
    }
  }

  const handleNewList = async () => {
    try {
      const apiResponse = await fetch(`${getApiUrl()}/kanban/lists/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          board: projectId,
          cards: []
        })
      })
      const result: ApiResponse<any> = await apiResponse.json()
      if (result.status === 201) {
        setLists([...lists, result.data])
        setNewList(false)
        return
      }
      return
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='flex flex-col p-2'>
      <div className='mx-2 mb-2 flex flex-row items-center justify-between'>
        <h2 className='flex items-center text-xl font-semibold'>{project?.name}</h2>
        <div className='flex'>
          <div className='flex -space-x-4'>
            {users.map((user, index) => (
              <div
                className='relative w-10 h-10 bg-blue-600 rounded-full dark:bg-gray-600'
                key={index}
              >
                {user.avatar ? (
                  <img
                    className='w-10 h-10 border-2 border-white rounded-full dark:border-gray-800'
                    src='/docs/images/people/profile-picture-5.jpg'
                    alt=''
                  ></img>
                ) : (
                  <a
                    className='flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800'
                    href='#'
                  >
                    <span>{getInitials(user.fullname)}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
          <div
            className='flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-blue-200 border-2 border-white rounded-full hover:bg-blue-500 hover:text-white dark:border-gray-800'
            data-tooltip-target='tooltip-add-user-to-kanban'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              ></path>
            </svg>
          </div>
          <div
            id='tooltip-add-user-to-kanban'
            role='tooltip'
            className='inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700'
          >
            Tooltip content
            <div className='tooltip-arrow' data-popper-arrow></div>
          </div>
        </div>
      </div>
      <div
        className='flex mt-4 overflow-x-auto overflow-y-auto'
        style={{ height: 'calc(100vh - 10em)', width: 'calc(100vw - 15em)' }}
        // style={{ width: 'calc(100vw - 15em)' }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='allCols' type='column' direction='horizontal'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='flex'
                // style={{ height: 'calc(100vh - 10em)' }}
              >
                {lists.map((list, i) => {
                  return <List key={list._id} data={...list} index={i} />
                })}
                {provided.placeholder}
                {!newList ? (
                  <div
                    className='h-10 text-gray-900 bg-gray-100 hover:bg-gray-100 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2 cursor-pointer'
                    onClick={() => setNewList(true)}
                  >
                    <div className='flex align-middle'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        ></path>
                      </svg>
                      <span>Añadir nueva lista</span>
                    </div>
                  </div>
                ) : (
                  <form className='ml-2' onSubmit={handleSubmit(handleNewList)}>
                    <input
                      type='text'
                      className={`${
                        errors.name
                          ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:bg-red-100 dark:border-red-400'
                          : 'text-gray-900 bg-gray-50 border-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-whitedark:focus:border-blue-500'
                      } block p-2 w-full rounded border sm:text-xs`}
                      placeholder='Añadir nueva columna'
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'El nombre es obligatorio'
                        }
                      })}
                    />
                    {errors.name && (
                      <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                        <span className='font-medium'>Oops!</span> {errors.name}
                      </p>
                    )}
                  </form>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {displayCardModal && <ViewCardModal />}
      </div>
    </div>
  )
}

export default KanbanProjectView

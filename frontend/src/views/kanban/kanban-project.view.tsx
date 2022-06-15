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
    <div className='d-flex flex-col p-2 h-full'>
      <div className='mx-2 mb-2 d-flex align-items-center justify-between'>
        <h2 className='d-flex align-items-center fs-3 fw-bold'>{project?.name}</h2>
      </div>
      <div
        className='d-flex mt-4 overflow-auto h-full'
        // style={{ height: 'calc(100vh - 10em)', width: 'calc(100vw - 15em)' }}
        // style={{ width: 'calc(100vw - 15em)' }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='allCols' type='column' direction='horizontal'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='d-flex'
                // style={{ height: 'calc(100vh - 10em)' }}
              >
                {lists.map((list, i) => {
                  return <List key={list._id} data={...list} index={i} />
                })}
                {provided.placeholder}
                {!newList ? (
                  <div
                    className='d-flex align-items-center justify-content-center px-2 cursor-pointer rounded-1 bg-gray-200 w-full'
                    style={{ width: '16rem', height: '4rem' }}
                    onClick={() => setNewList(true)}
                  >
                    <div className='d-flex align-items-center'>
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
                  <form className='ml-2 p-2' onSubmit={handleSubmit(handleNewList)}>
                    <input
                      type='text'
                      className={`${errors.name ? 'is-invalid ' : ''}form-control`}
                      placeholder='Añadir nueva columna'
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'El nombre es obligatorio'
                        }
                      })}
                    />
                    {errors.name && (
                      <div className='invalid-feedback'>
                        <span className='fw-bold'>Oops!</span> {errors.name}
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default KanbanProjectView

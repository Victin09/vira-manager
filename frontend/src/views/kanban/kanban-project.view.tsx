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

// const dataTest = {
//   _id: '803bbe92-d512-4f88-b881-0d3c14d41583',
//   name: 'Proyecto 1',
//   description: 'Proyecto 1',
//   image: '',
//   users: ['649e6b24-6c85-45c9-8cdd-4fe0c374257c'],
//   archived: false,
//   createdAt: '2022-05-19T08:29:29.810Z',
//   updatedAt: '2022-05-19T08:29:29.810Z',
//   __v: 0,
//   lists: [
//     {
//       _id: '068c53e3-8976-4ed8-af2f-1e0b44dd42b5',
//       name: 'List 1',
//       order: 1,
//       archived: false,
//       board: '803bbe92-d512-4f88-b881-0d3c14d41583',
//       cards: [
//         {
//           _id: 'ca29044f-fd5c-4576-ad30-279235ca80e3',
//           name: 'card 2',
//           description: '',
//           order: -2,
//           users: [],
//           list: '068c53e3-8976-4ed8-af2f-1e0b44dd42b5',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:39:48.366Z',
//           updatedAt: '2022-05-26T14:39:48.366Z',
//           __v: 0
//         },
//         {
//           _id: '1333f164-c55f-46a8-afed-43fa6fb57f2f',
//           name: 'card 1',
//           description: '',
//           order: 0,
//           users: [],
//           list: '068c53e3-8976-4ed8-af2f-1e0b44dd42b5',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:38:43.448Z',
//           updatedAt: '2022-05-26T14:38:43.448Z',
//           __v: 0
//         },
//         {
//           _id: 'b2480b76-1f5d-4283-b244-849757388b8b',
//           name: 'card 4',
//           description: '',
//           order: 0,
//           users: [],
//           list: '068c53e3-8976-4ed8-af2f-1e0b44dd42b5',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:44:06.072Z',
//           updatedAt: '2022-05-26T14:44:06.072Z',
//           __v: 0
//         }
//       ],
//       createdAt: '2022-05-19T09:06:30.230Z',
//       updatedAt: '2022-05-19T09:06:30.230Z',
//       __v: 0
//     },
//     {
//       _id: '44df50c2-c17c-4f78-9561-93661e60683b',
//       name: 'List 2',
//       order: 2,
//       archived: false,
//       board: '803bbe92-d512-4f88-b881-0d3c14d41583',
//       cards: [
//         {
//           _id: 'aedd9990-2ee1-4de8-a1e5-9a95cb9ede51',
//           name: 'card 5',
//           description: '',
//           order: 0,
//           users: [],
//           list: '44df50c2-c17c-4f78-9561-93661e60683b',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:44:44.939Z',
//           updatedAt: '2022-05-26T14:44:44.939Z',
//           __v: 0
//         },
//         {
//           _id: '6db468dd-531d-47cc-b689-1de27c69b2cb',
//           name: 'card 3',
//           description: '',
//           order: 1,
//           users: [],
//           list: '44df50c2-c17c-4f78-9561-93661e60683b',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:41:00.874Z',
//           updatedAt: '2022-05-26T14:41:00.874Z',
//           __v: 0
//         },
//         {
//           _id: 'c8707eb2-2e72-40e2-a8db-bade3a280c54',
//           name: 'card 6',
//           description: '',
//           order: 2,
//           users: [],
//           list: '44df50c2-c17c-4f78-9561-93661e60683b',
//           project: '803bbe92-d512-4f88-b881-0d3c14d41583',
//           createdAt: '2022-05-26T14:45:39.522Z',
//           updatedAt: '2022-05-26T14:45:39.522Z',
//           __v: 0
//         }
//       ],
//       createdAt: '2022-05-19T09:39:33.101Z',
//       updatedAt: '2022-05-19T09:39:33.101Z',
//       __v: 0
//     }
//   ]
// }

const KanbanProjectView = () => {
  const { getUser } = useAuth()
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
        console.log('result.data.users', result.data.users)
        result.data.users!.forEach((adsf) => console.log(adsf))
        result.data.users!.forEach(async (userId) => {
          const apiResponse = await fetch(`${getApiUrl()}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const response: ApiResponse<User> = await apiResponse.json()
          console.log('response', response)
          if (response.status === 200) {
            setUsers([...users, response.data])
          }
        })
        setProject(result.data)
        setLists(result.data.lists ? result.data.lists : [])
        console.log('result.data', result.data)
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
          console.log('newState', newState)
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
    <div className='flex flex-col p-2 overflow-x-auto'>
      <div className='mx-2 mb-2 flex flex-row items-center justify-between'>
        <h2 className='flex items-center text-xl font-semibold'>{project?.name}</h2>
        <div className='flex mb-5 space-x-4'>
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
        {/* <button
          type='button'
          className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        >
          Invitar a gente
        </button> */}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='allCols' type='column' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex'
              style={{ height: 'calc(100vh - 8em)' }}
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
                        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400'
                        : 'text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
    </div>
  )
}

export default KanbanProjectView

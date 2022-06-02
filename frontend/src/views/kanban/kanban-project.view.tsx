import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { useParams } from 'react-router-dom'
import { Project } from '@vira/models/kanban/project.model'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '@vira/components/kanban/board/list.kanban'
import { reorder, removeAndReorder, insertAndReorder } from '@vira/common/utils/kanban.util'

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
  const { projectId } = useParams()
  const [project, setProject] = useState<Project>()
  const [lists, setLists] = useState<any[]>([])

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

  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='mb-2 flex flex-row items-center justify-between'>
        <h2 className='flex items-center text-xl font-bold'>{project?.name}</h2>
        <button className='btn btn-ghost btn-sm'>Invitar a gente</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='allCols' type='column' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-1'
              style={{ maxHeight: 'calc(100vh - 8em)' }}
            >
              {lists.map((list, i) => {
                return <List key={list._id} data={...list} index={i} />
              })}
              {provided.placeholder}
              <form autoComplete='off' className='ml-2'>
                <input
                  maxLength={20}
                  className='truncate rounded-sm bg-transparent bg-indigo-50 px-2 py-1 text-indigo-800 placeholder-indigo-500 outline-none ring-2 focus:ring-indigo-500'
                  type='text'
                  name='newCol'
                  placeholder='Add a new column'
                />
              </form>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default KanbanProjectView

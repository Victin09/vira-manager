import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { useParams } from 'react-router-dom'
import { Project } from '@vira/models/kanban/project.model'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '@vira/components/kanban/board/list.kanban'

const KanbanProjectView = () => {
  const { getUser } = useAuth()
  const { projectId } = useParams()
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    console.log('params', projectId)
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
        console.log('data', result.data)
        setProject(result.data)
      }
    }

    fetchData()
  }, [])

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    const listsTmp = project!.lists!

    if (!destination) return

    if (result.type === 'task') {
      const startColumn = listsTmp.find((list) => list._id === source.droppableId)!
      const endColumn = listsTmp.find((list) => list._id === destination.droppableId)!

      if (startColumn === endColumn) {
        const newTaskIds = Array.from(endColumn.cards)

        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...endColumn,
          cards: newTaskIds
        }

        const newState = {
          ...project,
          columns: { ...project, [endColumn.id]: newColumn }
        }

        console.log({ newState })
        return
      }

      const sourceCards = startColumn.cards
      const cardToMove = sourceCards.splice(source.index, 1)[0]
      sourceCards.slice(source.index).map(async (card, index) => {
        const apiResponse = await fetch(`${getApiUrl()}/kanban/cards/${card._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...card,
            order: (card.order = card.order - index - 1)
          })
        })

        const response: ApiResponse<any> = await apiResponse.json()
        if (response.status === 200) {
          const origin = project!.lists!.find((list) => list._id === source.droppableId)!
          origin.cards = sourceCards
          console.log('sourceCards', project!.lists!)
        }
      })

      const endCards = endColumn.cards
      endCards.splice(destination.index, 0, cardToMove)
      cardToMove.list = destination.droppableId
      endCards.slice(destination.index).map(async (card, index) => {
        const apiResponse = await fetch(`${getApiUrl()}/kanban/cards/${card._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...card,
            order: (card.order = card.order + index)
          })
        })

        const response: ApiResponse<any> = await apiResponse.json()
        if (response.status === 200) {
          const end = project!.lists!.find((list) => list._id === destination.droppableId)!
          end.cards = endCards
          console.log('destinationCards', project!.lists!)
        }
      })
    } else {
      const list = listsTmp.splice(source.index, 1)[0]
      listsTmp.splice(destination.index, 0, list)
      list.order = destination.index
      listsTmp.slice(destination.index).map(async (list, index) => {
        const apiResponse = await fetch(`${getApiUrl()}/kanban/lists/${list._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...list, order: (list.order = destination.index + index + 1) })
        })

        const result: ApiResponse<any> = await apiResponse.json()
        if (result.status !== 200) return
        project!.lists!.forEach((list, index) => {
          if (list._id === result.data._id) {
            project!.lists![index] = result.data
          }
        })
      })
    }
  }

  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='self-end'>
        <button className='btn btn-ghost btn-sm basis-1'>Invitar a gente</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='allCols' type='column' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-1'
              style={{ height: '90%' }}
            >
              {project?.lists?.map((list, i) => {
                return (
                  <List
                    key={list._id}
                    _id={list._id}
                    index={i}
                    title={list.name}
                    cards={list.cards}
                  />
                )
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

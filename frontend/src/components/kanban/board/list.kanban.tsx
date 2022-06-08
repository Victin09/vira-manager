/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { CardProps } from '@vira/common/types/kanban.type'
import { getApiUrl } from '@vira/common/utils/api.util'
import { ApiResponse } from '@vira/common/types/api-response.type'

export const List = (props: any) => {
  const { projectId } = useParams()
  const [addTask, setAddTask] = useState<boolean>(false)
  const [newCardName, setNewCardName] = useState<string>('')

  const [cardsState, setCardsState] = useState<CardProps[]>([])

  useEffect(() => {
    setCardsState(props.data.cards)
  }, [props])

  const createNewCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const apiResponse = await fetch(`${getApiUrl()}/kanban/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCardName,
          description: '',
          list: props.data._id,
          project: projectId,
          users: []
        })
      })

      const result: ApiResponse<any> = await apiResponse.json()
      if (result.status === 201) {
        const newState = [...cardsState]
        newState.push(result.data)
        setCardsState(newState)
        setAddTask(false)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Draggable draggableId={props.data._id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='bg-gray-100 rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-5 w-56 bg-base-200 h-auto'
        >
          <div className='flex items-center justify-between'>
            <div {...provided.dragHandleProps} className='px-4 py-2'>
              <h2 className={'truncate text-lg font-bold sm:text-lg'}>{props.data.name}</h2>
            </div>
          </div>
          <Droppable droppableId={props.data._id} type='task'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`h-5/6 pt-2 overflow-auto bg-gray-100 px-2 ${
                  snapshot.isDraggingOver ? 'bg-gray-300' : ''
                }`}
                style={{ height: 'calc(100vh - 15em)' }}
              >
                {cardsState.map((t, i) => (
                  <Card data={t} index={i} key={t._id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {!addTask ? (
            <div
              className='flex cursor-pointer justify-center hover:bg-base-300'
              onClick={() => setAddTask(true)}
            >
              <span className='font-bold'>+ Añadir tarea</span>
            </div>
          ) : (
            <form onSubmit={(e) => createNewCard(e)}>
              <input
                type='text'
                className='block p-2 w-full text-gray-900 bg-gray-50 rounded border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Tarjeta 1'
                required
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </form>
          )}
        </div>
      )}
    </Draggable>
  )
}

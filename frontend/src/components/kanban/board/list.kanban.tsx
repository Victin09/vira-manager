/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { CardProps, ListProps } from '@vira/common/types/kanban.type'
import { getApiUrl } from '@vira/common/utils/api.util'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { useParams } from 'react-router-dom'

export const List = ({ _id, index, title, cards }: ListProps) => {
  const { projectId } = useParams()
  const [addTask, setAddTask] = useState<boolean>(false)
  const [newCardName, setNewCardName] = useState<string>('')

  const [cardsState, setCardsState] = useState<CardProps[]>([])

  useEffect(() => {
    setCardsState(cards)
  }, [])

  const createNewCard = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('sending')
    e.preventDefault()
    const apiResponse = await fetch(`${getApiUrl()}/kanban/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardName,
        description: '',
        list: _id,
        project: projectId,
        users: []
      })
    })

    const response: ApiResponse<any> = await apiResponse.json()
    if (response.status === 201) {
      console.log('new_card', response.data)
      setCardsState([...cardsState, response.data])
      setAddTask(false)
    }
  }

  return (
    <Draggable draggableId={_id} index={index} key={_id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='card mr-5 w-56 bg-base-200'
        >
          <div {...provided.dragHandleProps} className='flex justify-between px-4 py-2 shadow-sm'>
            <h2 className={'truncate text-lg font-bold sm:text-lg'}>{title}</h2>
          </div>
          <Droppable droppableId={_id} type='task'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`h-full bg-base-200 py-4 px-2 ${
                  snapshot.isDraggingOver ? 'bg-base-300' : ''
                }`}
              >
                {cardsState.map((t, i) => (
                  <Card id={t._id} index={i} title={t.name} key={t._id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {!addTask ? (
            <div
              className='flex cursor-pointer justify-center p-2 hover:bg-base-300'
              onClick={() => setAddTask(true)}
            >
              <span className='font-bold'>+ Añadir tarea</span>
            </div>
          ) : (
            <form onSubmit={(e) => createNewCard(e)} className='p-2'>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered input-primary input-sm w-full max-w-xs'
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </form>
          )}
        </div>
      )}
    </Draggable>
  )
}

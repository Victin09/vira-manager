/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { CardProps } from '@vira/common/types/kanban.type'
import { getApiUrl } from '@vira/common/utils/api.util'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { useParams } from 'react-router-dom'
import { HiOutlineDotsVertical } from 'react-icons/hi'

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
          className='card mr-5 w-56 bg-base-200'
        >
          <div className='flex items-center justify-between'>
            <div {...provided.dragHandleProps} className='px-4 py-2'>
              <h2 className={'truncate text-lg font-bold sm:text-lg'}>{props.data.name}</h2>
            </div>
            <div className='dropdown-end dropdown dropdown-left dropdown-open'>
              <label tabIndex={100} className='btn btn-ghost btn-sm m-1'>
                <HiOutlineDotsVertical />
              </label>

              <ul
                tabIndex={100}
                className='dropdown-content menu rounded-box h-52 w-52 flex-grow bg-base-100 p-2 shadow'
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <Droppable droppableId={props.data._id} type='task'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`h-full overflow-auto bg-base-200 py-4 px-2 ${
                  snapshot.isDraggingOver ? 'bg-base-300' : ''
                }`}
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

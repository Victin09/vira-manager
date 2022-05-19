import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { ListProps } from '@vira/common/types/kanban.type'

export const List = ({ id, index, title, cards }: ListProps) => {
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='card mr-5 w-56 bg-base-200'
        >
          <div
            {...provided.dragHandleProps}
            className='flex justify-between bg-primary-content px-4 py-2 shadow-sm'
          >
            <h2 className={'truncate text-lg font-bold text-neutral-content sm:text-lg'}>
              {title}
            </h2>
          </div>
          <Droppable droppableId={id} type='task'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`h-full bg-base-200 py-4 px-2 ${
                  snapshot.isDraggingOver
                    ? 'bg-gradient-to-br from-green-400 via-green-200 to-green-100'
                    : ''
                }`}
              >
                {cards.map((t, i) => (
                  <Card id={t.id} index={i} title={t.title} key={t.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { ListProps } from '@vira/common/types/kanban.type'

export const List = ({ id, index, title, cards }: ListProps) => {
  return (
    <div className='flex flex-1'>
      <Draggable draggableId={id} index={index} key={id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='card mr-5 w-56 bg-base-200'
          >
            <div {...provided.dragHandleProps} className='flex justify-between p-3'>
              <h2 className='truncate text-lg font-bold sm:text-lg'>{title}</h2>
            </div>
            <Droppable droppableId={id} type='task'>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`h-full overflow-y-auto py-1 px-2 ${
                    snapshot.isDraggingOver ? 'bg-base-300' : ''
                  }`}
                >
                  {cards.map((card, i) => (
                    <Card id={card.id} index={i} key={i} title={card.title} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className='p-2'>+ Añadir tarea</div>
          </div>
        )}
      </Draggable>
    </div>
  )
}

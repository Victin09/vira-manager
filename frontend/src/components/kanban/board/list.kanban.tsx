import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@vira/components/kanban/board/card.kanban'
import { ListProps } from '@vira/common/types/kanban.type'

export const List = ({ id, index, title, cards }: ListProps) => {
  return (
    <>
      <Draggable draggableId={id} index={index} key={id}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef} className='mr-5'>
            <div style={{ background: '#edf2ff' }}>
              <div
                {...provided.dragHandleProps}
                className='flex items-center justify-between rounded-sm bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-4 py-1'
              >
                <h2 className='truncate text-lg text-blue-100 sm:text-lg'>{title}</h2>
              </div>
              <Droppable droppableId={id} type='task'>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`h-full py-4 px-2 shadow-sm ${
                      snapshot.isDraggingOver
                        ? 'bg-gradient-to-br from-green-400 via-green-200 to-green-100'
                        : ''
                    }`}
                  >
                    {cards.map((card, i) => (
                      <Card id={card.id} index={i} key={i} title={card.title} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

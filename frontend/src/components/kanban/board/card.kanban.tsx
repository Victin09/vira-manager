import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type KanbanCardProps = {
  id: string
  index: number
  title: string
  description?: string
}

export const KanbanCard = ({ id, index, title, description }: KanbanCardProps) => {
  return (
    <div className='flex'>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDragging ? 'bg-info' : 'bg-base-100'
            } card mb-1 w-full shadow-sm`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className='card-body p-2.5'>
              <span className='card-title'>{title}</span>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}

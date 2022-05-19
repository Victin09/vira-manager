import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  id: string
  index: number
  title: string
  description?: string
}

export const Card = ({ id, index, title, description }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`card mb-4 px-1.5 py-2.5 shadow transition-shadow duration-300 hover:shadow-md ${
            snapshot.isDragging ? 'bg-info' : 'bg-base-100'
          }`}
        >
          <div className='card-body w-full p-1'>
            <h4 className='card-title text-sm sm:text-base'>{title}</h4>
          </div>
        </div>
      )}
    </Draggable>
  )
}

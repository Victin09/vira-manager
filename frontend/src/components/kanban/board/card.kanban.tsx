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
    <div className='flex'>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`mb-4 rounded px-1.5 py-2.5 shadow-lg transition-shadow duration-300 hover:shadow-xl ${
              snapshot.isDragging
                ? 'bg-gradient-to-r from-red-100 to-blue-100 text-gray-900'
                : 'bg-white text-gray-800'
            }`}
          >
            <div className='w-full'>
              <h4 className='text-sm sm:text-base'>{title}</h4>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}

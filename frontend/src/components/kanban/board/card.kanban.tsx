import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { formatToDate } from '@vira/common/utils/date.util'
import { HiOutlineCalendar } from 'react-icons/hi'

export const Card = (props: any) => {
  console.log('data', props.data)
  return (
    <Draggable draggableId={props.data._id} index={props.index}>
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
            <h4 className='card-title text-sm sm:text-base'>{props.data.name}</h4>
            {props.data.description && props.data.description !== '' && (
              <p className='font-light italic'>{props.data.description}</p>
            )}
            <div className='flex items-center self-end'>
              <HiOutlineCalendar />
              <span className='font-thin'>{formatToDate(props.data.createdAt)}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

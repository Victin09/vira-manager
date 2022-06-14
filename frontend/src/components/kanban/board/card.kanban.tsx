import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { formatToDate } from '@vira/common/utils/date.util'
import { useKanban } from '@vira/common/providers/kanban.provider'

export const Card = (props: any) => {
  const { setDisplayCardModal, setSelectedCard } = useKanban()

  const handleDoubleClick = () => {
    setSelectedCard(props.data)
    setDisplayCardModal(true)
  }

  return (
    <Draggable draggableId={props.data._id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`block p-6 max-w-sm bg-white rounded border border-gray-200 shadow hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2 px-2.5 py-2.5 ${
            snapshot.isDragging ? 'bg-gray-200' : 'bg-base-100'
          }`}
          onDoubleClick={() => handleDoubleClick()}
        >
          <h4 className='mb-2 truncate text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            {props.data.name}
          </h4>
          {props.data.description && props.data.description !== '' && (
            <p className='font-light itali truncatec'>{props.data.description}</p>
          )}
          <div className='flex items-center self-end'>
            <span className='font-thin'>{formatToDate(props.data.createdAt)}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}

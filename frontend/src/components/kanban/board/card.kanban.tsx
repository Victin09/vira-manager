import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { formatToDate } from '@vira/common/utils/date.util'
import { useKanban } from '@vira/common/providers/kanban.provider'
import { ViewCardModal } from '../modals/view-card-modal.kanban'

export const Card = (props: any) => {
  const { setDisplayCardModal, setSelectedCard } = useKanban()

  const handleClick = () => {
    setSelectedCard({ ...props.data, list: props.list })
    setDisplayCardModal(true)
  }

  return (
    <>
      <Draggable draggableId={props.data._id} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`card shadow-sm mb-2 ${
              snapshot.isDragging ? 'bg-indigo-200' : 'bg-gray-100'
            }`}
            data-vds-toggle='modal'
            data-vds-target='#exampleModal'
            onClick={() => handleClick()}
          >
            <div className='card-body'>
              <h4 className='card-title fs-6'>{props.data.name}</h4>
              {props.data.description && props.data.description !== '' && (
                <p className='card-text'>{props.data.description}</p>
              )}
              <div className='d-flex align-items-center align-self-end'>
                <span className='text-opacity-75 text-gray-600'>
                  {formatToDate(props.data.createdAt)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <ViewCardModal card={props.data} list={props.list} />
    </>
  )
}

/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const ITEM_TYPES = {
  CARD: 'card',
  TASK: 'task'
}

const DATASET = {
  tasks: {
    'task-1': { id: 'task-1', content: 'water plants' },
    'task-2': { id: 'task-2', content: 'buy oat milk' },
    'task-3': { id: 'task-3', content: 'build a trello board' },
    'task-4': { id: 'task-4', content: 'have a beach day' },
    'task-5': { id: 'task-5', content: 'build tic tac toe' }
  },
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Home Todos',
      taskIds: ['task-1', 'task-2']
    },
    'card-2': {
      id: 'card-2',
      title: 'Work Todos',
      taskIds: ['task-3']
    },
    'card-3': { id: 'card-3', title: 'Fun Todos', taskIds: ['task-4'] },
    'card-4': { id: 'card-4', title: 'Completed', taskIds: ['task-5'] }
  },
  cardOrder: ['card-1', 'card-2', 'card-3', 'card-4']
}

export const ListKanban = () => {
  const [dataset, _] = useState(() => {
    const savedDataset = localStorage.getItem('board-dataset')
    const initialValue = JSON.parse(savedDataset!)
    return initialValue || DATASET
  })

  const [tasks, setTasks] = useState(dataset.tasks)
  const [cards, setCards] = useState(dataset.cards)
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder)

  useEffect(() => {
    localStorage.setItem('board-dataset', JSON.stringify({ tasks, cards, cardOrder }))
  }, [tasks, cards, cardOrder])

  const onAddNewCard = () => {
    const newCard = {
      id: 'card-' + genRandomID(),
      title: '**New**',
      taskIds: []
    }
    const newCardOrder = Array.from(cardOrder)
    newCardOrder.unshift(newCard.id)
    setCards({
      ...cards,
      [newCard.id]: newCard
    })
    setCardOrder(newCardOrder)
  }

  return (
    <div className='align-center flex w-full flex-1'>
      <DragDropCards
        cards={cards}
        tasks={tasks}
        cardOrder={cardOrder}
        setCards={setCards}
        setTasks={setTasks}
        setCardOrder={setCardOrder}
      />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const DragDropCards = ({ cards, tasks, cardOrder, setCards, setTasks, setCardOrder }) => {
  const [editing, setEditing] = useState(null)

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return
    }

    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId)
    } else {
      // type === tasks
      const start = cards[source.droppableId]
      const finish = cards[destination.droppableId]
      if (start.id === finish.id) {
        reorderTasksWithinCard(start, source.index, destination.index, draggableId)
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId)
      }
    }
  }

  const reorderCards = (source, destination, draggableId) => {
    const newCardOrder = Array.from(cardOrder)
    newCardOrder.splice(source.index, 1)
    newCardOrder.splice(destination.index, 0, draggableId)
    setCardOrder(newCardOrder)
  }

  const reorderTasksWithinCard = (card, sourceIdx, destinationIdx, draggableId) => {
    const newTaskIds = Array.from(card.taskIds)
    newTaskIds.splice(sourceIdx, 1)
    newTaskIds.splice(destinationIdx, 0, draggableId)
    setCards({
      ...cards,
      [card.id]: {
        ...card,
        taskIds: newTaskIds
      }
    })
  }

  const moveTask = (start, finish, sourceIdx, destinationIdx, draggableId) => {
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(sourceIdx, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destinationIdx, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
    setCards({
      ...cards,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    })
  }

  const onAddNewTask = (cardID, content) => {
    const newTask = {
      id: 'task-' + genRandomID(),
      content
    }
    setTasks({
      ...tasks,
      [newTask.id]: newTask
    })
    const newTaskIds = Array.from(cards[cardID].taskIds)
    newTaskIds.push(newTask.id)
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } })
  }

  const onRemoveCard = (cardID) => {
    const newCardOrder = cardOrder.filter((id) => id !== cardID)
    setCardOrder(newCardOrder)

    const cardTaskIds = cards[cardID].taskIds
    cardTaskIds.forEach((taskID) => delete tasks[taskID])
    delete cards[cardID]
    setCards(cards)
    setTasks(tasks)
  }

  const onRemoveTask = (taskID, cardID) => {
    const newTaskIds = cards[cardID].taskIds.filter((id) => id !== taskID)
    setCards({ ...cards, [cardID]: { ...cards[cardID], taskIds: newTaskIds } })
    delete tasks[taskID]
    setTasks(tasks)
  }

  const onSaveTitleEdit = (cardID, newTitle) => {
    if (newTitle !== cards[cardID].title) {
      setCards({
        ...cards,
        [cardID]: {
          ...cards[cardID],
          title: newTitle
        }
      })
    }
    setEditing(null)
  }

  const onSaveTaskEdit = (taskID, cardID, newContent) => {
    if (newContent.trim() === '') {
      onRemoveTask(taskID, cardID)
    } else if (newContent !== tasks[taskID].content) {
      setTasks({
        ...tasks,
        [taskID]: { ...tasks[taskID], content: newContent }
      })
    }
    setEditing(null)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-cards' direction='horizontal' type='card'>
        {(provided) => (
          <div
            className='flex w-full overflow-y-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cardOrder.map((id, index) => {
              const card = cards[id]
              const cardTasks = card.taskIds.map((taskId) => tasks[taskId])
              return (
                <List
                  key={card.id}
                  card={card}
                  tasks={cardTasks}
                  index={index}
                  // onFocusClick={() => onFocusClick(card.id)}
                  onSaveTitleEdit={(title) => onSaveTitleEdit(card.id, title)}
                  onRemoveCard={() => onRemoveCard(card.id)}
                  onAddNewTask={(content) => onAddNewTask(card.id, content)}
                  onSaveTaskEdit={(taskID, newContent) =>
                    onSaveTaskEdit(taskID, card.id, newContent)
                  }
                  onTitleDoubleClick={() => setEditing(card.id)}
                  onTaskDoubleClick={(task) => setEditing(task.id)}
                  isTitleEditing={editing === card.id}
                  isTaskEditing={(task) => editing === task.id}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const List = (props) => {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false)
  const onSaveTask = (content) => {
    if (content.trim() !== '') {
      props.onAddNewTask(content)
    }
    setIsAddingNewTask(false)
  }

  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided) => (
        <div
          className='mx-1 flex w-56 flex-col rounded-lg bg-base-200 p-2'
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={props.card.id}
          // style={{ maxHeight: 'calc(100vh - 190px)' }}
        >
          <div className='flex justify-between px-2'>
            {props.isTitleEditing ? (
              <EditInput
                key={props.card.id}
                value={props.card.title}
                onSave={props.onSaveTitleEdit}
                fontSize='1.5em'
                margin='20px 0 20px 8px'
              />
            ) : (
              <span
                className='font-lg font-bold'
                onDoubleClick={props.onTitleDoubleClick}
                {...provided.dragHandleProps}
              >
                {props.card.title}
              </span>
            )}
            <span onClick={props.onRemoveCard}>x</span>
          </div>
          <Droppable droppableId={props.card.id} type='task'>
            {(provided, snapshot) => (
              <Fragment>
                <div
                  className={`${
                    snapshot.isDraggingOver ? 'bg-base-300' : 'bg-base-200'
                  } mt-1 flex h-full flex-col overflow-y-auto rounded p-1`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: '5em', maxHeight: 'calc(100vh - 12em)' }}
                >
                  {props.tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      onSaveTaskEdit={(content) => props.onSaveTaskEdit(task.id, content)}
                      onTaskDoubleClick={() => props.onTaskDoubleClick(task)}
                      isTaskEditing={props.isTaskEditing(task)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </Fragment>
            )}
          </Droppable>
          <div className='flex flex-1 items-end'>
            {isAddingNewTask ? (
              <EditInput key='newtask' value='' onSave={onSaveTask} margin='8px' />
            ) : (
              <span onClick={() => setIsAddingNewTask(true)}>+ New Task</span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

const Task = (props) => {
  return (
    <div className='flex'>
      {props.isTaskEditing ? (
        <EditInput
          key={props.task.id}
          value={props.task.content}
          onSave={props.onSaveTaskEdit}
          margin='0 0 8px 0'
        />
      ) : (
        <Draggable draggableId={props.task.id} index={props.index}>
          {(provided) => (
            <div
              className={`${
                props.isDragging ? 'bg-info' : 'bg-base-100'
              } card w-full rounded-lg border shadow-sm`}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              // isDragging={snapshot.isDragging}
              onDoubleClick={props.onTaskDoubleClick}
            >
              <div className='card-body p-2.5'>
                <span className='card-title'>{props.task.content}</span>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </div>
  )
}

const EditInput = (props) => {
  const [val, setVal] = useState(props.value)
  return (
    <input
      type='text'
      autoFocus
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          props.onSave(val)
          event.preventDefault()
          event.stopPropagation()
        }
      }}
      onBlur={() => props.onSave(val)}
      // fontSize={props.fontSize}
      // margin={props.margin}
    />
  )
}

const genRandomID = () => {
  return (Math.random() + 1).toString(36).substring(7)
}

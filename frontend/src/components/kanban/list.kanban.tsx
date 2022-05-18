import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '@vira/components/kanban/board/list.kanban'

const dataset = [
  {
    id: '1',
    title: 'List 1',
    cards: [
      {
        id: '1',
        title: 'Card 1'
      },
      {
        id: '2',
        title: 'Card 2'
      },
      {
        id: '3',
        title: 'Card 3'
      }
    ]
  },
  {
    id: '2',
    title: 'List 2',
    cards: [
      {
        id: '4',
        title: 'Card 4'
      },
      {
        id: '5',
        title: 'Card 5'
      },
      {
        id: '6',
        title: 'Card 6'
      }
    ]
  },
  {
    id: '3',
    title: 'List 3',
    cards: [
      {
        id: '7',
        title: 'Card 7'
      },
      {
        id: '8',
        title: 'Card 8'
      },
      {
        id: '9',
        title: 'Card 9'
      }
    ]
  }
]

const datatest = {
  lists: [
    {
      id: 'list-1',
      title: 'water plants',
      cards: [
        {
          id: 'card-1',
          title: 'Home Todos'
        },
        {
          id: 'card-2',
          title: 'Work Todos'
        },
        { id: 'card-3', title: 'Fun Todos' },
        { id: 'card-4', title: 'Completed' }
      ],
      order: 1
    },
    {
      id: 'list-2',
      title: 'buy oat milk',
      cards: [
        {
          id: 'card-5',
          title: 'Home Todos'
        },
        {
          id: 'card-6',
          title: 'Work Todos'
        },
        { id: 'card-7', title: 'Fun Todos' },
        { id: 'card-8', title: 'Completed' }
      ],
      order: 2
    },
    {
      id: 'list-3',
      title: 'build a trello board',
      cards: [
        {
          id: 'card-9',
          title: 'Home Todos'
        },
        {
          id: 'card-10',
          title: 'Work Todos'
        },
        { id: 'card-11', title: 'Fun Todos' },
        { id: 'card-12', title: 'Completed' }
      ],
      order: 3
    },
    { id: 'list-4', title: 'have a beach day', cards: [], order: 4 },
    { id: 'list-5', title: 'build tic tac toe', cards: [], order: 5 }
  ]
}

export const ListKanban = () => {
  const [data, _setData] = useState(datatest)

  useEffect(() => {
    localStorage.setItem('board-dataset', JSON.stringify({ data }))
  }, [data])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (result.type === 'task') {
      // Change or
      console.log({ source })
      console.log({ destination })
      const startColumn = data.lists.find((list) => list.id === source.droppableId)!
      console.log(startColumn)
      const endColumn = data.lists.find((list) => list.id === destination.droppableId)!
      console.log(endColumn)

      if (startColumn === endColumn) {
        const newTaskIds = Array.from(endColumn.cards)

        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...endColumn,
          cards: newTaskIds
        }

        const newState = {
          ...data,
          columns: { ...data, [endColumn.id]: newColumn }
        }

        console.log({ newState })
        return
      }

      const sourceCards = Array.from(startColumn.cards)
      sourceCards.splice(source.index, 1)
      const newStart = {
        ...startColumn,
        cards: sourceCards
      }
      console.log({ newStart })

      const destinationCards = Array.from(endColumn.cards)
      destinationCards.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...endColumn,
        cards: destinationCards
      }
      console.log({ newFinish })

      // Update dataset with new lists
      const newState = {
        ...data,
        lists: {
          ...data,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      _setData(newState)
    }
     
      console.log({ newState })
    } else {
      // const list = data.splice(source.index, 1)[0]
      // data.splice(destination.index, 0, list)
      // list.order = destination.index
      // data
      //   .slice(destination.index)
      //   .map((list, index) => (list.order = destination.index + index + 1))
    }
  }

  return (
    <main className='h-screen w-screen pb-2'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='allCols' type='list' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='auto-cols-220 md:auto-cols-270 mx-1 grid h-full grid-flow-col items-start overflow-x-auto pt-3 md:mx-6 md:pt-2'
              style={{ height: '90%' }}
            >
              {data.lists.map((column, i) => {
                return (
                  <List
                    id={column.id}
                    title={column.title}
                    cards={column.cards}
                    key={column.id}
                    index={i}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  )
}

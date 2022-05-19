import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List } from '@vira/components/kanban/board/list.kanban'

const dataset = [
  {
    id: 'list1',
    title: 'List 1',
    cards: [
      {
        id: 'card1',
        title: 'Card 1'
      },
      {
        id: 'card2',
        title: 'Card 2'
      },
      {
        id: 'card3',
        title: 'Card 3'
      }
    ],
    order: 1
  },
  {
    id: 'list2',
    title: 'List 2',
    cards: [
      {
        id: 'card4',
        title: 'Card 4'
      },
      {
        id: 'card5',
        title: 'Card 5'
      },
      {
        id: 'card6',
        title: 'Card 6'
      }
    ],
    order: 2
  },
  {
    id: 'list3',
    title: 'List 3',
    cards: [
      {
        id: 'card7',
        title: 'Card 7'
      },
      {
        id: 'card8',
        title: 'Card 8'
      },
      {
        id: 'card9',
        title: 'Card 9'
      }
    ],
    order: 3
  }
]

export const ListKanban = () => {
  const [data, _setData] = useState(dataset)

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
      const startColumn = data.find((list) => list.id === source.droppableId)!
      console.log(startColumn)
      const endColumn = data.find((list) => list.id === destination.droppableId)!
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
      data.splice(data.indexOf(startColumn), 1, newStart)

      const destinationCards = Array.from(endColumn.cards)
      destinationCards.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...endColumn,
        cards: destinationCards
      }
      console.log({ newFinish })
      data.splice(data.indexOf(endColumn), 1, newFinish)

      // Update dataset with new lists
      // const newState = {
      //   ...data,
      //   [newStart.id]: newStart,
      //   [newFinish.id]: newFinish
      // }
      _setData(data)
      console.log(data)
    } else {
      const list = data.splice(source.index, 1)[0]
      data.splice(destination.index, 0, list)
      list.order = destination.index
      data
        .slice(destination.index)
        .map((list, index) => (list.order = destination.index + index + 1))
    }
  }

  return (
    <main className='flex h-full w-full flex-1 pb-2'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='allCols' type='list' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex h-full flex-1 overflow-x-auto p-2'
              style={{ maxHeight: 'calc(100vh - 3em)' }}
            >
              {data.map((column, i) => {
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

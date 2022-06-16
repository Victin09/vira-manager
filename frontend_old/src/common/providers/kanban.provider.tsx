import React, { createContext, useContext, useState } from 'react'
import { KanbanContextProps } from '@vira/common/types/kanban-provider.type'

const defaultState: KanbanContextProps = {
  projects: [],
  setProjects: () => [],
  displayCreateProjectModal: false,
  setDisplayCreateProjectModal: () => false,
  displayProjectModal: false,
  setDisplayProjectModal: () => false,
  displayCardModal: false,
  setDisplayCardModal: () => false,
  selectedCard: null,
  setSelectedCard: () => null
}

const KanbanContext = createContext<KanbanContextProps>(defaultState)

export const KanbanProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any[]>([])
  const [displayCreateProjectModal, setDisplayCreateProjectModal] = useState<boolean>(false)
  const [displayProjectModal, setDisplayProjectModal] = useState<boolean>(false)
  const [displayCardModal, setDisplayCardModal] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  return (
    <KanbanContext.Provider
      value={{
        projects,
        setProjects,
        displayCreateProjectModal,
        setDisplayCreateProjectModal,
        displayProjectModal,
        setDisplayProjectModal,
        displayCardModal,
        setDisplayCardModal,
        selectedCard,
        setSelectedCard
      }}
    >
      {children}
    </KanbanContext.Provider>
  )
}

export const useKanban = () => {
  return useContext(KanbanContext)
}

export interface KanbanContextProps {
  projects: any[]
  setProjects: (projects: any) => void
  displayCreateProjectModal: boolean
  setDisplayCreateProjectModal: (displayCreateProjectModal: boolean) => void
  displayProjectModal: boolean
  setDisplayProjectModal: (displayProjectModal: boolean) => void
  displayCardModal: boolean
  setDisplayCardModal: (displayCardModal: boolean) => void
  selectedCard: any
  setSelectedCard: (card: any) => void
}

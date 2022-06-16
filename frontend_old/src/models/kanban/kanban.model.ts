import { Project } from '@vira/models/kanban/project.model'

export interface Kanban {
  projects: Project[]
  cards: any[]
}

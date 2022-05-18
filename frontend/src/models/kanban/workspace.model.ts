import { Project } from '@vira/models/kanban/board.model'

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  boards: Project[];
}

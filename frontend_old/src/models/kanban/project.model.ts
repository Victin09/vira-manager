export interface Project {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  lists?: any[]
  users?: string[]
}

export interface CreateProject {
  name: string
  description: string
  image: string
  users: string[]
}

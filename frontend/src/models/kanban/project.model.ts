export interface Project {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  lists?: any[]
}

export interface CreateProject {
  name: string
  description: string
  image: string
  users: string[]
}

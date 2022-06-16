export interface Card {
  _id?: string
  code: string
  name: string
  description: string
  users: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

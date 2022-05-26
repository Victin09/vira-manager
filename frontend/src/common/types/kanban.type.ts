export type CardProps = {
  _id: string
  index?: number
  name: string
  description?: string
}

export type ListProps = {
  _id: string
  index: number
  title: string
  cards: CardProps[]
}

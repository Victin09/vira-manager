export type CardProps = {
  id: string
  index?: number
  title: string
  description?: string
}

export type ListProps = {
  id: string
  index: number
  title: string
  cards: CardProps[]
}

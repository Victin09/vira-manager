export type TagType = {
  _id: string;
  name: string;
  color: string;
};

export type PriorityType = {
  name: string;
  color: string;
};

export type CardType = {
  _id: string;
  name: string;
  description: string;
  priority: string;
  users: string[];
  comments: string[];
  tags: TagType[];
  createdAt: string;
  updatedAt: string;
};

export type ListType = {
  _id: string;
  name: string;
  cards: CardType[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectType = {
  _id: string;
  name: string;
  code: string;
  type: string;
  lists: ListType[];
  description: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectType = {
  name: string;
  description: string;
};

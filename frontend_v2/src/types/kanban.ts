export type TagType = {
  _id: string;
  name: string;
  color: string;
};

export type CardType = {
  _id: string;
  name: string;
  description: string;
  users: string[];
  comments: string[];
  tags: TagType[];
  createdAt: Date;
  updatedAt: Date;
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
  lists: ListType[];
  description: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProjectType = {
  name: string;
  description: string;
  image: string;
  users: string[];
};

import { User } from "./user";

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
  lists: ListType[];
  description: string;
  initialDate: string;
  endDate: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectType = {
  name: string;
  description: string;
  initDate?: string;
  endDate?: string;
};

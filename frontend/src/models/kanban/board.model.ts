export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProject {
  name: string;
  description: string;
  image: string;
  users: string[];
}

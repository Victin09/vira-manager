export class CreateProjectDto {
  name: string;
  description: string;
  image: string;
  users: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

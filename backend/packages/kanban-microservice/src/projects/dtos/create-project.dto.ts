export class CreateProjectDto {
  name: string;
  description: string;
  image: string;
  users: string[];
  initDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

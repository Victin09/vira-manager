export class CreateProjectDto {
  name: string;
  description: string;
  type: 'KANBAN' | 'SCRUM';
  image: string;
  users: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserDto {
  id: string;
  email: string;
  fullname: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

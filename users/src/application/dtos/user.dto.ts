export interface UserDto {
  _id: string;
  fullname: string;
  email: string
  password: string
  role: string
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  lastLogin: Date
  lastLogout: Date
}
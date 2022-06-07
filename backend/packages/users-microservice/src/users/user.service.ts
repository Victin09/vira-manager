import { Model } from 'mongoose';
import { compareSync } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@vira/users/dtos/create-user.dto';
import { UpdateUserDto } from '@vira/users/dtos/update-user.dto';
import { ValidateUserDto } from '@vira/users/dtos/validate-user.dto';
import { User, UserDocument } from '@vira/users/entities/user.entity';
import { Response } from '@vira/common/types/response.type';
import { UserDto } from '@vira/users/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto) {
    try {
      const user = await this.userModel.findOne({
        email: validateUserDto.email,
      });
      if (user && compareSync(validateUserDto.password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
      throw new HttpException(
        'Error: Cannot validate user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(userEmail: string): Promise<Response<UserDto>> {
    try {
      const { _id, email, fullname, role, createdAt, updatedAt } =
        await this.userModel
          .findOne({ email: userEmail })
          .select('-password -__v');
      return {
        status: HttpStatus.OK,
        message: 'User created',
        data: { id: _id, email, fullname, role, createdAt, updatedAt },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot find user',
      };
    }
  }

  async create(createUserDto: CreateUserDto): Promise<Response<UserDto>> {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        };
      }
      const newUser = new this.userModel({
        ...createUserDto,
        role: 'USER',
        status: 'ACTIVE',
      });
      const { _id, email, fullname, role, createdAt, updatedAt } =
        await newUser.save();
      return {
        status: HttpStatus.OK,
        message: 'User created',
        data: { id: _id, email, fullname, role, createdAt, updatedAt },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot create user',
      };
    }
  }

  async findAll(): Promise<Response<User[]>> {
    try {
      const users = await this.userModel.find();
      return {
        status: HttpStatus.OK,
        message: 'Users found',
        data: users,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot find users',
      };
    }
  }

  async findOne(userId: string) {
    try {
      const { _id, email, fullname, role, createdAt, updatedAt } =
        await this.userModel.findById(userId).select('-password -__v');
      return {
        status: HttpStatus.OK,
        message: 'User found',
        data: { id: _id, email, fullname, role, createdAt, updatedAt },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot find user',
      };
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

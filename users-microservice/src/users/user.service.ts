import { Model } from 'mongoose';
import { compareSync } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@vira/users/dtos/create-user.dto';
import { UpdateUserDto } from '@vira/users/dtos/update-user.dto';
import { ValidateUserDto } from '@vira/users/dtos/validate-user.dto';
import { User, UserDocument } from '@vira/users/entities/user.entity';

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

  async findUserByEmail(email: string): Promise<any> {
    try {
      return await this.userModel.findOne({ email }).select('-password -__v');
    } catch (error) {
      throw new HttpException(
        'Error: Cannot find user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<{ fullname: string }> {
    try {
      const userDocument = new this.userModel({
        ...createUserDto,
        role: 'USER',
      });
      await userDocument.save();
      return { fullname: createUserDto.fullname };
    } catch (error) {
      throw new HttpException(
        'Error: Cannot create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

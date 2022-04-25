import { Model } from 'mongoose';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@infraestructure/models/user.model';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger = new Logger(UserService.name);
  }

  getUsers(): string {
    return 'Getting users from users microservice!';
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          error: 'Error: User not found',
        },
        500,
      );
    }
  }
}

import { Model } from 'mongoose';
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@infraestructure/models/user.model';
import { UserDto } from '@application/dtos/user.dto';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    try {
      const user = await this.userModel.findOne({ email });
      if (user && user.password === password) {
        const { ...result } = user;
        return result;
      }
      return null;
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
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Invalid email',
    },
  })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  role: 'USER' | 'ADMIN';

  @Prop()
  lastLogin: Date;

  @Prop({ default: () => Date.now() })
  createdAt: Date;

  @Prop({ default: () => Date.now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

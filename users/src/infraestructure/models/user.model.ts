import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  email: string

  @Prop({ required: true, minlength: 8 })
  password: string

  @Prop({ required: true })
  role: string

  @Prop({ required: true })
  status: string

  @Prop({ required: true, default: Date.now })
  createdAt: Date

  @Prop({ required: true, default: Date.now })
  updatedAt: Date

  @Prop({ required: true, default: Date.now })
  deletedAt: Date

  @Prop({ required: true, default: Date.now })
  lastLogin: Date

  @Prop({ required: true, default: Date.now })
  lastLogout: Date
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
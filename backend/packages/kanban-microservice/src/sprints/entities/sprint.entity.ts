import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type SprintDocument = Sprint & Document;

@Schema()
export class Sprint {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  initDate: Date;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  project: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);

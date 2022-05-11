import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  cards: string[];

  @Prop({ required: true })
  boardId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);

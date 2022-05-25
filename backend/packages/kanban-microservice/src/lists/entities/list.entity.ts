import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 1 })
  order: number;

  @Prop({ default: false })
  archived: boolean;

  @Prop({ required: true })
  board: string;

  @Prop({ required: true })
  cards: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);

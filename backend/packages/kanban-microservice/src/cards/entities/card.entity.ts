import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, default: 1 })
  order: number;

  @Prop()
  users: string[];

  @Prop({ required: true })
  list: string;

  @Prop({ required: true })
  project: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);

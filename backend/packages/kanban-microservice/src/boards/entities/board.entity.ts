import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  fromSprint: boolean;

  @Prop()
  sprintId: string;

  @Prop({ required: true })
  lists: string[];

  @Prop({ default: false })
  archived: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

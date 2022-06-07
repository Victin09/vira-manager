import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ default: () => uuid() })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  users: string[];

  @Prop({ default: false })
  archived: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

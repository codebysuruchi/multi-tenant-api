import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Issue extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'OPEN' })
  status: string;

  @Prop()
  assigneeId: number;

  @Prop({ required: true })
  organizationId: number;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);

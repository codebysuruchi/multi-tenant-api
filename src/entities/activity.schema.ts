import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
  @Prop({ required: true })
  issueId: number;

  @Prop({ required: true })
  action: string;

  @Prop()
  oldValue: string;

  @Prop()
  newValue: string;

  @Prop({ required: true })
  organizationId: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);

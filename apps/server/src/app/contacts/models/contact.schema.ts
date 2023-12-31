import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  zip: string;

  @Prop({ type: String, required: true })
  country: string;
}

@Schema()
export class Contact extends Document {
  @Prop({ type: String, required: true })
  ownerId: string;

  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: Number })
  phoneNumber: number;

  @Prop({ required: true, type: String })
  modifiedAt: string;

  @Prop({ required: true, type: Boolean })
  isFamily: boolean;

  @Prop([{ required: true, type: Address }])
  addresses: Address[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

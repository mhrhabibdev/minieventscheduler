import { Schema, model } from 'mongoose';
import { EVENT_CATEGORIES } from './event.constants';
import { IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: String,
  category: { 
    type: String, 
    required: true,
    enum: Object.values(EVENT_CATEGORIES)
  },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

export const Event = model<IEvent>('Event', eventSchema);
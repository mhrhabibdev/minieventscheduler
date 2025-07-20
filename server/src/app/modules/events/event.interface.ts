import { TEventCategoryValue } from './event.constants';

import { Document } from 'mongoose';


export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  notes?: string;
  category: TEventCategoryValue; // Now uses 'Work' | 'Personal' | 'Other'
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
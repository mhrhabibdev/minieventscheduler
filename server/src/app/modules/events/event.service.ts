import { categorizeEvent } from "../../utils/event.categorize";
import { IEvent } from "./event.interface";

import { Event } from "./event.model";

export const createEvent = async (payload: IEvent) => {
  if (!payload.category) {
    payload.category = categorizeEvent(payload.title, payload.notes) as "Work" | "Personal" | "Other";
  }
  const event = await Event.create(payload);
  return event;
};

// const getEvents = async ({}) => {
//   return await Event.find({})
//     .sort({ date: 1, time: 1 }) // Sort by date then time
//     .lean(); 
// };
const getEvents = async (filters = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const events = await Event.find(filters)
    .sort({ date: 1, time: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Event.countDocuments(filters);

  return { events, total };
};
export const updateEvent = async (id: string, body: Partial<IEvent>) => {
  const updatedEvent = await Event.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!updatedEvent) {
    throw new Error('Event not found');
  }
  return updatedEvent;
};


export const deleteEvent = async (id: string) => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    throw new Error('Event not found');
  }
  // Optional: Return the deleted event if needed
  return deletedEvent;
};


export const eventService = {
  createEvent, 
  getEvents,
  updateEvent,
  deleteEvent,
};
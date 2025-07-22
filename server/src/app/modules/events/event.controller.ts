import { Request, Response, NextFunction } from "express";
import { eventService } from "./event.service";
import { IEvent } from "./event.interface";

export const createEvent = async (req: Request<{}, {}, IEvent>, res: Response, next: NextFunction) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const events = await eventService.getEvents({});
//     res.status(200).json({
//       success: true,
//       message: "Events fetched successfully",
//       data: events
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { events, total } = await eventService.getEvents({}, page, limit);

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: {
        events,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    next(error);
  }
};
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    // Forcefully set only archived = true, ignore any req.body
    const updatedEvent = await eventService.updateEvent(id, { archived: true });

    res.status(200).json({
      success: true,
      message: "Event archived successfully",
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(200).json({  
      success: true,
      message: "Event deleted successfully",
      data: null  
    });
  } catch (error) {
    next(error);
  }
};



export const eventController = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};


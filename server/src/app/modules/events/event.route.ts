
import express from 'express';
import { eventController } from './event.controller';



const router = express.Router();

// ✅ Use validateRequest before controller
router.post('/events',eventController.createEvent);

router.get('/events', eventController.getEvents);

router.put('/events/:id', eventController.updateEvent);

router.delete('/events/:id', eventController.deleteEvent);

export const eventRoute = router;

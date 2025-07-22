import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import { eventRoute } from './app/modules/events/event.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mini-event-scheular-client.vercel.app'  // ✅ spelling ঠিক আছে কিনা দেখো
  ],
  credentials: true,
}));

// test route
app.get('/test', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer!');
});

// application routes - MOUNT BEFORE notFound middleware
app.use('/', eventRoute);  // Added versioning and better path

// global error handler
app.use(globalErrorHandler);

// Not Found - THIS SHOULD BE LAST
app.use(notFound);

export default app;
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());


app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
// app.use('/', router);

app.get('/test', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !');
});


//Not Found
app.use(notFound);

export default app;
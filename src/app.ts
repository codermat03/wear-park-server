// app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send("Wear Park app is running")
})

app.use(globalErrorHandler);
//not found route
app.use(notFound);

export default app;
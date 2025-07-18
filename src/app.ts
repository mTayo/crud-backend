import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/tasks/task.routes';
import { notFound } from './middlewares/notFound';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const allowedOrigins = ['https://someurl.com', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use(notFound);


export default app;

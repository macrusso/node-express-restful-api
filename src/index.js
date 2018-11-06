import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './controllers/error';
import { authRoutes, postRoutes, commentRoutes, userRoutes } from './routes';
import { loginRequired } from './middleware/auth';

dotenv.config();
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', loginRequired, postRoutes);
app.use('/api/users', loginRequired, userRoutes);
app.use('/api/comments', loginRequired, commentRoutes);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;

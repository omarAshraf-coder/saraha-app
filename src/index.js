import express from 'express';
import { connectDB } from './database/connection.js';
import userRouter from './modules/user/user.router.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', userRouter);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
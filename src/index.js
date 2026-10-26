import express from 'express';
import { connectDB } from './database/connection.js';
import userRouter from './modules/user/user.router.js';
import messageRouter from './modules/message/message.router.js';

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

app.use('/users', userRouter);
app.use('/messages', messageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
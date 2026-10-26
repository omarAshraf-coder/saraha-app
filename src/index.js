import express from 'express';
import { connectDB } from './database/connection.js';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to Database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello in Saraha App Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
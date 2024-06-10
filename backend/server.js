
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = 4000;

// Middleware to log the details of each incoming request
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);//cartRouter.js
app.use('/api/order', orderRouter);

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

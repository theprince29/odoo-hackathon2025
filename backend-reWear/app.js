import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRouters.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();


app.use(cors({
  origin:  'http://localhost:5173',
  credentials: true
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req,res) =>{
  res.send("Hello from backend")
})

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

export default app;
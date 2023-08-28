import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/ticket', ticketRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h4>Welcome to Ticket Management</h4>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgBrightCyan.blue);
});
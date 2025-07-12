import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import userRoute from "./routes/user.route.js";
import itemsRoute from "./routes/items.route.js";
import swapsRoute from "./routes/swaps.route.js";
import transactionsRoute from "./routes/transactions.route.js";
import pointsRoute from "./routes/points.route.js";
import adminRoutes from './routes/admin.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8006;

app.get("/", (req, res) => res.status(200).json({
    message: "Backend Activated",
    success: true
}))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// APIs
app.use("/api/user", userRoute);
app.use("/api/items", itemsRoute);
app.use("/api/swaps", swapsRoute);
app.use("/api/points", pointsRoute);
app.use("/api/transactions", transactionsRoute);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Server started at PORT ${PORT}`);
})
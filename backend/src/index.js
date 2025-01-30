import express from 'express';
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import { clerkMiddleware } from "@clerk/express"
import { connectDB } from './lib/db.js';


dotenv.config(); // Add this before any code that uses process.env
const app = express(); 
const Port = process.env.PORT || 5000;

app.use(express.json()); //parsing the json
app.use(clerkMiddleware()); //thill will add auth to req obj
app.use("/api/users",userRoutes)
// app.use("/api/auth",authRoutes) 
app.use("/api/admin",adminRoutes)
// app.use("/api/songs",userRoutes)
// app.use("/api/albums",userRoutes)
// app.use("/api/stats",statsRoutes)





app.listen(Port,() => {
    console.log("Service runninon on" + Port);
    connectDB();
});
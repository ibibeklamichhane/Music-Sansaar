import express from 'express';
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import { clerkMiddleware } from "@clerk/express"
import { connectDB } from './lib/db.js';
import fileUpload from "express-fileupload"
import path from "path";

dotenv.config(); // Add this before any code that uses process.env
const __dirname = path.resolve();
const app = express(); 
const Port = process.env.PORT || 5000;

app.use(express.json()); //parsing the json
app.use(clerkMiddleware()); //thill will add auth to req obj 

//what this does is that under our backend folder it will create a new folder called temp file
//  and it stores our files we uploading in post request
app.use(fileupload ({ 
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true ,//this is if a temp folder does not exist it will create for the first time
    limits:{
        fileSize: 10*1024*1024 //10 mb max filesize
    }
    

}))

app.use("/api/users",userRoutes)
// app.use("/api/auth",authRoutes) 
app.use("/api/admin",adminRoutes)
// app.use("/api/songs",userRoutes)
// app.use("/api/albums",userRoutes)
// app.use("/api/stats",statsRoutes)



//error hadlerer for all the controller error
app.use((err,req,res,next) =>{
    res.status(500).json({message:process.env.NODE_ENV ==="production"?"Internal Server Error":err.message});
})

app.listen(Port,() => {
    console.log("Service runninon on" + Port);
    connectDB();
});
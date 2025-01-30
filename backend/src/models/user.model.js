 import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
     imageUrl: {
        type: String,
        required: true,
     },
     clerkId: {
        type: String,
        required: true,
        unique: true,
     },

 },
 {timestamps:true}
);

module.exports = mongoose.model('User', userSchema);
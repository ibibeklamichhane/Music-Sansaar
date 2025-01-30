import mongoose  from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    artist: {
        type: "string",
        required: true
    },
    imageUrl: {
        type: "string",
        required: true

    },
    audioUrl: {
        type: "string",
        required: true
        },
        duration: {
            type: "number",
            required: true
        },
        albumId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Album',
            required: true
        }
}
,{timestamps:true});

export const Song = mongoose.model('Song',songSchema)
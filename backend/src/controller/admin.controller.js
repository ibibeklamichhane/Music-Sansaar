import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for cloudinary upload
const uploadToCloudinary = async(file)  => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto"

        })
        return result.secure_url
    } catch (error) {
        console.log("Error in cloudinary upload",error);
        throw new Error("Error uploading to cloudinary");
        
    }
}

export const createSong =async (req, res,next) => {
try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(404).json({message:"Please upload all the required files"})      
    }
    const {title,artist,albumId,duration} = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;


    //uploaing the images and files to cloudinary and from there we get the urls to store in our db
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);
    const song = new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId: albumId || null
    })
    await song.save();

    //If the album id is present when uploading a song.Check if there is already the albium  and if theres is than push the song to that album
    if(albumId){
        await Album.findByIdAndUpdate(albumId,{
            $push: { songs:song._id },//$push means that it pushes the unique song id to the array  of song to album
        }
        )

    }
    res.status(201).json(song);   
} catch (error) {
    console.log("Error in creaSong",error);
    next(error)    
}
}

export const deleteSong = async(req,res,next) => {
    try {
        const{ id } = req.params;
        const song = await Song.findById(id);

        //checl the song in which it belongs to the album
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{ songs:song._id },
            })
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({message:"Song deleted successfully"})
    } catch (error) {
        console.log("Error in deleteSong",error);   
       next(error) 
    }

}

//Album Upload functionality

export const createAlbum = async(req,res,next) => {
    try {
        const {title,artist,releaseYear} = req.body;
        const imageFile = req.files.imageFile;

        //getting image url form cloudinary
        const imageUrl = await uploadToCloudinary(req.files.imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        })
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum",error);
        next(error)
        
    }

}

export const deleteAlbum = async(req,res,next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId:id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album deleted successfully"})

    } catch (error) {
        console.log("Error in deleteAlbum",error);
        next(error)
        
    }
}

export const checkAdmin = async(req,res,next) => {
    res.status(200).json({admin:true});
}
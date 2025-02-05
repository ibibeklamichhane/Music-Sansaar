import { Song } from "../models/song.model";

export const getAllSongs = async (req, res,next) => {
    try {
        //-1 = descending (from newest to older)
        const songs = await Song.find().sort({createdAt:-1});
        res.status(200).json(songs)
    } catch (error) {
        next(error)
    }
}

export const getFeaturedSongs = async (req, res,next) => {
    try {
        //fetch the 10 most recent songs from mongodb aggregiate pipiline
        const songs = await Song.aggregate([
            {
                $sample:{size:5},         
        },
        {
            $project: {}
        }
    ])
    } catch (error) {
        
    }
}

export const getMadeForYouSongs = async (req, res,next) => {}

export const getTrendingSongs = async (req, res,next) => {}
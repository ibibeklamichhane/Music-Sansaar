import { clerkClient } from '@clerk/express';

export const protectedRoute = async(req, res, next) => {
if(!req.auth.userId) {
    return res.status(401).json({ message: 'Unauthorized you must log in' });
}
next();
};


export const requireAdmin = async(req, res, next) => {
    try { 
        
        const user = await clerkClient.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin) {
            return res.status(403).json({message:"unauthrixes admin"})
        }
        next();
    } catch (error) {
        
    }
}
import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      //signup
      await User.create({
        clerkId: id,
        firstName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res.status(200).json({success:true})
  } catch (error) {
    console.log("Error in the auth Callback",error)
    res.status(500).json({ success: false, message: "Error in authCallback"
  })
}

};

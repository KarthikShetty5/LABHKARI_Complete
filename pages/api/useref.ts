import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import User from '../../model/User.model'; // Adjust the path based on your actual structure

const userRef = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: "This method is not allowed" });
    }

    const { ref } = req.body;

    if (!ref) {
        return res.status(400).json({
            success: false,
            message: "Reference ID is required"
        });
    }

    // Find user by ref directly
    try {
        const user = await User.findOne({ userId: ref });
        if (user) {
            return res.status(200).json({
                success: true,
                message: "User related to reference ID",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "User not found for the provided reference ID",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
};

export default connectDb(userRef);

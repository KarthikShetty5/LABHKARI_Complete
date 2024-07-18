import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Cart from '../../model/Cart.model'; // Adjust the path based on your actual structure
import Kyc from '@/model/Kyc.model';

const addKycItem = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.body;

        const existingKyc = await Kyc.findOne({ userId:userId });

        if (existingKyc) {
            return res.status(200).json({
                success: false,
                message: "Kyc already exists",
            });
        } else {
            return res.status(500).json({
                success: true,
                message: "kyc dont exist",
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default connectDb(addKycItem);

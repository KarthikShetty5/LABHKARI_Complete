import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import ProductModel from '@/model/Product.model';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await ProductModel.find();
        if (user) {
            return res.status(200).json({
                success: true,
                message: "User related to reference ID",
                data: user
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
}

export default getUser;
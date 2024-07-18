import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../middleware/mongoose"; // Adjust the path based on your actual structure
import Kyc from "@/model/Kyc.model";

const addKycItem = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, pancard, accountNumber, ifscCode, agreed } = req.body;

      const kyc = new Kyc({
        userId,
        PanCard: pancard,
        AccountNumber: accountNumber,
        IFSCCode: ifscCode,
        agreed,
      });
      await kyc.save();
      return res.status(200).json({
        success: true,
        message: "Item added successfully",
      });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default connectDb(addKycItem);

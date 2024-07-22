import { NextApiRequest, NextApiResponse } from "next";
import Promotional from "@/model/Promotional.model";
import connectDb from "@/middleware/mongoose";

const getPromotional = async (req: NextApiRequest, res: NextApiResponse) => {
  const { batchId } = req.body;
  try {
    const promotional = await Promotional.find({ batchId: batchId });
    res.status(200).json({
      success: true,
      data: promotional,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default connectDb(getPromotional);

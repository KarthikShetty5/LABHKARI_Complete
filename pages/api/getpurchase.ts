import { NextApiRequest, NextApiResponse } from "next";
import Purchase from "@/model/Purchase.model";
import connectDb from "@/middleware/mongoose";

const getPurchase = async (req: NextApiRequest, res: NextApiResponse) => {
  const { batchId } = req.body;

  try {
    const purchase = await Purchase.find({ batchId:batchId });
    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default connectDb(getPurchase);

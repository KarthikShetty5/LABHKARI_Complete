import { NextApiRequest, NextApiResponse } from "next";
import Promotional from "@/model/Promotional.model";
import connectDb from "@/middleware/mongoose";

const addPromotionalHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { applicableDate, batchId, percentDiscount, cashAmount } = req.body;

    const newPromotional = new Promotional({
      applicableDate,
      batchId,
      percentDiscount,
      cashAmount,
    });

    const savedPromotional = await newPromotional.save();

    return res.status(200).json({
      success: true,
      message: "Promotional added successfully",
      data: savedPromotional,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error adding Promotional to db",
      error: error.message,
    });
  }
};

export default connectDb(addPromotionalHandler);

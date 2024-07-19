import { NextApiRequest, NextApiResponse } from "next";
import Variation from "@/model/Variation.model";
import connectDb from "@/middleware/mongoose";

const addVariationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { productId,variation, weight, length, breadth, height } = req.body;

    const newVariation = new Variation({
      productId,
      variation,
      weight,
      length,
      breadth,
      height,
    });

    const savedVariation = await newVariation.save();

    return res.status(200).json({
      success: true,
      message: "Variation added successfully",
      data: savedVariation,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error adding Variation to db",
      error: error.message,
    });
  }
};

export default connectDb(addVariationHandler);

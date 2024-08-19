import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/model/Product.model";  // Assuming you have a Product model
import connectDb from "@/middleware/mongoose";

const getAllProductHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { idStrings } = req.body;

    const ids = idStrings.map((id: string) => Number(id));

    const products = await Product.find({ _id: { $in: ids } }).select("price title");

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export default connectDb(getAllProductHandler);

import { NextApiRequest, NextApiResponse } from "next";
import Inventory from "@/model/Inventory.model";
import connectDb from "@/middleware/mongoose";

const addInventoryHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { productId, variation, batchId, openingQty, inQty, outQty } =
      req.body;

    const newInventory = new Inventory({
      productId,
      variation,
      batchId,
      openingQty,
      inQty,
      outQty,
    });

    const savedInventory = await newInventory.save();

    return res.status(200).json({
      success: true,
      message: "Inventory added successfully",
      data: savedInventory,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error adding Inventory to db",
      error: error.message,
    });
  }
};

export default connectDb(addInventoryHandler);

import { NextApiRequest, NextApiResponse } from "next";
import Inventory from "@/model/Inventory.model";
import Batch from "@/model/Batch.model";
import connectDb from "@/middleware/mongoose";

const addInventoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { batchId, qty } = req.body;

    // Fetch batch details using batchId
    const batchDetails = await Batch.findOne({batchNo:batchId});

    if (!batchDetails) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    // Destructure necessary details from the batch
    const { productId, variation, quantity } = batchDetails;

    const newInventory = new Inventory({
      productId,
      variation,
      batchId,
      openingQty: quantity, 
      inQty: qty, 
      outQty: 0, 
    });

    // productId: string;
    // variation: string;
    // batchId: string;
    // openingQty: number;
    // inQty: number;
    // outQty: number;

    const savedInventory = await newInventory.save();

    return res.status(200).json({
      success: true,
      message: "Inventory added successfully",
      data: savedInventory,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error adding Inventory to db",
      error: error.message,
    });
  }
};

export default connectDb(addInventoryHandler);

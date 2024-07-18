import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/middleware/mongoose';
import Product from '@/model/Product.model';
import express, { request } from 'express';

const updateProductHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { customId, title, ratings, image, description, category } = req.body;

    try {
        // Check if productId is provided
        if (!customId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Find the product by productId
        const product = await Product.findOne({ customId: customId });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update product fields
        product.title = title || product.title;
        product.ratings = ratings || product.ratings;
        product.image = image || product.image
        product.description = description || product.description;
        product.category = category || product.category;

        // Save updated product
        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error: any) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default connectDb(updateProductHandler);
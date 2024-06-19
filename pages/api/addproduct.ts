// pages/api/addProduct.ts (or other API route file)
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/middleware/mongoose';
import Product from '@/model/Product.model';
import { uploadWithMulter } from '@/utils/aws';
import express, { request } from 'express';

// Create an express app instance
const app = express();

// Use middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Example API route handler
const addProductHandler = async (req: any, res: NextApiResponse) => {
    try {
        // Handle file upload with multer
        const upload = uploadWithMulter();

        upload(req as any, res as any, async (err: any) => {
            if (err) {
                console.error("Error uploading to S3:", err);
                return res.status(500).json({ success: false, message: "Error occurred while uploading" });
            }

            // File upload successful, now handle product addition
            const { title, ratings, price, description, tag, category, gst, weight } = req.body;

            // Ensure req.files exists and is of the expected type
            if (!req.file || !Array.isArray(req.files)) {
                return res.status(400).json({ success: false, message: "Images are required" });
            }

            const imageUrls = (req.files as Express.MulterS3.File[]).map(file => file.location).join(',');

            const newProduct = new Product({
                title,
                ratings,
                image: imageUrls, // Store the image URLs in the image field
                price,
                description,
                tag,
                gst,
                weight,
                category: category // Example: replace with your actual category logic
            });

            const savedProduct = await newProduct.save();

            return res.status(200).json({
                success: true,
                message: "Product added successfully",
                data: savedProduct
            });
        });
    } catch (error: any) {
        console.error("Error adding product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default connectDb(addProductHandler);

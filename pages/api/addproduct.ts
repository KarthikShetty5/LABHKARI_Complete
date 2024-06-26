import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/middleware/mongoose';
import Product from '@/model/Product.model';
import { uploadWithMulter } from '@/utils/aws';
import multer from 'multer';

const upload = uploadWithMulter().array('s3Images', 2);

export const config = {
    api: {
        bodyParser: false,
    },
};

const runMiddleware = (req: any, res: any, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

const handler = async (req: any, res: any) => {
    await runMiddleware(req, res, upload);

    if (req.method === 'POST') {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: "Images are required" });
            }

            const { title, ratings, price, description, tag, category, gst, weight } = req.body;

            const imageUrls = (req.files as Express.MulterS3.File[]).map(file => file.location).join(',');

            const newProduct = new Product({
                title,
                ratings,
                image: imageUrls,
                price,
                description,
                tag,
                gst,
                weight,
                category
            });

            const savedProduct = await newProduct.save();

            return res.status(200).json({
                success: true,
                message: "Product added successfully",
                data: savedProduct
            });
        } catch (error: any) {
            console.error("Error adding product:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default connectDb(handler);

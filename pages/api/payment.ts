import next, { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'express';
import { instance } from '@/middleware/razorConnection'; // Ensure the path is correct
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const checkOut: RequestHandler = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR',
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error: any) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating Razorpay order',
            error: error.message,
        });
    }
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle POST request for checkout
        return checkOut(req as any, res as any, next as any);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

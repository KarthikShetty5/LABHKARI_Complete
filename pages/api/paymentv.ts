import next, { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'express';
import { instance } from '@/middleware/razorConnection'; // Ensure the path is correct
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const paymentVerification: RequestHandler = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET || '')
        .update(body)
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/success?reference=${razorpay_payment_id}&success=true`);
        } catch (error: any) {
            console.error('Redirect error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid signature',
        });
    }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle POST request for payment verification
        return paymentVerification(req as any, res as any, next as any);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
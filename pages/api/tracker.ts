import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { shipment_id } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipment_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`,
                }
            });

            res.status(200).json(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

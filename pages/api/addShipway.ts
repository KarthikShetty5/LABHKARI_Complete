import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface SendShipRequest extends NextApiRequest {
    body: {
        orderId: string;
        email: string;
        phone: string;
        name: string;
        amount: number;
        amountPaid: boolean;
        userId: string | null;
        paymentMethod: string;
        itemCount: number;
        shippingAddress: string;
        state: string;
        country: string;
        landmark: string;
        city: string;
        tag: string;
        pinCode: number;
    };
}

const handleShip = async (req: SendShipRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { orderId, email, phone, name, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode } = req.body;
            // Add the order details to your order table
            const orderApiUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addorder";

            // Add shipment details to Shipway
            const shipwayResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
                "order_id": orderId,
                "order_date": new Date().toISOString().replace('T', ' ').slice(0, 19),
                "pickup_location": "Primary",
                "channel_id": "",
                "billing_customer_name": name,
                "billing_last_name": "",
                "billing_address": shippingAddress,
                "billing_address_2": "",
                "billing_city": city,
                "billing_pincode": pinCode,
                "billing_state": state,
                "billing_country": country,
                "billing_email": email,
                "billing_phone": phone,
                "shipping_is_billing": true,
                "shipping_customer_name": "",
                "shipping_last_name": "",
                "shipping_address": "",
                "shipping_address_2": "",
                "shipping_city": "",
                "shipping_pincode": "",
                "shipping_country": "",
                "shipping_state": "",
                "shipping_email": "",
                "shipping_phone": "",
                "order_items": [
                    {
                        "name": "Kunai",
                        "sku": "chakra123",
                        "units": 10,
                        "selling_price": "900",
                        "discount": "",
                        "tax": "",
                        "hsn": 441122
                    }
                ],
                "payment_method": "Prepaid",
                "shipping_charges": 0,
                "giftwrap_charges": 0,
                "transaction_charges": 0,
                "total_discount": 0,
                "sub_total": amount,
                "length": 10,
                "breadth": 15,
                "height": 20,
                "weight": 2.5
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`,
                }
            }
            );

            await axios.post(orderApiUrl, {
                orderId,
                email,
                amount,
                name,
                phone,
                amountPaid,
                userId,
                itemCount,
                shippingAddress,
                state,
                country,
                landmark,
                city,
                tag,
                pinCode,
                shipment_id: shipwayResponse.data.shipment_id || ""
            });
            res.status(200).json({ message: shipwayResponse.data.shipment_id });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handleShip;

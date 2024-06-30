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
                pinCode
            });

            const username = "gyankulnetwork@gmail.com";
            const password = "q1IT9zj91968v6TIe669L8S7hg92HS6w";
            const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

            // Add shipment details to Shipway
            const shipwayResponse = await axios.post('https://app.shipway.com/api/v2orders', {
                "order_id": orderId,
                "ewaybill": "AD767435878734PR",
                "products": [
                    {
                        "product": "My Test Product 5",
                        "price": "200",
                        "product_code": "JSN909",
                        "amount": "1",
                        "discount": "0",
                        "tax_rate": "5",
                        "tax_title": "IGST"
                    },
                    {
                        "product": "My Test Product 23",
                        "price": "120",
                        "product_code": "JSN9999",
                        "amount": "150",
                        "discount": "0",
                        "tax_rate": "5",
                        "tax_title": "IGST"
                    }
                ],
                "order_total": amount,
                "payment_type": "P",
                "email": email,
                "billing_address": shippingAddress,
                "billing_city": city,
                "billing_state": state,
                "billing_country": country,
                "billing_firstname": name,
                "billing_phone": phone,
                "shipping_address": shippingAddress,
                "shipping_city": city,
                "shipping_state": state,
                "shipping_country": country,
                "shipping_firstname": name,
                "shipping_phone": phone,
                "shipping_zipcode": pinCode,
                "order_date": new Date().toISOString().replace('T', ' ').slice(0, 19)
            }, {
                headers: {
                    'Authorization': auth
                }
            });
            res.status(200).json({ message: "Shipway order added successfully" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handleShip;

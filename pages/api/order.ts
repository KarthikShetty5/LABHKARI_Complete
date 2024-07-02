import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, shipment_id: string, name: string) => {
    try {
        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Your order Confirmed</title>
        </head>
        <body>
            <h1>Track your order now</h1>
            <p>Your Shipment id is : ${shipment_id}</p> 
            <br/><br/>
            <p>Thank you, ${name}</p>
            <img src="https://labhkari.s3.ap-south-1.amazonaws.com/logo2.png" width="90" height="40">
        </body>
        </html>`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "wear.from.brand@gmail.com",
                pass: "xdfz zzgj bmhr dtxq",
            },
            connectionTimeout: 5 * 60 * 1000, // 5 min
        });

        const info = await transporter.sendMail({
            from: "wear.from.brand@gmail.com",
            to,
            subject,
            html: htmlContent,
        });
    } catch (error) {
        console.error(error);
    }
};

const sendSMS = async (toNumbers: string, name: string) => {
    try {
        let phone = `+91${toNumbers}`;
        const url = 'https://control.msg91.com/api/v5/flow';
        const body = {
            "template_id": process.env.NEXT_PUBLIC_TEMPLATE_ID_ORD,
            "short_url": "0",
            "realTimeResponse": "0",
            "recipients": [
                {
                    "mobiles": phone,
                    "var1": name,
                    "var2": "https://labhkari.com/orders ."
                }
            ]
        };
        const headers = {
            'Content-Type': 'application/json',
            'authkey': process.env.NEXT_PUBLIC_AUTH_KEY,
            'Accept': 'application/json'
        };

        const response = await axios.post(url, body, { headers });
    } catch (error: any) {
        throw error;
    }
};

const handleShip = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { order_id } = req.body;
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchorder";
        try {
            // Fetch order details from your Orders API
            const orderResponse = await axios.post(url, {
                "orderId": order_id
            });
            const order = orderResponse.data;
            // Check if order exists
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // // Fetch shipment details from Shipway
            // const shipmentResponse = await axios.get(`https://apiv2.shiprocket.in/v1/external/shipments/${order.data.shipment_id}`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`,
            //     }
            // });

            // const { tracking_url, current_status } = shipmentResponse.data.response;
            // console.log(shipmentResponse);
            // // Send email with shipment details
            await sendMail(order.data.email, "Your Order Shipment Details", order.data.shipment_id, order.data.name);
            await sendSMS(order.data.name, order.data.phone)

            res.status(200).json({ message: "shipmentResponse.data" });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch shipment details or send email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handleShip;

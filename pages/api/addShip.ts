import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import connectDb from '@/middleware/mongoose';

const sendToShiprocket = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method not allowed. Only POST requests are allowed." });
  }

  try {
    const { product_name,weight,length,breadth,height,orderId,city, billing_customer_name,billing_address,billing_pincode,billing_state,billing_country,billing_email,billing_phone,quantity,amount,shipping_charges} = req.body;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log()
    // Send the data to Shiprocket API
    const shiprocketResponse = await axios.post(
      'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
      {
        order_id: orderId,
        order_date: currentDateTime,
        pickup_location: "Primary",
        billing_customer_name: billing_customer_name,
        billing_last_name: "billing_last_name",
        billing_address: billing_address,
        channel_id: "",
        billing_address_2: "billing_address_2",
        billing_cit: city,
        billing_pincode: billing_pincode,
        billing_state: billing_state,
        billing_country: billing_country,
        billing_email: billing_email,
        billing_phone: billing_phone,
        shipping_is_billing: true,
        shipping_customer_name: billing_customer_name,
        shipping_last_name: "shipping_last_name",
        shipping_address: billing_address,
        shipping_address_2: "shipping_address_2",
        shipping_city: city,
        shipping_pincode: billing_pincode,
        shipping_country: billing_country,
        shipping_state: billing_state,
        shipping_email: billing_email,
        shipping_phone: billing_phone,
        order_items:[
          {
              name: product_name,
              sku: "chakra123",
              units: quantity,
              selling_price: amount,
              discount: "",
              tax: "",
              hsn: 441122
            }
        ],
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total:amount,
        length: length,
        breadth: breadth,
        height: height,
        weight: weight,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`, // Replace with your actual Shiprocket API token
        },
      }
    );

    // Respond with the Shiprocket API response
    res.status(200).json({ success: true, data: shiprocketResponse.data });
  } catch (error: any) {
    console.error('Error sending order to Shiprocket:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send order to Shiprocket', error: error.message });
  }
};

export default connectDb(sendToShiprocket);

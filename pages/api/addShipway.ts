// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// interface SendShipRequest extends NextApiRequest {
//     body: {
//         orderId: string;
//         email: string;
//         phone: string;
//         name: string;
//         amount: number;
//         amountPaid: boolean;
//         userId: string | null;
//         paymentMethod: string;
//         itemCount: number;
//         shippingAddress: string;
//         state: string;
//         country: string;
//         landmark: string;
//         city: string;
//         tag: string;
//         pinCode: number;
//         ids: string[];
//         lengths: number;
//         heights: number;
//         breadths: number;
//     };
// }

// interface Ship {
//     name: string;
//     selling_price: number;
//     units: number;
//     tax: number;
//     length: number;
//     weight: number;
//     breadth: number;
//     height: number;
// }

// const handleShip = async (req: SendShipRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//         try {
//             const { orderId, email, phone, name, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode, ids } = req.body;

//             // Fetch product details for each id in ids
//             const productPromises = ids.map(id =>
//                 axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getdetails`, { customId: id })
//             );

//             const productResponses = await Promise.all(productPromises);

//             const products = productResponses.map(response => response.data);

//             // Create order items array for Shipway request
//             const orderItems:Ship[] = products.map(product => ({
//                 name: product.data[0].title,
//                 units: itemCount,
//                 selling_price: amount, // Adjust according to your product schema
//                 tax: product.data[0].gsts, // Add tax if applicable
//                 length: product.data[0].lengths[0],
//                 weights: product.data[0].weights[0], // Add weights if applicable
//                 breadth: product.data[0].breadths[0],
//                 heights: product.data[0].heights[0], 
//             }));

//             // Add shipment details to Shipway
//             const shipwayResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
//                 "order_id": orderId,
//                 "order_date": new Date().toISOString().replace('T', ' ').slice(0, 19),
//                 "pickup_location": "Primary",
//                 "channel_id": "",
//                 "billing_customer_name": name,
//                 "billing_last_name": "",
//                 "billing_address": shippingAddress,
//                 "billing_address_2": "",
//                 "billing_city": city,
//                 "billing_pincode": pinCode,
//                 "billing_state": state,
//                 "billing_country": country,
//                 "billing_email": email,
//                 "billing_phone": phone,
//                 "shipping_is_billing": true,
//                 "shipping_customer_name": "",
//                 "shipping_last_name": "",
//                 "shipping_address": "",
//                 "shipping_address_2": "",
//                 "shipping_city": "",
//                 "shipping_pincode": "",
//                 "shipping_country": "",
//                 "shipping_state": "",
//                 "shipping_email": "",
//                 "shipping_phone": "",
//                 "order_items": orderItems,
//                 "payment_method": "Prepaid",
//                 "shipping_charges": 0,
//                 "giftwrap_charges": 0,
//                 "transaction_charges": 0,
//                 "total_discount": 0,
//                 "sub_total": amount,
//                 "length": orderItems.lengths,
//                 "breadth": orderItems.breadths,
//                 "height": orderItems.heights,
//                 "weight": orderItems.weights
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`,
//                 }
//             });

//             if (shipwayResponse.data.shipment_id) {
//                 const orderApiUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addorder";
//                 await axios.post(orderApiUrl, {
//                     orderId,
//                     email,
//                     amount,
//                     name,
//                     phone,
//                     amountPaid,
//                     userId,
//                     itemCount,
//                     shippingAddress,
//                     state,
//                     country,
//                     landmark,
//                     city,
//                     tag,
//                     pinCode,
//                     shipment_id: shipwayResponse.data.shipment_id || ""
//                 });
//             }

//             res.status(200).json({ message: shipwayResponse});
//         } catch (error:any) {
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// };

// export default handleShip;

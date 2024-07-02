import axios from 'axios';
import React from 'react';

export interface Order {
    _id: string;
    orderId: string;
    email: string;
    name: string;
    phone: string;
    amount: number;
    amountPaid: boolean;
    state: string;
    country: string;
    landmark: string;
    city: string;
    userId: string;
    itemCount: number;
    tag: string;
    pinCode: number;
    shippingAddress: string;
    shipment_id: string;
}


interface OrderCardProps {
    order: Order;
}


const OrderCard: React.FC<OrderCardProps> = ({ order }) => {

    const handleNotification = async (shipment_id: string) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/sendMail";
        try {
            const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipment_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHIP_ROCKET_AUTH}`,
                }
            });
            if (response.data.tracking_data === undefined) {
                alert("Please push the order first")
            } else {
                const respon = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ to: order.email, subject: "Track your order", url: response.data.tracking_data.track_url, status: response.data.tracking_data.shipment_track[0].current_status, shipment_id: order.shipment_id, courier_name: response.data.tracking_data.shipment_track[0].courier_name, edd: response.data.tracking_data.shipment_track[0].edd })
                });
                const res = await respon.json();
            }
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 mb-4">
            <div className="ml-4">
                <h2 className="text-xl font-semibold mb-2">OID : {order.orderId}</h2>
                <h2 className="text-xl font-semibold mb-2">Name : {order.name}</h2>
                <p className="text-gray-600">Phone : {order.phone}</p>
                <p className="text-gray-600">Shipment ID : {order.shipment_id}</p>
                <button onClick={() => handleNotification(order.shipment_id)} className="bg-green-400 mt-4">Send Notification</button>
            </div>
        </div>
    );
};

export default OrderCard;

import axios from 'axios';
import React, { useEffect } from 'react';
import Link from 'next/link';

export interface Order {
    _id:string;
    desc: string;
    customId: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
    ratings: number;
    tag: string;
    path: string;
    weight: string;
    gst: string;
    category: string;
    
}

interface CombinedData {
    productData: any;
    _id:string;
    desc: string;
    customId: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
    ratings: number;
    tag: string;
    path: string;
    weight: string;
    gst: string;
    category: string;
    orderId: string;
    email: string;
    name: string;
    phone: string;
    amount: number;
    amountPaid: boolean;
    productId:string[] | string;
    state: string;
    country: string;
    landmark: string;
    city: string;
    itemCount: number;
    pinCode: number;
    shippingAddress: string;
    shipment_id: string;
    products:string[]
}


interface OrderCardProps {
    order: CombinedData;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {

    const handleNotification = async (shipment_id: string) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/sendMail";
        try {
            const response = await axios.get(`/api/tracker?shipment_id=${shipment_id}`);
            if (response.data.tracking_data === undefined) {
                alert("Please push the order first")
            } else {
                const mailResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: order.email,
                        subject: "Track your order",
                        url: response.data.tracking_data.track_url,
                        status: response.data.tracking_data.shipment_track[0].current_status,
                        shipment_id: order.shipment_id,
                        courier_name: response.data.tracking_data.shipment_track[0].courier_name,
                        edd: response.data.tracking_data.shipment_track[0].edd
                    })
                });

                const res = await mailResponse.json();
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 mb-4">
            <div className="ml-4">
                <h2 className="text-xl font-semibold mb-2">OID : {order.orderId}</h2>
                <h2 className="text-xl font-semibold mb-2">Name : {order.name}</h2>
                <p className="text-gray-600">Phone : {order.phone}</p>
                <p className="text-gray-600">Shipment ID : {order.shipment_id}</p>
                <p className="text-green-600 text-xl">{order.amountPaid && 'Paid'}</p>
                <p className="text-red-600 text-xl">{!order.amountPaid && 'Not Paid'}</p>

                {!order.pinCode ?  <p className="text-gray-600">Self Pickup</p> :
                <>
                    <p className="text-gray-600">Address : {order.shippingAddress}</p>
                    <p className="text-gray-600">City : {order.city}</p>
                    <p className="text-gray-600">State : {order.state}</p>
                    <p className="text-gray-600">Country : {order.country}</p>
                    <p className="text-gray-600">Landmark : {order.landmark}</p>
                    <p className="text-gray-600">Pin code : {order.pinCode}</p>
                </>
                }

                <button onClick={() => handleNotification(order.shipment_id)} className="bg-green-400 mt-4">Send Notification</button>
                <button className="bg-red-400 mt-4 ml-6">                                        
                    <Link href={`/admin/push?orderId=${order.orderId}`}>
                        Push Order
                    </Link> 
                </button>
                <button className="bg-green-400 mt-4 ml-6">                                        
                    <Link href={`/viewOrder?orderId=${order.orderId}`}>
                        More Details &rarr;
                    </Link> 
                </button>

            </div>
        </div>
    );
};

export default OrderCard;




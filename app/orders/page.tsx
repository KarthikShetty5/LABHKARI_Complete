'use client'
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import Orders from '@/Components/Orders';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Order {
    orderId: string;
    shipment_id: string;
    customer_name: string;
    current_status: string;
    shippingAddress: string;
}

const Page: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoggedIn(false);
                return;
            } else {
                setLoggedIn(true);
            }

            try {
                const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchorderid";
                const res = await axios.post<{ data: Order[] }>(url, { userId });
                const ordersData = res.data.data;

                setOrders(ordersData);
            } catch (e) {
                console.error(e);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar onSearch={() => { }} />
            {!loggedIn && (
                <div className="flex mt-32 md:mt-24 justify-center items-center mb-28">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to get your order details</h2>
                    </div>
                </div>
            )}
            {loggedIn && (
                <div className='mt-36 md:mt-24 mb-12 md:mb-28'>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.orderId} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Order ID: {order.orderId}</h2>
                                        <p className="text-gray-600">Shipment ID: {order.shipment_id}</p>
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Link href={'/under'}>More Details &rarr;</Link>
                                    </button>
                                </div>
                                <p className="mt-2 text-gray-600">Shipping Address: {order.shippingAddress}</p>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center mb-48 mt-32">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">You havent made any orders yet</h2>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </>
    );
};

export default Page;

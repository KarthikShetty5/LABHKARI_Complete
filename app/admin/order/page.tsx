'use client';
import React, { useEffect, useState } from 'react';
import OrderCard from '@/Components/OrCard';

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
}


const Page: React.FC = () => {
    const [order, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getorder";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setOrder(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">User Cards</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {order && order.map((ord) => (
                    <OrderCard key={ord.userId} order={ord} />
                ))}
            </div>
        </div>
    );
};

export default Page;

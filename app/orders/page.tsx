'use client'
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import Orders from '@/Components/Orders';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface Order {
    _id: string;
    orderId: string;
    email: string;
    name: string;
    phone: string;
    amount: number;
    amountPaid: boolean;
    productId:string;
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
    products:string[]
}

interface Product {
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

    productData:any
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



const Page: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [combinedData, setCombinedData] = useState<CombinedData[]>([]);


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
                const url2 = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproductid";

                const res = await axios.post<{ data: Order[] }>(url, { userId });
                const ordersData = res.data.data;

                setOrders(ordersData);

                const productPromises = ordersData.flatMap((order: Order) => {
                    const productIds = order.productId.split(',').map((id: string) => id.trim());
                    return productIds.map((productId: string) => {
                        const payload = { customId: productId };
                        return fetch(url2, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        }).then(productResponse => {
                            if (!productResponse.ok) {
                                // throw new Error(`Failed to fetch product for productId ${productId}`);
                                return productResponse.json().then((productData: Product) => ({
                                    order,
                                }));
                            }
                            return productResponse.json().then((productData: Product) => ({
                                order,
                                productData
                            }));
                        });
                    });
                });

                // Wait for all product fetch promises to complete
                const allProductData: any = await Promise.all(productPromises);

                // Combine product data with order data
                const combined = allProductData.map(({ order, productData }: { order: Order, productData: Product }) => ({
                    ...order,
                    productData
                }));

                console.log('prod data',combined)
                // Set the combin  ed data in the state
                setCombinedData(combined);
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
                    {combinedData.length > 0 ? (
                        combinedData.map((order) => (
                            <div key={order.orderId} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Order ID: {order.orderId}</h2>
                                        <p className="text-gray-600">Shipment ID: {order.shipment_id}</p>                                     
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Link href={`/viewOrder?orderId=${order.orderId}`}>
                                            More Details &rarr;
                                        </Link>                                   
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

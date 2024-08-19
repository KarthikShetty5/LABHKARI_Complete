'use client';
import React, { useEffect, useState } from 'react';
import OrderCard from '@/Components/OrCard';
import NavbarAdmin from '@/Components/NavbarAdmin';

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
    const [order, setOrder] = useState<Order[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [combinedData, setCombinedData] = useState<CombinedData[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getorder";
            const url2 = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproductid";

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrder(data.data);
                
                // const productPromises = data.data.flatMap((order: Order) => {
                //     const productIds = order.productId.split(',').map((id: string) => id.trim());
                //     return productIds.map((productId: string) => {
                //         const payload = { customId: productId };
                //         return fetch(url2, {
                //             method: 'POST',
                //             headers: { 'Content-Type': 'application/json' },
                //             body: JSON.stringify(payload),
                //         }).then(productResponse => {
                //             if (!productResponse.ok) {
                //                 // throw new Error(`Failed to fetch product for productId ${productId}`);
                //                 return productResponse.json().then((productData: Product) => ({
                //                     order,
                //                 }));
                //             }
                //             return productResponse.json().then((productData: Product) => ({
                //                 order,
                //                 productData
                //             }));
                //         });
                //     });
                // });

                // Wait for all product fetch promises to complete
                // const allProductData: any = await Promise.all(productPromises);

                // Combine product data with order data
                // const combined = allProductData.map(({ order, productData }: { order: Order, productData: Product }) => ({
                //     ...order,
                //     productData
                // }));

                // Set the combined data in the state
                setCombinedData(data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto px-4 py-8 md:mt-10 mt-28">
                <h1 className="text-3xl font-semibold mb-8 text-center">Order Cards</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {combinedData && combinedData.map((ord) => (
                        <OrderCard key={ord.userId} order={ord} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;

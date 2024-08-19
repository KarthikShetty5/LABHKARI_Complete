'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/Components/AdCard'; // Adjust the import path as per your project structure
import NavbarAdmin from '@/Components/NavbarAdmin';

interface Item {
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

const Page: React.FC = () => {
    const [products, setProducts] = useState<Item[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproduct";
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
                setProducts(data.data);
            } catch (error) {
                alert('Error fetching products:');
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto px-4 py-8 md:mt-8 mt-28">
                <h1 className="text-3xl font-semibold mb-8 text-center">Product List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.customId} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;

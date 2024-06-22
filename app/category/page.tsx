'use client'
import Card from '@/Components/Card';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Item {
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
    const [data, setData] = useState<Item[]>([]);
    const searchParams = useSearchParams();
    const cat = searchParams ? searchParams.get('cat') : null;

    useEffect(() => {
        const handler = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproductcat";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ category: cat })
                });
                const res = await response.json();
                setData(res.data);
            } catch (error) {
                toast.error("Error Occured", {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };
        if (cat) {
            handler();
        }
    }, [cat]);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <>
            <ToastContainer
                position='top-left'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar onSearch={() => { }} />
            <div className="container mx-auto px-4 py-8 mt-36 md:mt-0">
                {cat && (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto mb-8 p-6 text-center md:mt-6">
                        <h1 className="text-2xl font-bold">
                            {data && data.length > 0 ? `Showing ${data.length} ${capitalizeFirstLetter(cat)} Items` : `Sorry, there are no ${capitalizeFirstLetter(cat)} items found`}
                        </h1>
                    </div>
                )}
                {data && data.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.map((item) => (
                            <Card
                                key={item.customId}
                                customId={item.customId}
                                title={item.title}
                                description={item.desc}
                                price={item.price}
                                image={item.image}
                                rating={item.ratings}
                                tag={item.tag}
                                path={item.path}
                                gst={item.gst}
                                weight={item.weight}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

const PageWrapper: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);

export default PageWrapper;

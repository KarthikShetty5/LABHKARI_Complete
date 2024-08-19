'use client'
import Card from '@/Components/Card';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

interface Item {
    desc: string;
    customId: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    prices: number[];
    ratings: number;
    tags: string[];
    path: string;
    weights: string[];
    gsts: string[];
    category: string;
    variations:string[];
}

const Page: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);
    const searchParams = useSearchParams();
    const cat = searchParams ? searchParams.get('cat') : null;
    const [loading, setLoading] = useState<boolean>(true); // Loader state

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
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
              alert("Error occurred");
              setLoading(false); // Set loading to false even if there is an error
            }
        };
        if (cat) {
            handler();
        }
    }, [cat]);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <p className="text-2xl font-bold">Loading the Category...</p>
          </div>
        );
      }

    return (
        <>
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
                                prices={item.prices}
                                image={item.image}
                                ratings={item.ratings}
                                tags={item.tags}
                                path={item.path}
                                gsts={item.gsts}
                                weights={item.weights}
                                variations={item.variations}
                                userId=''
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

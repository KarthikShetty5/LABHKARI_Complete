'use client';
import React, { useEffect, useState } from 'react';
import NetworkCard from '@/Components/NetCard';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';


interface Item {
    name: string;
    email: string;
    phone: number;
}

const Home = () => {

    const [network, setNetwork] = useState<Item[]>([]);

    useEffect(() => {
        const fetchNetwork = async () => {
            const uid = localStorage.getItem('userId');
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/useref";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: uid })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch Network');
                }
                const data = await response.json();
                setNetwork(data.data);
            } catch (error) {
                console.error('Error fetching Network:', error);
            }
        };

        fetchNetwork();
    }, []);
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="flex justify-center items-center min-h-screen bg-gray-200 mt-16">
                <NetworkCard connections={network} />
            </div>
            <Footer />
        </>
    );
};

export default Home;

'use client';
import React, { useEffect, useState } from 'react';
import NetworkCard from '@/Components/NetCard';


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
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <NetworkCard connections={network} />
        </div>
    );
};

export default Home;

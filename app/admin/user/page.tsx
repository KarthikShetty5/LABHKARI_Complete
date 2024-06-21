'use client';
import React, { useEffect, useState } from 'react';
import UserCard from '@/Components/UsCard'; // Adjust the import path as per your project structure
import Navbar from '@/Components/Navbar';

export interface User {
    userId: number;
    name: string;
    email: string;
    imageUrl: string;
}

const Page: React.FC = () => {
    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getuser";
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
                setUser(data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUser();
    }, []);

    return (

        <>
            <Navbar onSearch={function (query: string): void {
                throw new Error('Function not implemented.');
            }} />
            <div className="container mx-auto px-4 py-8 mt-28 md:mt-24">
                <h1 className="text-3xl font-semibold mb-8 text-center">User Cards</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user && user.map((use) => (
                        <UserCard key={use.userId} user={use} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;

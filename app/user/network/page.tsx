'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface Connection {
    userId: string;
    name: string;
    phone: string;
    status: 'Active' | 'Inactive';
    points: number;
    team: number;
    subConnections?: Connection[];
}

const NetworkCard = () => {
    const [network, setNetwork] = useState<Connection[]>([]);
    const [filteredNetwork, setFilteredNetwork] = useState<Connection[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState<null | boolean>(null);
    const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchNetwork = async (userId?: string) => {
        setLoading(true); // Show loader
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/useref";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: userId || localStorage.getItem('userId') })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch Network');
            }
            const data = await response.json();
            const networkData = await Promise.all(data.data.map(async (user: any) => {
                // Fetch wallet details
                const walletResponse = await fetch(process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getwalletdetails", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.userId })
                });
                const walletData = await walletResponse.json();

                // Fetch KYC status
                const kycResponse = await fetch(process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getkyc", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.userId })
                });
                const kycData = await kycResponse.json();
                const isKycDone = kycData.data ? kycData.data.kycDone : false;

                return {
                    ...user,
                    points: walletData.data ? walletData.data.points : 0,
                    status: isKycDone ? 'Active' : 'Inactive',
                };
            }));
            if (userId) {
                setSelectedConnection(networkData.find(user => user.userId === userId) || null);
            } else {
                setNetwork(networkData);
                setFilteredNetwork(networkData);
            }
        } catch (error) {
            console.error('Error fetching Network:', error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    useEffect(() => {
        fetchNetwork(); // Fetch the whole network initially
    }, []);

    useEffect(() => {
        filterNetwork();
    }, [searchTerm, filterActive]);

    const filterNetwork = () => {
        let filtered = network;

        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.userId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterActive !== null) {
            filtered = filtered.filter(user =>
                filterActive ? user.status === 'Active' : user.status === 'Inactive'
            );
        }

        setFilteredNetwork(filtered);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterActive(e.target.value === 'All' ? null : e.target.value === 'Active');
    };

    const handleCardClick = async (connection: Connection) => {
        await fetchNetwork(connection.userId); // Fetch the selected user's network
    };

    const renderConnections = (connections: Connection[], depth = 0) => {
        return (
            <div className={`space-y-8 ${depth === 0 ? 'mb-12' : 'ml-8'}`}>
                {connections.map((connection, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl shadow-lg border-4 cursor-pointer ${
                            connection.status === 'Inactive' ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'
                        }`}
                        onClick={() => handleCardClick(connection)}
                    >
                        <div className="mb-4">
                            <div className="text-2xl font-bold text-gray-900 truncate">{connection.name}</div>
                            <div className="text-md text-gray-500">{connection.phone}</div>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div>
                                    <p className="font-semibold">User ID: {connection.userId}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Status: {connection.status}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Points: {connection.points}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Team: {connection.team}</p>
                                </div>
                            </div>
                        </div>
                        {connection.subConnections && connection.subConnections.length > 0 && (
                            <div className="mt-8">
                                {renderConnections(connection.subConnections, depth + 1)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="container mx-auto p-4 mt-16">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Sponsor Card</h2>
                    <div className="bg-blue-100 p-4 rounded shadow-md">
                        {/* Placeholder for Sponsor Card details */}
                        <p>Sponsor details here...</p>
                    </div>
                </div>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search by Name or User ID"
                        className="border p-2 flex-grow"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select className="border p-2 ml-2" onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                        <div className="w-full text-center py-8">
                            <p className="text-xl font-semibold">Loading all network details...</p>
                        </div>
                    ) : (
                        filteredNetwork.map((item, index) => (
                            <div key={index}>
                                {renderConnections([item])}
                            </div>
                        ))
                    )}
                </div>
                {selectedConnection && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto shadow-lg relative overflow-y-auto max-h-screen">
                            <button
                                className="absolute top-2 right-2 text-gray-700 text-2xl"
                                onClick={() => setSelectedConnection(null)}
                            >
                                &times;
                            </button>
                            <h3 className="text-2xl font-bold mb-4">Details for {selectedConnection.name}</h3>
                            <div className="text-gray-700 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    <div>
                                        <p className="font-semibold">User ID: {selectedConnection.userId}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Status: {selectedConnection.status}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Points: {selectedConnection.points}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Team: {selectedConnection.team}</p>
                                    </div>
                                </div>
                            </div>
                            {selectedConnection.subConnections && selectedConnection.subConnections.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-bold mb-4">Network of {selectedConnection.name}</h4>
                                    {loading ? (
                                        <div className="w-full text-center py-8">
                                            <p className="text-xl font-semibold">Loading...</p>
                                        </div>
                                    ) : (
                                        renderConnections(selectedConnection.subConnections)
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default NetworkCard;

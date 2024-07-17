'use client';
import React, { useState } from 'react';
import NavbarAdmin from '@/Components/NavbarAdmin';

const PurchasePage: React.FC = () => {
    const [batchId, setBatchId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchaseCost, setPurchaseCost] = useState('');
    const [gst, setGst] = useState('');
    const [totalCost, setTotalCost] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/admin/addpurchase";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    batchId,
                    purchaseDate,
                    quantity: parseInt(quantity),
                    purchaseCost: parseFloat(purchaseCost),
                    gst: parseFloat(gst),
                    totalCost: parseFloat(totalCost),
                }),
            });

            if (response.ok) {
                alert("Purchase successfully added");
                // Optionally, reset form fields
                setBatchId('');
                setPurchaseDate('');
                setQuantity('');
                setPurchaseCost('');
                setGst('');
                setTotalCost('');
            } else {
                alert("Failed to add purchase");
            }
        } catch (error) {
            alert("Error adding purchase");
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Purchase</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Batch ID:</label>
                            <input
                                type="text"
                                value={batchId}
                                onChange={(e) => setBatchId(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter batch ID"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Purchase Date:</label>
                            <input
                                type="date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter quantity"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Purchase Cost:</label>
                            <input
                                type="text"
                                value={purchaseCost}
                                onChange={(e) => setPurchaseCost(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter purchase cost"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">GST:</label>
                            <input
                                type="text"
                                value={gst}
                                onChange={(e) => setGst(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter GST percentage"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Total Cost:</label>
                            <input
                                type="text"
                                value={totalCost}
                                onChange={(e) => setTotalCost(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter total cost"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PurchasePage;

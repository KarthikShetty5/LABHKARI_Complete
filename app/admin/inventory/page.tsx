'use client';
import React, { useState } from 'react';
import NavbarAdmin from '@/Components/NavbarAdmin';

interface InventoryForm {
    productId: string;
    variation: string;
    batchId: string;
    openingQty: number;
    inQty: number;
    outQty: number;
}

const InventoryPage: React.FC = () => {
    const [formData, setFormData] = useState<InventoryForm>({
        productId: '',
        variation: '',
        batchId: '',
        openingQty: 0,
        inQty: 0,
        outQty: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addinventory";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Inventory added successfully");
                setFormData({
                    productId: '',
                    variation: '',
                    batchId: '',
                    openingQty: 0,
                    inQty: 0,
                    outQty: 0,
                });
            } else {
                alert("Failed to add inventory");
            }
        } catch (error) {
            alert("Error adding inventory");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Inventory</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Product ID:</label>
                            <input
                                type="text"
                                name="productId"
                                value={formData.productId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Product ID"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Variation:</label>
                            <input
                                type="text"
                                name="variation"
                                value={formData.variation}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Variation"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Batch ID:</label>
                            <input
                                type="text"
                                name="batchId"
                                value={formData.batchId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Batch ID"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Opening Quantity:</label>
                            <input
                                type="number"
                                name="openingQty"
                                value={formData.openingQty}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Opening Quantity"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">In Quantity:</label>
                            <input
                                type="number"
                                name="inQty"
                                value={formData.inQty}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter In Quantity"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Out Quantity:</label>
                            <input
                                type="number"
                                name="outQty"
                                value={formData.outQty}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Out Quantity"
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

export default InventoryPage;

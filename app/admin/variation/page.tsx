'use client';
import React, { useState } from 'react';
import NavbarAdmin from '@/Components/NavbarAdmin';

interface VariationForm {
    variation: string;
    weight: number;
    length: number;
    breadth: number;
    height: number;
}

const VariationPage: React.FC = () => {
    const [formData, setFormData] = useState<VariationForm>({
        variation: '',
        weight: 0,
        length: 0,
        breadth: 0,
        height: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addvariation";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Variation details added successfully");
                setFormData({
                    variation: '',
                    weight: 0,
                    length: 0,
                    breadth: 0,
                    height: 0,
                });
            } else {
                alert("Failed to add variation details");
            }
        } catch (error) {
            alert("Error adding variation details");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'weight' || name === 'length' || name === 'breadth' || name === 'height' ? parseFloat(value) : value,
        });
    };

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Variation Details</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap gap-4 justify-center">
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
                            <label className="block mb-1 text-gray-600">Weight:</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Weight"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Length:</label>
                            <input
                                type="number"
                                name="length"
                                value={formData.length}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Length"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Breadth:</label>
                            <input
                                type="number"
                                name="breadth"
                                value={formData.breadth}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Breadth"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Height:</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Height"
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

export default VariationPage;

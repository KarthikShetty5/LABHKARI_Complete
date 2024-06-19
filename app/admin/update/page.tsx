'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';


const ProductEditPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams ? searchParams.get('pid') : null;

    const [product, setProduct] = useState({
        title: '',
        customId: 0,
        ratings: 0,
        image: '',
        price: 0,
        description: '',
        tag: '',
        gst: 0,
        weight: '',
        category: '',
    });

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproductid";
        axios.post(url, {
            customId: productId
        })
            .then((response) => {
                setProduct(response.data.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);

            });
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/updateproduct";
        axios.post(url, {
            title: product.title,
            customId: 11,
            ratings: product.ratings,
            image: product.image,
            price: product.price,
            description: product.description,
            tag: product.tag,
            gst: product.gst,
            weight: product.weight,
            category: product.category,
        })
            .then((response) => {
                alert('Product updated:');
                console.log(response)
            })
            .catch((error) => {
                alert('Error updating product:');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8 text-center">Edit Product</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product title"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Ratings:</label>
                            <input
                                type="number"
                                name="ratings"
                                value={product.ratings}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product ratings"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Image URLs:</label>
                            <input
                                type="text"
                                name="imageUrls"
                                value={product.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter image URLs"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product price"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Description:</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Tag:</label>
                            <input
                                type="text"
                                name="tag"
                                value={product.tag}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product tag"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">GST:</label>
                            <input
                                type="number"
                                name="gst"
                                value={product.gst}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product GST"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Weight:</label>
                            <input
                                type="text"
                                name="weight"
                                value={product.weight}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product weight"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product category"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;

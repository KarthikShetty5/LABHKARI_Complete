/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import NavbarAdmin from '@/Components/NavbarAdmin';
import React, { useEffect, useState } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';

const page: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ratings, setRatings] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const dropzoneOptions: DropzoneOptions = { accept: 'image/*' as unknown as DropzoneOptions['accept'] };


    useEffect(() => {
        const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
        if (!isAdmin) {
            window.location.href = '/'; // Redirect to home page
            return; // Prevent rendering the rest of the component
        }
    }, []);

    const handleImageDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addproduct";

        if (files.length === 0) {
            alert("Please select a file")
            return;
        }

        if (files.length > 2) {
            alert("Can't upload more than two files")
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("ratings", ratings);
            formData.append("category", category);
            files.forEach((file, index) => {
                formData.append(`s3Images`, file);
            });

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Product successfully added")
            } else {
                alert("Failed to add product")
            }
        } catch (error) {
            alert("Error adding Product")
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product title"
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product description"
                            ></textarea>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Ratings:</label>
                            <input
                                type="text"
                                value={ratings}
                                onChange={(e) => setRatings(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter product ratings"
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <label className="block mb-1 text-gray-600">Category:</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter Category of product"
                            />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                            <Dropzone onDrop={handleImageDrop} {...dropzoneOptions} maxFiles={2}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <p>Drag  drop some files here, or click to select files</p>
                                        <em>(2 files are the maximum number of files you can drop here)</em>
                                    </div>
                                )}
                            </Dropzone>
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

export default page;

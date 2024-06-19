'use client';
import Link from 'next/link';
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';


interface Item {
    desc: string
    customId: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
    ratings: number;
    tag: string;
    path: string;
    weight: string;
    gst: string;
    category: string;
}

interface ProductCardProps {
    product: Item;
}

const AdCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                <h2 className="ml-4 text-lg font-semibold">{product.title}</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button>
                    <Link href={{ pathname: '/admin/update', query: { pid: product.customId } }}>
                        <MdEdit className="text-blue-500 cursor-pointer" size={24} />
                    </Link>
                </button>
                <button>
                    <MdDelete className="text-red-500 cursor-pointer" size={24} />
                </button>
            </div>
        </div>
    );
};

export default AdCard;

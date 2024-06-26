import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineShareAlt, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '@/context/CartContext';


interface CardProps {
    customId: number;
    title: string;
    image: string | StaticImport;
    description: string;
    price: number;
    rating: number;
    tag: string;
    path: string;
    gst: string;
    weight: string;
}

const Card: React.FC<CardProps> = ({ customId, title, image, description, price, rating, tag, path, gst, weight }) => {
    const searchParams = useSearchParams();
    const ref = searchParams ? searchParams.get('ref') : null;
    const { addToCart } = useCart();
    const notifyError = () => toast("Failed to Add to Cart");
    const notifySuccess = () => toast("Added to Cart successfully!");



    const handleAddToCart = async (event: any) => {
        event.preventDefault();
        const item = {
            customId: customId,
            title: title,
            price: price,
            ref: ref ? ref : '',
            image: image,
            gst: gst,
            weight: weight,
            count: 1,
        };

        try {
            await addToCart(item);
            notifySuccess();
        } catch (error) {
            notifyError();
        }
    };

    const shareOnWhatsApp = (customId: number) => {
        const message = `Check out ${title} for ₹${price}. ${process.env.NEXT_PUBLIC_CLIENT_URL}/product?customId=${customId}&ref=${localStorage.getItem('userId')}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    };


    return (
        <>
            <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-xl overflow-hidden relative">
                <div className="relative" style={{ marginTop: "-1rem" }}>
                    <div>
                        <ToastContainer />
                    </div>
                    <Link href={{ pathname: '/product', query: { customId: customId } }}>
                        <div className="w-full h-[400px] relative">
                            <Image
                                src={image}
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-xl"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <p className="text-lg font-semibold">{title}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="p-4">
                    {/* Title */}
                    <div className="text-2xl font-bold mb-2">{title}</div>

                    {/* Price, Rating, Stock Status */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xl font-semibold text-gray-700">₹ {price}</div>
                        {/* <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                                {star <= rating ? (
                                    <FaStar className="text-yellow-400" />
                                ) : star - rating === 0.5 ? (
                                    <FaStarHalfAlt className="text-yellow-400" />
                                ) : (
                                    <FaRegStar className="text-gray-400" />
                                )}
                            </span>
                        ))}
                    </div> */}
                        <div className={`text-sm font-semibold ${tag === "IN" ? "text-green-500" : "text-red-500"}`}>
                            {tag === "IN" ? "In Stock" : "Out of Stock"}
                        </div>
                    </div>

                    {/* Share and Add to Cart Buttons */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => shareOnWhatsApp(customId)}
                            className="flex items-center text-[#103178] hover:text-white bg-white hover:bg-[#103178] transition duration-300 border border-[#103178] px-3 py-1 rounded-full shadow-md"
                        >
                            <AiOutlineShareAlt className="w-5 h-5 mr-1" />
                            <span className="inline font-semibold">Share</span>
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center text-white bg-[#103178] hover:bg-[#103178] transition duration-300 px-3 py-1 rounded-full shadow-md"
                        >
                            <AiOutlineShoppingCart className="w-5 h-5 mr-1" />
                            <span className="inline font-semibold">Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;

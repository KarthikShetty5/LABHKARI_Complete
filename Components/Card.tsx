import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineShareAlt, AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/context/CartContext';
import fetchcart from '@/pages/api/fetchcart';

interface CardProps {
    customId: number;
    title: string;
    image: string;
    description: string;
    userId: string;
    prices: number[];
    ratings: number;
    tags: string[];
    path: string;
    gsts: string[];
    weights: string[];
    variations: string[];
}

const Card: React.FC<CardProps> = ({ customId, title, image, description, prices, ratings, tags, path, gsts, weights, variations }) => {
    const searchParams = useSearchParams();
    const ref = searchParams ? searchParams.get('ref') : null;
    const { addToCart, fetchCart } = useCart();
    const [selectedVariation, setSelectedVariation] = useState(0);

    useEffect(() => {
        // This will log the first price as default when the component is mounted
        console.log(prices[selectedVariation]);
    }, [selectedVariation]);

    const handleVariationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVariation(parseInt(event.target.value));
    };

    const handleAddToCart = async (event: any) => {
        event.preventDefault();
        const item = {
            customId: customId,
            title: title,
            price: prices[selectedVariation],
            ref: ref ? ref : '',
            image: image,
            gst: gsts[selectedVariation],
            weight: weights[selectedVariation],
            count: 1,
            variation: variations[selectedVariation],
            userId: localStorage.getItem('userId') || " "
        };

        try {
            await addToCart(item);
            await fetchCart();
            alert("Added to Cart successfully!");
        } catch (error) {
            alert("Failed to Add to Cart");
        }
    };

    const shareOnWhatsApp = (customId: number) => {
        const message = `Check out ${title} for ₹${prices[selectedVariation]}. ${process.env.NEXT_PUBLIC_CLIENT_URL}/product?customId=${customId}&ref=${localStorage.getItem('userId')}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    };

    const shareViaWebShareAPI = (customId: number) => {
        if (navigator.share) {
          navigator.share({
            title: title,
            text: `Check out ${title} for ₹${prices[selectedVariation]}.`,
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/product?customId=${customId}&ref=${localStorage.getItem('userId')}`,
          }).then(() => {
            console.log('Thanks for sharing!');
          }).catch((error) => {
            console.log('Error sharing:', error);
          });
        } else {
          shareOnWhatsApp(customId); // Fallback to WhatsApp if Web Share API is not supported
        }
      };

    return (
        <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-xl overflow-hidden relative">
            <div className="relative" style={{ marginTop: "-1rem" }}>
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
                <div className="text-2xl font-bold mb-2">{title}</div>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-semibold text-gray-700">₹ {prices[selectedVariation]}</div>
                    <div className={`text-sm font-semibold ${tags[0] === "IN" ? "text-green-500" : "text-red-500"}`}>
                        {tags[0] === "IN" ? "In Stock" : "Out of Stock"}
                    </div>
                </div>

                <div className="text-xl font-semibold text-gray-600 mb-2">
                    {/* Variation:  */}
                    <select onChange={handleVariationChange} className="ml-2 border border-gray-300 rounded-md">
                        {variations.map((variation, index) => (
                            <option key={index} value={index}>{variation}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => shareViaWebShareAPI(customId)}
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
    );
}

export default Card;

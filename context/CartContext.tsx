'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface CartContextProps {
    cartCount: number;
    setCartCount: (count: number) => void;
    addToCart: (item: any) => Promise<void>;
    updateQuantity: (customId: number, newQuantity: number) => Promise<void>;
    incrementOrDecrementQuantity: (customId: number, amount: number) => void;
    removeFromCart: (itemId: string) => Promise<void>;
    handleDelete: (customId: number) => Promise<void>;
}


interface CartItem {
    customId: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
    weight: string;
    gst: string;
}

interface CartContextState {
    actCost: number;
    gst: number;
    shipCost: number;
    cartAmount: number;
    cartItems: CartItem[];
    count: number;
    addToCart: (item: CartItem) => Promise<void>;
    fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextState | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [actCost, setActCost] = useState(0);
    const [gst, setGst] = useState(0);
    const [shipCost, setShipCost] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);

    const fetchCart = async () => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchcart";
        const uid = localStorage.getItem('userId');
        if (!uid) return;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: uid }),
            });
            const res = await response.json();
            const totals = res.data.reduce((acc: { totalCount: number, totalShipCost: number, totalGst: number, totalActualCost: number }, item: { price: number, count: number, gst: string, weight: string }) => {
                const weightInGrams = parseFloat(item.weight);
                const weightInKg = isNaN(weightInGrams) ? 0 : weightInGrams / 1000;
                const shipCost = weightInKg * 60;
                const gstPercentMatch = item.gst;
                const gstPercent = gstPercentMatch ? parseFloat(gstPercentMatch) : 0;
                const price = parseFloat(item.price.toString());
                const priceExcludingGST = price / (1 + (gstPercent / 100));
                const gstAmount = price - priceExcludingGST;
                const itemTotalExcludingGST = priceExcludingGST * item.count;
                const itemTotalGST = gstAmount * item.count;
                const itemTotalShipCost = shipCost * item.count;
                const itemTotal = itemTotalExcludingGST + itemTotalGST + itemTotalShipCost;
                acc.totalCount += itemTotal;
                acc.totalShipCost += itemTotalShipCost;
                acc.totalGst += itemTotalGST;
                acc.totalActualCost += itemTotalExcludingGST;
                return acc;
            }, { totalCount: 0, totalShipCost: 0, totalGst: 0, totalActualCost: 0 });

            setActCost(totals.totalActualCost);
            setGst(totals.totalGst);
            setShipCost(totals.totalShipCost);
            setCartAmount(totals.totalCount);
            setCartItems(res.data);
            setCount(res.data.length);
            setDone(true);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const addToCart = async (item: any) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addcart";
        const uid = localStorage.getItem('userId') || '12345';
        localStorage.setItem('userId', uid);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...item, userId: uid }),
            });
            const res = await response.json();
            if (res.success) {
                // setCartCount((prevCount) => {
                //     const newCount = prevCount + res.count;
                //     updateLocalStorage(newCount);
                //     return newCount;
                // });
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };



    return (
        <CartContext.Provider value={{ actCost, gst, shipCost, cartAmount, cartItems, count, addToCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};


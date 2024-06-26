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

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        // Initialize cart count from local storage or server
        const initCartCount = async () => {
            // Fetch initial cart count from local storage or server
            const storedCount = parseInt(localStorage.getItem('cartCount') || '0', 10);
            setCartCount(storedCount);
        };
        initCartCount();
    }, []);

    const updateLocalStorage = (count: number) => {
        localStorage.setItem('cartCount', count.toString());
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
                setCartCount((prevCount) => {
                    const newCount = prevCount + 1;
                    updateLocalStorage(newCount);
                    return newCount;
                });
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const updateQuantity = async (customId: number, newQuantity: number) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addcart";
        const uid = localStorage.getItem('userId') || '12345';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customId, userId: uid, count: newQuantity }),
            });
            const res = await response.json();
            if (res.success) {
                // Optionally update cart count if it reflects quantity
                // setCartCount(res.newCartCount);
            }
        } catch (e) {
            toast.error("Error Occured", {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const incrementOrDecrementQuantity = (customId: number, amount: number) => {
        const newQuantity = amount;
        updateQuantity(customId, newQuantity);
    };

    const handleDelete = async (customId: number) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/deletecart";
        const uid = localStorage.getItem('userId') || '12345';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, customId }),
            });
            const res = await response.json();
            if (res.success) {
                setCartCount((prevCount) => {
                    const newCount = Math.max(prevCount - 1, 0);
                    updateLocalStorage(newCount);
                    return newCount;
                });
            }
        } catch (e) {
            toast.error("Error Occured", {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const removeFromCart = async (itemId: string) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/removecart";
        const uid = localStorage.getItem('userId') || '12345';

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, userId: uid }),
            });
            const res = await response.json();
            if (res.success) {
                setCartCount((prevCount) => {
                    const newCount = Math.max(prevCount - 1, 0);
                    updateLocalStorage(newCount);
                    return newCount;
                });
            } else {
                throw new Error('Failed to remove from cart');
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, addToCart, updateQuantity, incrementOrDecrementQuantity, removeFromCart, handleDelete }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

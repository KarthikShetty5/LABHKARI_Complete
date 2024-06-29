'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import test from '../../../assets/test.png';
import Link from 'next/link';
import logo2 from '../../../assets/logo2.png';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface User {
    _id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
}

interface Order {
    id: string;
    name: string;
    city: string;
    amount: string;
    itemCount: number;
}

const Page = () => {
    const [transaction, seTransaction] = useState<User[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [tlength, setTLength] = useState(0);
    const [olength, setOLength] = useState(0);

    const balances = [
        { currency: 'BFIC', amount: '0.04', price: '$4.45' },
        { currency: 'BLV', amount: '0.67', price: '$0.50' },
        { currency: 'USDB', amount: '0.00', price: 'N/A' },
    ];

    const transactions = [
        { id: '1', date: '20 June 2024', description: 'Netflix Subscription', amount: '-$15.00' },
        { id: '2', date: '19 June 2024', description: 'Salary Deposit', amount: '+$2000.00' },
        { id: '3', date: '18 June 2024', description: 'Grocery Shopping', amount: '-$85.50' },
        { id: '4', date: '17 June 2024', description: 'Gas Bill Payment', amount: '-$50.00' },
        { id: '5', date: '16 June 2024', description: 'Restaurant Dinner', amount: '-$30.00' },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/useref";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: '39301' })
                });
                const res = await response.json();
                seTransaction(res.data);
                setTLength(res.data.length)
                const orderPromises = res.data.map(async (user: User) => {
                    const orderUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchorderid";
                    const orderResponse = await fetch(orderUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.userId })
                    });
                    const orderRes = await orderResponse.json();
                    return orderRes.data;
                });
                const ordersArray = await Promise.all(orderPromises);
                setOrders(ordersArray.flat());
                setOLength(ordersArray.flat().length)
            } catch (error) {
                alert("Error occurred");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            {/* <header className="bg-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md">
                <Link href="/">
                    <span className="relative flex items-center overflow-hidden">
                        <Image src={logo2} width={120} height={120} alt='logo' />
                    </span>
                </Link>
                <div className="text-black text-lg font-bold">Dashboard</div>
                <div className="flex items-center">
                    <button className="bg-[#103178] text-white px-3 py-1 rounded-md shadow-sm font-medium">Export CSV</button>
                </div>
            </header> */}
            <Navbar onSearch={() => { }} />
            <div className="pt-20 px-4 md:mt-2 mt-36">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="text-lg font-bold">Wallet</div>
                        <div className="mt-2">
                            {/* {balances.map((balance, index) => (
                                <div key={index} className="flex justify-between items-center py-2">
                                    <div>{balance.currency}</div>
                                    <div className="font-medium">{balance.amount}</div>
                                    <div className="text-gray-500">{balance.price}</div>
                                </div>
                            ))} */}
                            <span className='text-3xl text-black'>00.00</span>
                            <Link href={'/user/wallet'}>
                                <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="10"
                                            refX="8" refY="5" orient="auto">
                                            <polygon points="0 0, 10 5, 0 10" fill="black" />
                                        </marker>
                                    </defs>
                                    <line x1="10" y1="50" x2="90" y2="50"
                                        stroke="black" stroke-width="2"
                                        marker-end="url(#arrowhead)" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
                        <div className="text-lg font-bold">Network</div>
                        <div className="mt-2">
                            {/* {transaction.length > 0 ? (
                                transaction.map((trans) => (
                                    <div key={trans._id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <div>
                                            <div className="text-gray-800 font-medium">{trans.name}</div>
                                            <div className="text-gray-500 text-sm">{trans.email}</div>
                                            <div className="text-gray-500 text-sm">{trans.phone}</div>
                                        </div>
                                        <div className={`font-medium ${trans.userId ? 'text-red-500' : 'text-green-500'}`}>{trans.userId}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500">
                                    You dont have any network
                                    <span className="ml-4"><Link href={'/refer'} className="underline">Refer and Earn</Link></span>
                                </div>
                            )} */}
                            <span className='text-3xl text-black'>{tlength}</span>
                            <Link href={'/user/network'}>
                                <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="10"
                                            refX="8" refY="5" orient="auto">
                                            <polygon points="0 0, 10 5, 0 10" fill="black" />
                                        </marker>
                                    </defs>
                                    <line x1="10" y1="50" x2="90" y2="50"
                                        stroke="black" stroke-width="2"
                                        marker-end="url(#arrowhead)" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
                        <div className="text-lg font-bold">Orders</div>
                        <div className="mt-2">
                            {/* {orders.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <div>
                                            <div className="text-gray-800 font-medium">{order.name}</div>
                                            <div className="text-gray-800 font-medium">{order.city}</div>
                                            <div className="text-gray-500 text-sm">{order.itemCount}</div>
                                        </div>
                                        <div className={`font-medium ${order.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{order.amount}</div>
                                    </div>
                                ))) : (
                                <div className="text-center text-gray-500">
                                    You dont have any network related Orders
                                    <span className="ml-4"><Link href={'/refer'} className="underline">Refer and Earn</Link></span>
                                </div>
                            )} */}
                            <span className='text-3xl text-black'>{olength}</span>
                            <Link href={'/under'}>
                                <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="10"
                                            refX="8" refY="5" orient="auto">
                                            <polygon points="0 0, 10 5, 0 10" fill="black" />
                                        </marker>
                                    </defs>
                                    <line x1="10" y1="50" x2="90" y2="50"
                                        stroke="black" stroke-width="2"
                                        marker-end="url(#arrowhead)" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-48'></div>
            <Footer />
        </div>
    );
}

export default Page;

'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import test from '../../../assets/test.png';
import Image from 'next/image';
import Link from 'next/link';

interface User {
    name: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    birthdate: string;
    gender: string;
    language: string;
    timezone: string;
}

interface Order {
    amount: number;
    amountPaid: boolean;
    city: string;
    country: string;
    email: string;
    itemCount: number;
    landmark: string;
    name: string;
    orderId: string;
    phone: string;
    pinCode: string;
    shippingAddress: string;
    state: string;
    tag: string;
    userId: string;
    __v: number;
    _id: string;
}

const ProfilePage = () => {
    const [userId, setUserId] = useState<string | null>();

    useEffect(() => {
        const uid = localStorage.getItem('userId'); // Replace with actual userId
        setUserId(uid);
    }, [])

    // State to store user data
    const [user, setUser] = useState<User>({
        name: '',
        fullName: '',
        email: '',
        phone: '',
        avatar: '',
        birthdate: '',
        gender: '',
        language: '',
        timezone: '',
    });

    // State to store order data
    const [order, setOrder] = useState<Order | null>(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('/api/getuserid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            setUser(data.data);
        };

        fetchUserData();
    }, [userId]);

    // Fetch orders for the user to get shipping address and other details
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/fetchorderid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            if (data.data.length > 0) {
                setOrder(data.data[0]);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className="min-h-screen mt-36 md:mt-28">
            <Navbar onSearch={(query: string) => { throw new Error('Function not implemented.'); }} />

            <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Card */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <Image width={50} height={50} className="h-12 w-12 rounded-full object-cover mr-4" src={test} alt={`${user.name}'s avatar`} />
                                <div className="ml-2">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">{user.fullName}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{user.name}</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.birthdate}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.gender}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Language</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.language}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{user.timezone}</dd>
                                    </div>
                                </dl>
                                <div>
                                    <div className="sm:col-span-1">
                                        <button className='mt-6'><Link href={'/forgot'}>Click to Change Password</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Card */}
                {order && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Shipping address</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <div className="bg-white px-4 py-5 sm:px-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.name}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.phone}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">City</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.city}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">State</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.state}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Country</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.country}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Pin Code</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.pinCode}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Landmark</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{order.landmark}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mb-48'></div>
            <Footer />
        </div>
    );
};

export default ProfilePage;

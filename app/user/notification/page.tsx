'use client';
import React, { useState } from 'react';
import Navbar from '@/Components/Navbar'; // Replace with your Navbar component path
import Footer from '@/Components/Footer'; // Replace with your Footer component path
import { MdNotificationsNone } from 'react-icons/md'; // Import notification icon

const NotificationPage = () => {
    // Dummy notification data (replace with actual notifications from your backend)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'New message received',
            message: 'You have received a new message from a friend.',
            timestamp: '2024-06-18T14:30:00Z',
            read: false,
        },
        {
            id: 2,
            title: 'New order placed',
            message: 'Order #12345 has been placed successfully.',
            timestamp: '2024-06-17T10:15:00Z',
            read: true,
        },
        {
            id: 3,
            title: 'Item shipped',
            message: 'Your item has been shipped and is on its way to your address.',
            timestamp: '2024-06-16T09:45:00Z',
            read: true,
        },
    ]);

    // Mark notification as read
    const markAsRead = (id: number) => {
        const updatedNotifications = notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    // Delete notification
    const deleteNotification = (id: number) => {
        const updatedNotifications = notifications.filter((notification) => notification.id !== id);
        setNotifications(updatedNotifications);
    };

    return (
        <div className=" mt-20">
            <Navbar onSearch={function (query: string): void {
                throw new Error('Function not implemented.');
            }} />

            <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-32">
                <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                                <li key={notification.id}>
                                    <div className={`px-4 py-4 sm:px-6 ${notification.read ? 'bg-gray-100' : 'bg-white'}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-shrink-0">
                                                <MdNotificationsNone className={`h-8 w-8 ${notification.read ? 'text-gray-400' : 'text-blue-500'}`} />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                                                <p className="mt-2 text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {notifications.length === 0 && (
                                <li>
                                    <div className="px-4 py-4 sm:px-6 bg-white">
                                        <p className="text-sm text-gray-500">No notifications to display.</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotificationPage;

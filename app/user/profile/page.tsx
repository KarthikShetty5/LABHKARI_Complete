'use client';
import React, { useState } from 'react';
import Navbar from '@/Components/Navbar'; // Replace with your Navbar component path
import Footer from '@/Components/Footer'; // Replace with your Footer component path
import { AiOutlineLock, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai'; // Import icons for password, user details, email, phone, and home

// Define User interface
interface User {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    birthdate: string;
    gender: string;
    language: string;
    timezone: string;
}

// Define EditMode interface
interface EditMode {
    fullName: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    birthdate: boolean;
    gender: boolean;
    language: boolean;
    timezone: boolean;
}

const ProfilePage = () => {
    // Mock user data (replace with actual data from your backend)
    const [user, setUser] = useState<User>({
        username: 'JohnDoe',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St, Springfield, IL',
        avatar: '/avatar.jpg', // Replace with actual path to user avatar
        birthdate: '1990-01-01',
        gender: 'Male',
        language: 'English',
        timezone: 'UTC+0',
    });

    // State to track edit mode for each field
    const [editMode, setEditMode] = useState<EditMode>({
        fullName: false,
        email: false,
        phone: false,
        address: false,
        birthdate: false,
        gender: false,
        language: false,
        timezone: false,
    });

    // Handle input change for editable fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: keyof User) => {
        setUser({ ...user, [field]: e.target.value });
    };

    // Handle saving edited field
    const handleSaveField = (field: keyof EditMode) => {
        setEditMode({ ...editMode, [field]: false });
        // Here you can add logic to save the updated field to your backend
        console.log(`Saved ${field}: ${user[field]}`);
    };

    // Toggle edit mode for a field
    const toggleEditMode = (field: keyof EditMode) => {
        setEditMode({ ...editMode, [field]: !editMode[field] });
    };

    return (
        <div className="bg-gray-100 min-h-screen mt-20">
            <Navbar onSearch={(query: string): void => { throw new Error('Function not implemented.'); }} />

            <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-8">
                {/* Profile Card */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        {/* Profile Card Content */}
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <div className="flex items-center">
                                <img className="h-12 w-12 rounded-full object-cover mr-4" src={user.avatar} alt={`${user.username}'s avatar`} />
                                <div className="ml-2">
                                    {editMode.fullName ? (
                                        <input
                                            type="text"
                                            className="text-lg font-medium leading-6 text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                            value={user.fullName}
                                            onChange={(e) => handleInputChange(e, 'fullName')}
                                        />
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">{user.fullName}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{user.username}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                        <dd className="mt-1">
                                            {editMode.email ? (
                                                <input
                                                    type="email"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.email}
                                                    onChange={(e) => handleInputChange(e, 'email')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.email}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                        <dd className="mt-1">
                                            {editMode.phone ? (
                                                <input
                                                    type="tel"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.phone}
                                                    onChange={(e) => handleInputChange(e, 'phone')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.phone}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                                        <dd className="mt-1">
                                            {editMode.address ? (
                                                <input
                                                    type="text"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.address}
                                                    onChange={(e) => handleInputChange(e, 'address')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.address}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                                        <dd className="mt-1">
                                            {editMode.birthdate ? (
                                                <input
                                                    type="date"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.birthdate}
                                                    onChange={(e) => handleInputChange(e, 'birthdate')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.birthdate}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                        <dd className="mt-1">
                                            {editMode.gender ? (
                                                <select
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.gender}
                                                    onChange={(e) => handleInputChange(e, 'gender')}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.gender}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Language</dt>
                                        <dd className="mt-1">
                                            {editMode.language ? (
                                                <input
                                                    type="text"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.language}
                                                    onChange={(e) => handleInputChange(e, 'language')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.language}</p>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                                        <dd className="mt-1">
                                            {editMode.timezone ? (
                                                <input
                                                    type="text"
                                                    className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none"
                                                    value={user.timezone}
                                                    onChange={(e) => handleInputChange(e, 'timezone')}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-900">{user.timezone}</p>
                                            )}
                                        </dd>
                                    </div>
                                    {/* Add more fields as needed */}
                                </dl>
                            </div>
                        </div>
                        {/* End of Profile Card Content */}

                        {/* Action Buttons */}
                        <div className="px-4 py-4 sm:px-6 flex justify-end">
                            {editMode.fullName || editMode.email || editMode.phone || editMode.address || editMode.birthdate || editMode.gender || editMode.language || editMode.timezone ? (
                                <>
                                    <button
                                        onClick={() => {
                                            Object.keys(editMode).forEach((field) => {
                                                if (editMode[field as keyof EditMode]) {
                                                    handleSaveField(field as keyof EditMode);
                                                }
                                            });
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            Object.keys(editMode).forEach((field) => {
                                                if (editMode[field as keyof EditMode]) {
                                                    toggleEditMode(field as keyof EditMode);
                                                }
                                            });
                                        }}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            Object.keys(editMode).forEach((field) => {
                                                toggleEditMode(field as keyof EditMode);
                                            });
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                        {/* End of Action Buttons */}
                    </div>
                </div>
                {/* End of Profile Card */}

                {/* Contact Card */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        {/* Contact Card Content */}
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1">{user.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                    <dd className="mt-1">{user.phone}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1">{user.address}</dd>
                                </div>
                                {/* Add more fields as needed */}
                            </dl>
                        </div>
                        {/* End of Contact Card Content */}
                    </div>
                </div>

                {/* Personal Details Card */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        {/* Personal Details Card Content */}
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                                    <dd className="mt-1">{user.birthdate}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                    <dd className="mt-1">{user.gender}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Language</dt>
                                    <dd className="mt-1">{user.language}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                                    <dd className="mt-1">{user.timezone}</dd>
                                </div>
                                {/* Add more fields as needed */}
                            </dl>
                        </div>
                        {/* End of Personal Details Card Content */}
                    </div>
                </div>
                {/* End of Personal Details Card */}

                {/* Preferences Card */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        {/* Preferences Card Content */}
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                {/* Add preference fields */}
                            </dl>
                        </div>
                    </div>
                </div>
                {/* End of Preferences Card */}
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;

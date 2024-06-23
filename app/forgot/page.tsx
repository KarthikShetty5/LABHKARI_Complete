'use client';
import Link from 'next/link';
import React, { useEffect, useState, ChangeEvent, FormEvent, Suspense } from 'react';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Forgot: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams ? searchParams.get('token') : null;
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpassword, setCpassword] = useState<string>('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/');
        }
    }, [router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'cpassword') {
            setCpassword(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const sendResetEmail = async (e: FormEvent) => {
        e.preventDefault();
        const data = { email, sendMail: true };

        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/forgot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        if (res.success) {
            toast.success('Password reset link sent to your email', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setEmail("");
        } else {
            toast.error('User doesn\'t exist!', {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const resetPassword = async (e: FormEvent) => {
        e.preventDefault();
        if (password === cpassword) {
            const data = { password, cpassword, sendMail: false, token: token };
            const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            if (res.success) {
                toast.success('Password has been changed', {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Error occurred! Please try again!!!', {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar onSearch={() => { }} />
            <div className="flex lg:min-h-screen items-start justify-center pt-28 px-4 sm:px-6 lg:px-8 mt-14 md:mb-0 mb-28">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Image
                            className="mx-auto h-16 w-auto"
                            src={'https://labhkari.s3.ap-south-1.amazonaws.com/logo2.png'}
                            alt="Your Company"
                            width={200}
                            height={200}
                            layout="intrinsic"
                        />
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mt-16">Forgot Password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href={'/login'} className="font-medium text-[#103178] hover:text-[#103178]"> Login</Link>
                        </p>
                    </div>
                    {/* If token exists, show fields to enter new password */}
                    {token && (
                        <div className='mt-14'>
                            <form className="mt-8 space-y-6" onSubmit={resetPassword}>
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div>
                                        <label htmlFor="password" className="sr-only">New Password</label>
                                        <input
                                            value={password}
                                            onChange={handleChange}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#103178] focus:outline-none focus:ring-[#103178] sm:text-sm"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
                                        <input
                                            value={cpassword}
                                            onChange={handleChange}
                                            id="cpassword"
                                            name="cpassword"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#103178] focus:outline-none focus:ring-[#103178] sm:text-sm"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#103178] py-2 px-4 text-sm font-medium text-white hover:bg-[#103178] focus:outline-none focus:ring-2 focus:ring-[#103178] focus:ring-offset-2"
                                    >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-[#103178] group-hover:text-[#103178]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Continue
                                    </button>
                                </div>
                                {password !== cpassword && <span className='text-red-600'>Passwords dont match</span>}
                                {password && password === cpassword && <span className='text-green-600'>Passwords matched</span>}
                            </form>
                        </div>
                    )}
                    {/* If token does not exist, show email input to send reset link */}
                    {!token && (
                        <form className="mt-8 space-y-6" onSubmit={sendResetEmail}>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        value={email}
                                        onChange={handleChange}
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#103178] focus:outline-none focus:ring-[#103178] sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#103178] py-2 px-4 text-sm font-medium text-white hover:bg-[#103178] focus:outline-none focus:ring-2 focus:ring-[#103178] focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-[#103178] group-hover:text-[#103178]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};


const Page: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Forgot />
        </Suspense>
    );
};

export default Page;

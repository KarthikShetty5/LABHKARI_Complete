'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaGift, FaRegHeart, FaSearch, FaShareAlt, FaSuitcase, FaThList, FaTimes, FaWallet } from "react-icons/fa";
import { MdCleanHands, MdOutlineShoppingBag } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import Image from 'next/image';
import { FaInfoCircle, FaHeartbeat, FaSpa, FaUtensils, FaSeedling, FaHome as FaHomeIcon, FaPaw, FaEllipsisH, FaUserCircle, FaUser, FaWhatsapp, FaBell, FaThumbsUp, FaTruck } from 'react-icons/fa';
import Logo2 from '../assets/logo2.png'
import axios from 'axios';
import { BiSolidNetworkChart } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { IoMdLogOut } from 'react-icons/io';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface Item {
    id: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
}

interface NavbarProps {
    onSearch: (query: string) => void;
}


const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [semail, setSEmail] = useState<string>();
    const [spassword, setSPassword] = useState<string>();
    const [arr, setArr] = useState<Item[]>([]);
    const [done, setDone] = useState<boolean>(false);
    const [admin, setAdmin] = useState(false);
    const [cartAmount, setCartAmount] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [useId, setUseId] = useState('');
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isPhone, setIsPhone] = useState(false);
    const { count, fetchCart } = useCart();



    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSearch(searchQuery);
        setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(prevState => !prevState);
    };

    const toggleCart = (): void => {
        setIsCartOpen(!isCartOpen);
    };

    const toggleModal = (): void => {
        setModalOpen(!modalOpen);
        setShowSignIn(false);
    };

    const handleSignUpClick = (): void => {
        setModalOpen(true);
        setShowSignIn(false);
    };

    const handleSignInClick = (): void => {
        setModalOpen(true);
        setShowSignIn(true);
    };


    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = (): void => {
        setIsSidebarOpen(false);
    };


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    const toggleDropMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    function shareOnWhatsApp() {
        if (!localStorage.getItem('userId')) {
            alert("Please login to share")
        } else {
            const message = `${process.env.NEXT_PUBLIC_CLIENT_URL}?ref=${localStorage.getItem('userId')}`;
            const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId && storedUserId !== '12345') {
                setUseId(storedUserId);
            }
        }
    }, []);

    const handleUserId = async (userId: string) => {
        const cartUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/updatecart";
        try {
            const response = await axios.post(cartUrl, {
                oldUid: localStorage.getItem('userId') || '12345',
                newUid: userId
            })
        } catch (error) {
            alert("Error updating userId in Cart")
        }
    }

    function generateRandomEmail() {
        const emailDomain = 'gmail.com';
        const emailPrefix = 'user';
        const randomNum = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
        const randomEmail = `${emailPrefix}${randomNum}@${emailDomain}`;
        return randomEmail;
    }

    const handleSignIn = async (event: any) => {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/register";

        // Validate email format
        // if (!email?.endsWith('@gmail.com')) {
        //     alert("Please enter a valid Gmail address")
        //     return;
        // }

        // // Validate other fields
        // if (!username || !email || !phone || !password) {
        //     alert("All fields are required")
        //     return;
        // }

        // if (!/^\d{10}$/.test(email)) {
        //     alert("Please enter a valid 10 digits mobile number")
        //     return;
        // }

        try {
            const response = await axios.post(url, {
                name: username,
                email: isPhone ? generateRandomEmail() : email,
                phone: phone,
                password: password,
                referralId: localStorage.getItem('ref') || null
            })
            if (response.data.success) {
                toggleModal();
                toggleSidebar();
                await handleUserId(response.data.user.userId);
                localStorage.setItem('userId', response.data.user.userId);
                handleRefresh();
                alert("Registered successfully")
            } else {
                if(response.data.message == 'Phone Number already exists')
                alert("Phone Number already exists")
            else{
                alert("Email already exists")
            }
            }
        } catch (error) {
            alert("Error Occured");
        }
    }


    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/login`; // Adjust this URL according to your API endpoint

        if (!semail?.endsWith('@gmail.com')) {
            alert("Please enter a valid Gmail address")
            return;
        }

        try {
            const response = await axios.post(url, {
                email: semail,
                password: spassword,
            });

            if (!response.data.success) {
                alert("Password dont match")
                return;
            }

            const { userId } = response.data.user;

            toggleModal();
            toggleSidebar();

            if (semail === "labhkarishop@gmail.com") {
                localStorage.setItem('adminLoggedIn', "true");
            } else {
                await handleUserId(userId); // Assuming userIds.userId is the correct property from your response
                localStorage.setItem('userId', userId);
            }
            handleRefresh();
            alert("Logged in")
        } catch (error) {
            alert("Error occured");
        }
    };

    const handleEmailChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setEmail(value);
        setIsPhone(/^\d+$/.test(value));
    };

    const handleSignUps = (e: any) => {
        if (isPhone) {
            if (!otpSent) {
                handleSignSendOtp();
            } else {
                handleSignVerifyOtp(e);
            }
        } else {
            handleSignIn(e);
        }
    };

    const handleSignSendOtp = async () => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/tokensign";
        try {
            const response = await axios.post(otpUrl, {
                sendSMS: true,
                phone: email
            })
            if (response.data.success) {
                alert("Otp Sent")
                setOtpSent(true);
            } else {
                alert("User already exists")
                setOtpSent(false);
            }
        } catch (error) {
            alert("Error sending OTP")
            setOtpSent(false);
        }
    };

    const handleSignVerifyOtp = async (e: any) => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/tokensign";
        try {
            const response = await axios.post(otpUrl, {
                sendSMS: false,
                phone: email,
                token: otp
            })
            if (response.data.success) {
                alert("Otp verified successfully")
                handleSignIn(e)
                setSEmail('');
                setSPassword('');
            } else {
                alert("Otp expired")
                setOtpSent(false);
            }
        } catch (error) {
            alert("Invalid OTP")
            setOtpSent(false);
        }
    };


    useEffect(() => {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        if (adminLoggedIn === "true") {
            setAdmin(true); // Convert string 'true' to boolean true
        } else {
            setAdmin(false); // Convert null or other strings to boolean false
        }
    }, []);


    useEffect(() => {
        fetchCart();
    }, [])


    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchcart";
        const uid = localStorage.getItem('userId');
        const handleCart = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: uid }),
                });
                const res = await response.json();
            } catch (error) {
                alert("Error occured");
            }
        }

        uid && handleCart();

    }, []);

    useEffect(() => {
        const items = document.querySelectorAll('[data-carousel-item1]');
        const prevButton = document.querySelector('[data-carousel-prev1]');
        const nextButton = document.querySelector('[data-carousel-next1]');
        const indicators = document.querySelectorAll('[data-carousel-slide-to1]');

        if (!prevButton || !nextButton) return;

        let currentItemIndex = 0;

        const showItem = (index: number) => {
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            updateIndicators(index);
        };

        const updateIndicators = (index: number) => {
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.setAttribute('aria-current', 'false');
                }
            });
        };

        const handlePrevButtonClick = () => {
            currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
            showItem(currentItemIndex);
        };

        const handleNextButtonClick = () => {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        };

        const handleIndicatorClick = (index: number) => {
            currentItemIndex = index;
            showItem(currentItemIndex);
        };

        prevButton.addEventListener('click', handlePrevButtonClick);
        nextButton.addEventListener('click', handleNextButtonClick);
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => handleIndicatorClick(index));
        });

        // Initial setup
        showItem(currentItemIndex);

        return () => {
            prevButton.removeEventListener('click', handlePrevButtonClick);
            nextButton.removeEventListener('click', handleNextButtonClick);
            indicators.forEach((indicator, index) => {
                indicator.removeEventListener('click', () => handleIndicatorClick(index));
            });
        };
    }, []);


    const handleLogOut = () => {
        try {
            localStorage.removeItem('userId');
            alert("Logged out successfully")
            handleRefresh();
        } catch (e) {
            alert("Error occured");
        }
    }

    const handleAdminLogOut = () => {
        try {
            localStorage.removeItem('adminLoggedIn');
            alert("Admin Logged Out successfully")
            handleRefresh();
        } catch (e) {
            alert("Error occured");
        }
    }

    const handleInputChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSEmail(value);
        setIsMobile(/^\d+$/.test(value));
    };

    const handleSendOtp = async () => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/token";
        try {
            const response = await axios.post(otpUrl, {
                sendSMS: true,
                phone: semail
            })
            if (response.data.success) {
                alert("Otp Sent")
                setOtpSent(true);
            } else {
                alert("Not registered User")
                setOtpSent(false);
            }
        } catch (error) {
            alert("Error sending OTP")
            setOtpSent(false);
        }
    };

    const handleVerifyOtp = async () => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/token";
        try {
            const response = await axios.post(otpUrl, {
                sendSMS: false,
                phone: semail,
                token: spassword
            })
            if (response.data.success) {
                alert("Otp verified successfully")
                localStorage.setItem('userId', response.data.data)
                toggleModal();
                toggleSidebar();
                alert("Logged in");
                handleRefresh();
                setSEmail('');
                setSPassword('');
            } else {
                alert("Otp expired")
                setOtpSent(false);
            }
        } catch (error) {
            alert("Invalid OTP")
            setOtpSent(false);
        }
    };

    const handleSignIns = (e: any) => {
        if (isMobile) {
            if (!otpSent) {
                handleSendOtp();
            } else {
                handleVerifyOtp();
            }
        } else {
            handleSignUp(e);
        }
    };

    return (
        <>
            {modalOpen && (
                <div id="default-modal" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-white">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:black">
                                    {showSignIn ? 'Sign Up' : 'Sign In'}
                                </h3>
                                <button onClick={toggleModal} type="button" className="text-[#103178] bg-transparent hover:bg-[#103178] hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="relative p-4 w-full max-w-md">
                                {!showSignIn ? (
                                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-white">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                                Email or Mobile Number
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Email or Mobile Number"
                                                value={semail}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                                {isMobile ? 'OTP' : 'Password'}
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password"
                                                type="password"
                                                placeholder={isMobile ? 'OTP' : 'Password'}
                                                value={spassword}
                                                onChange={(e) => setSPassword(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={handleSignIns}
                                            >
                                                {isMobile && !otpSent ? 'Send OTP' : 'Sign In'}
                                            </button>
                                            {!isMobile && (
                                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgot">
                                                    Forgot Password?
                                                </a>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-white">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                Email or Mobile Number
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="email"
                                                type="text"
                                                placeholder="Email or Mobile Number"
                                                value={email}
                                                onChange={handleEmailChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        {!isPhone && (
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                                    Mobile Number
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="phone"
                                                    type="text"
                                                    placeholder="Mobile Number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        )}
                                        {isPhone && (
                                            <div className="mb-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                                                    OTP
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="otp"
                                                    type="text"
                                                    placeholder="OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        )}
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={handleSignUps}
                                            >
                                                {isPhone && !otpSent ? 'Send OTP' : 'Sign Up'}
                                            </button>
                                            {!isPhone && (
                                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgot">
                                                    Forgot Password?
                                                </a>
                                            )}
                                        </div>
                                    </form>
                                )}
                                {
                                    showSignIn ? (
                                        <p className="text-center text-black text-sm">Already have an account? <button onClick={handleSignUpClick} className="text-blue-600 hover:underline focus:outline-none" type="button">Sign In</button></p>
                                    ) : (
                                        <p className="text-center text-black text-sm">Dont have an account? <button onClick={handleSignInClick} className="text-blue-600 hover:underline focus:outline-none" type="button">Sign Up</button></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40">
                    {/* Background blur */}
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"></div>
                    <div className="absolute inset-y-0 right-0 md:h-full h-full w-full md:w-64 bg-white shadow-lg transition-transform transform">
                        {/* Close button */}
                        <button onClick={closeSidebar} className="absolute top-4 right-4 text-black focus:outline-none transition-transform transform hover:scale-110">
                            <FaTimes className="h-6 w-6 text-[#103178]" />
                        </button>
                        {/* Sidebar content */}
                        <div className="max-w-xs mx-auto mt-10 h-full p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <ul className="flex flex-col space-y-6">
                                <li>
                                    <div className="flex items-center text-gray-800">
                                        <FaThList className="mr-3 text-red-500 text-2xl" />
                                        <span className="font-semibold text-lg">Categories</span>
                                    </div>
                                    <ul className="pl-6 mt-3 space-y-3">
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Health' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-red-400 transition-colors duration-300">
                                                    <FaHeartbeat className="mr-2 text-red-400 text-xl" />
                                                    <span className="text-md">Health</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Beauty' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-pink-400 transition-colors duration-300">
                                                    <FaSpa className="mr-2 text-pink-400 text-xl" />
                                                    <span className="text-md">Beauty</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Kitchen' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-yellow-400 transition-colors duration-300">
                                                    <FaUtensils className="mr-2 text-yellow-400 text-xl" />
                                                    <span className="text-md">Kitchen</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Agri' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-green-400 transition-colors duration-300">
                                                    <FaSeedling className="mr-2 text-green-400 text-xl" />
                                                    <span className="text-md">Agri</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Home' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-indigo-400 transition-colors duration-300">
                                                    <MdCleanHands className="mr-2 text-indigo-400 text-xl" />
                                                    <span className="text-md">Home</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={{ pathname: '/category', query: { cat: 'Vet' } }}>
                                                <span className="flex items-center text-gray-700 hover:text-purple-400 transition-colors duration-300">
                                                    <FaPaw className="mr-2 text-purple-400 text-xl" />
                                                    <span className="text-md">Vet</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" passHref>
                                                <span className="flex items-center text-gray-700 hover:text-gray-500 transition-colors duration-300">
                                                    <FaEllipsisH className="mr-2 text-gray-500 text-xl" />
                                                    <span className="text-md">More</span>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    {
                                        useId ?
                                            <>
                                                <button onClick={toggleDropMenu}>
                                                    <span className="flex items-center border-t pt-1 text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                                        <FaUser className="mr-3 text-blue-500 text-2xl" />
                                                        <span className="font-semibold text-lg">Account</span>
                                                    </span>
                                                </button>
                                                {
                                                    isMenuOpen && (
                                                        <ul className="relative bottom-0 right-4 w-48 bg-white rounded-lg shadow-lg py-1 z-40">
                                                            <li>
                                                                <Link href="/user/dashboard" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-blue-500 transition-colors duration-300 py-2 px-4">
                                                                        <FaUser className="mr-2 text-blue-500" />
                                                                        <span>Dashboard</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/orders" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-green-500 transition-colors duration-300 py-2 px-4">
                                                                        <FaWallet className="mr-2 text-pink-500" />
                                                                        <span>Wallet</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/orders" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-green-500 transition-colors duration-300 py-2 px-4">
                                                                        <FaTruck className="mr-2 text-green-500" />
                                                                        <span>Orders</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/under" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-indigo-500 transition-colors duration-300 py-2 px-4">
                                                                        <FaBell className="mr-2 text-indigo-500" />
                                                                        <span>eShop</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/user/network" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-red-500 transition-colors duration-300 py-2 px-4">
                                                                        <BiSolidNetworkChart className="mr-2 text-red-500" />
                                                                        <span>Network</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/user/profile" passHref>
                                                                    <span className="flex items-center text-gray-800 hover:text-yellow-500 transition-colors duration-300 py-2 px-4">
                                                                        <FaUser className="mr-2 text-yellow-500" />
                                                                        <span>Profile</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <button onClick={handleLogOut}>
                                                                    <span className="flex items-center text-gray-800 hover:text-indigo-500 transition-colors duration-300 py-2 px-4">
                                                                        <IoMdLogOut className="mr-2 text-indigo-500" />
                                                                        <span>LogOut</span>
                                                                    </span>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    )
                                                }
                                            </>
                                            :
                                            <button onClick={toggleModal}>
                                                <span className="flex items-center border-t pt-1 text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                                    <FaUserCircle className="mr-3 text-orange-500 text-2xl" />
                                                    <span className="font-semibold text-lg">Login / Signup</span>
                                                </span>
                                            </button>
                                    }
                                </li>
                                {
                                    admin && <li>
                                        <button onClick={handleAdminLogOut}>
                                            <span className="flex items-center text-gray-800 hover:text-indigo-500 transition-colors duration-300 py-2 px-4">
                                                <IoMdLogOut className="mr-2 text-indigo-500" />
                                                <span>Admin LogOut</span>
                                            </span>
                                        </button>
                                    </li>
                                }
                                <li className="border-t pt-4">
                                    <Link href="/about" passHref>
                                        <div className="flex items-center text-gray-800 hover:text-green-500 mt-4 transition-colors duration-300">
                                            <FaInfoCircle className="mr-3 text-green-500 text-2xl" />
                                            <span className="font-semibold text-lg">About Us</span>
                                        </div>
                                    </Link>
                                    <Link href="/user/notification" passHref>
                                        <div className="flex items-center text-gray-800 hover:text-yellow-500 mt-4 transition-colors duration-300">
                                            <FaBell className="mr-3 text-yellow-500 text-2xl" />
                                            <span className="font-semibold text-lg">Notification</span>
                                        </div>
                                    </Link>
                                    <Link href="/under" passHref>
                                        <div className="flex items-center text-gray-800 hover:text-red-500 mt-4 transition-colors duration-300">
                                            <FaThumbsUp className="mr-3 text-red-500 text-2xl" />
                                            <span className="font-semibold text-lg">Success Story</span>
                                        </div>
                                    </Link>
                                    <Link href='/orders'>
                                        <div className="flex items-center text-gray-800 hover:text-indigo-500 mt-4 transition-colors duration-300">
                                            <FaTruck className="mr-3 text-indigo-500 text-2xl" />
                                            <span className="font-semibold text-lg">Order Tracker</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
            )}

            {/* Main Navbar */}
            <header className="fixed top-0 left-0 right-0 z-30 shadow-2xl">
                <nav className="bg-white lg:px-6 pt-2.5 pb-2 md:pb-1.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link href="/">
                            <span className="md:ml-0 ml-4 relative flex items-center overflow-hidden">
                                <Image src={Logo2}
                                    width={120}
                                    height={120}
                                    className="" alt='logo' />                            </span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            {/* Search bar for large screens */}
                            {
                                pathname === "/" && <div className="hidden lg:flex items-center flex-1 justify-center">
                                    <form className="flex items-center max-w-md w-full" onSubmit={handleSearchSubmit}>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-[#103178] focus:border-[#103178] block w-full pl-10 p-1.5 dark:placeholder-gray-400 dark:focus:ring-[#103178] border-[#103178] dark:focus:border-[#103178]"
                                            placeholder="Search Product name..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="p-2 ml-2 text-sm font-medium text-white bg-[#103178] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#103178] dark:hover:bg-[#103178] dark:focus:ring-[#103178]"
                                        >
                                            <FaSearch />
                                        </button>
                                    </form>
                                </div>
                            }
                            {
                                pathname === "/" && <div className="flex items-center">
                                    {/* Search icon for mobile */}
                                    <button onClick={toggleSearch} className="block lg:hidden text-black focus:outline-none mr-4">
                                        <FaSearch />
                                    </button>
                                </div>
                            }
                            <a href="/cart" className="relative block md:ml-4 text-black text-2xl font-medium rounded-lg px-5 py-2.5 text-center">
                                <FaCartShopping />
                                <span className="absolute -top-1 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#103178] rounded-full">
                                    {count}
                                </span>
                            </a>
                            {admin && (
                                <Link href="/admin/Home">
                                    <span className="block text-black text-2xl md:mr-0 font-medium rounded-lg px-5 py-2.5 text-center">
                                        <RiAdminFill />
                                    </span>
                                </Link>
                            )}
                            <div className="block relative top-1 md:ml-6 md:mr-0 mr-4 ml-4">
                                <button onClick={toggleSidebar} className="text-black focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M0 5h20V3H0v2zM0 10h20V8H0v2zm0 5h20v-2H0v2z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


            {/* searchbar mobile view toggle */}
            {pathname === "/" && isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative w-11/12 max-w-md">
                        <button onClick={toggleSearch} className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Search Product name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white px-2 py-2 ml-2 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                Search
                            </button>
                        </form>
                    </div>
                </div>)}

            {/* Sub Navbar */}
            <div id="default-carousel" className="fixed w-full top-14 md:border-0 border-t-2 border-gray-300 z-30 shadow-lg" data-carousel="slide1">
                <div className="relative overflow-hidden h-20 lg:hidden">
                    <ul className="flex bg-white w-full flex-wrap justify-center items-center py-3 bottom-0 lg:hidden" data-carousel-item1>
                        <li className="border-r  px-5 last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Health' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaHeartbeat className="text-3xl text-red-400" />
                                <span>Health</span>
                            </Link>
                        </li>
                        <li className="px-3 border-r last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Beauty' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaSpa className="text-3xl text-pink-400" />
                                <span>Beauty</span>
                            </Link>
                        </li>
                        <li className="px-3 border-r last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Kitchen' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaUtensils className="text-3xl text-yellow-400" />
                                <span>Kitchen</span>
                            </Link>
                        </li>
                        <li className="border-r px-3 last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Agri' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaSeedling className="text-3xl text-green-400" />
                                <span>Agri</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex bg-white w-full flex-wrap justify-center items-center py-3 bottom-0 lg:hidden" data-carousel-item1>
                        <li className="px-3 border-r last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Home' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <MdCleanHands className="text-3xl text-indigo-400" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="px-3 border-r last:border-r-0">
                            <Link href={{ pathname: '/category', query: { cat: 'Vet' } }} className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaPaw className="text-3xl text-purple-400" />
                                <span>Vet</span>
                            </Link>
                        </li>
                        <li className="px-3 border-r last:border-r-0">
                            <Link href="#" className="text-black hover:text-black flex flex-col items-center space-y-1">
                                <FaEllipsisH className="text-3xl text-gray-500" />
                                <span>More</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <button type="button" className="lg:hidden absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev1>
                    <span className="inline-flex items-center justify-center">
                        <svg preserveAspectRatio="xMidYMid" width="17.906" height="31.91" className="m-auto h-4 w-2 rotate-180 lg:h-7 lg:w-14" viewBox="0 0 17.906 31.91" fill="black"><path d="M0.995,31.924 C0.730,31.924 0.466,31.818 0.270,31.608 C-0.106,31.207 -0.086,30.576 0.315,30.200 L15.456,15.974 L0.315,1.748 C-0.086,1.372 -0.106,0.741 0.270,0.340 C0.645,-0.063 1.275,-0.083 1.676,0.294 L17.590,15.247 C17.791,15.435 17.905,15.699 17.905,15.974 C17.905,16.250 17.791,16.513 17.590,16.702 L1.676,31.654 C1.484,31.834 1.239,31.924 0.995,31.924 Z"></path></svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="lg:hidden absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next1>
                    <span className="inline-flex items-center justify-center">
                        <svg preserveAspectRatio="xMidYMid" width="17.906" height="31.91" className="m-auto h-4 w-2 lg:h-7 lg:w-14" viewBox="0 0 17.906 31.91" fill="black"><path d="M0.995,31.924 C0.730,31.924 0.466,31.818 0.270,31.608 C-0.106,31.207 -0.086,30.576 0.315,30.200 L15.456,15.974 L0.315,1.748 C-0.086,1.372 -0.106,0.741 0.270,0.340 C0.645,-0.063 1.275,-0.083 1.676,0.294 L17.590,15.247 C17.791,15.435 17.905,15.699 17.905,15.974 C17.905,16.250 17.791,16.513 17.590,16.702 L1.676,31.654 C1.484,31.834 1.239,31.924 0.995,31.924 Z"></path></svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            {/* Bottom Navbar */}
            <div className="fixed bottom-0 left-0 w-full h-14 shadow-2xl bg-white px-4 py-2 flex justify-between items-center md:hidden z-30" >
                <button onClick={shareOnWhatsApp} className="text-black text-2xl">
                    <FaShareAlt className='text-[#103178]' />
                </button>
                <a href="/orders" className="text-black text-2xl">
                    <FaTruck className='text-[#103178]' />
                </a>
                <a href="/share" className="text-black text-2xl">
                    <FaGift className='text-[#103178]' />
                </a>
                <a href="/user/notification" className="text-black text-2xl">
                    <FaBell className='text-[#103178]' />
                </a>
                {
                    useId ? <Link onClick={toggleDropdown} className="bloc text-black font-medium rounded-lg text-2xl text-center" href={''}>
                        <FaUser className='text-[#103178]' />
                    </Link> : <Link onClick={toggleModal} className="bloc text-black font-medium rounded-lg text-2xl text-center" href={''}>
                        <FaUser className='text-[#103178]' />
                    </Link>
                }
                {
                    isDropdownOpen && (
                        <ul className="absolute bottom-12 right-0 w-full bg-white rounded-lg shadow-lg py-2 z-50">
                            <li>
                                <Link href="/user/dashboard" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-blue-500 transition-colors duration-300 py-2 px-4">
                                        <FaUser className="mr-4 text-blue-500" />
                                        <span>Dashboard</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/wallet" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-green-500 transition-colors duration-300 py-2 px-4">
                                        <FaWallet className="mr-4 text-pink-500" />
                                        <span>Wallet</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-green-500 transition-colors duration-300 py-2 px-4">
                                        <FaTruck className="mr-4 text-green-500" />
                                        <span>Orders</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/under" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-indigo-500 transition-colors duration-300 py-2 px-4">
                                        <FaBell className="mr-4 text-indigo-500" />
                                        <span>eShop</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/network" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-red-500 transition-colors duration-300 py-2 px-4">
                                        <BiSolidNetworkChart className="mr-4 text-red-500" />
                                        <span>Network</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/profile" passHref>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-yellow-500 transition-colors duration-300 py-2 px-4">
                                        <FaUser className="mr-4 text-yellow-500" />
                                        <span>Profile</span>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut}>
                                    <span className="flex text-xl items-center text-gray-800 hover:text-indigo-500 transition-colors duration-300 py-2 px-4">
                                        <IoMdLogOut className="mr-4 text-indigo-500" />
                                        <span>LogOut</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    )
                }
            </div>
        </>
    );
}

export default Navbar;

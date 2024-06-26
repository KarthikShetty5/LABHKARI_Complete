'use client';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='-mr-2'>
            <section className="bg-[#103178] py-6 shadow-lg">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-around text-center md:text-left">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold text-white">Free Delivery</h2>
                            <p className="text-white">Free delivery on purchase above 1k</p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold text-white">100% Money Back</h2>
                            <p className="text-white">Guaranteed buy back on all products</p>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h2 className="text-2xl font-bold text-white">No-Contact Shipping</h2>
                            <p className="text-white">Safe and secure non-contact shipping</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="border-t border-[#CCCCCC]"></div>
            <section className="bg-[#103178] py-6 shadow-lg">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-around text-center md:text-left">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/faq">
                            <span className="text-white text-xl hover:text-gray-800">FAQs</span>
                        </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/refund">
                            <span className="text-white text-xl hover:text-gray-800">Refund Policy</span>
                        </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/rules">
                            <span className="text-white text-xl hover:text-gray-800">Labhkari Rules</span>
                        </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/privacy">
                            <span className="text-white text-xl hover:text-gray-800">Privacy Policy</span>
                        </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/terms">
                            <span className="text-white text-xl hover:text-gray-800">Terms and Conditions</span>
                        </Link>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/contactus">
                            <span className="text-white text-xl hover:text-gray-800">Contact Us</span>
                        </Link>
                        </div>
                        {/* <div className="w-full md:w-1/3 mb-6 md:mb-0"><Link href="/share">
                            <span className="text-white text-xl hover:text-gray-800">Share and Earn</span>
                        </Link>
                        </div> */}
                    </div>
                </div>
            </section>

            <div className="border-t border-[#CCCCCC]"></div>
            <footer className="bg-[#103178] shadow-lg w-full py-6 dark:bg-[#103178] md:mb-0 mb-14">
                <div className="container mx-auto">
                    <div className="flex justify-center space-x-6 mb-4">
                        <a href="https://www.facebook.com/labhkarishop" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <FaFacebook className="text-2xl" />
                        </a>
                        <a href="https://www.instagram.com/labhkariofficial/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a href="https://www.youtube.com/@labhkari" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <FaYoutube className="text-2xl" />
                        </a>
                        <a href="https://linkedin.com/company/labhkari" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="www.pinterest.com/labhkariofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                            <FaPinterest className="text-2xl" />
                        </a>
                    </div>
                    <div className="text-center">
                        <span className="text-sm text-white dark:text-white">
                            © 2024 <a href="/" className="hover:underline">Labhkari™</a>. All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

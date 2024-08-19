'use client';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import Head from 'next/head';

const Page = () => {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-28 md:mt-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4 justify-center text-center">About Us</h1>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Labhkari.com</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At Labhkari, we are revolutionizing the modern-day shopping experience with a focus on authenticity, health,
                            and quality. We offer a wide range of health, home, and personal care products, ensuring that our customers
                            get only the best.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is to provide a seamless shopping experience that combines the speed and convenience of online
                            shopping with the trust and reliability of traditional offline stores. We achieve this by leveraging advanced
                            technology and innovative methods, enhancing consumer satisfaction at every step.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                            <li className="mb-2">Authentic Products: We source and offer a curated selection of health, home, and personal care products, ensuring authenticity and quality in every purchase.</li>
                            <li className="mb-2">Advanced Technology: By utilizing cutting-edge e-commerce platforms, we provide a user-friendly and efficient shopping experience.</li>
                            <li className="mb-2">Digital Marketing: Our robust digital marketing strategies ensure that our customers are always informed about the latest products, offers, and trends.</li>
                            <li className="mb-2">Direct Selling: We empower our customers and partners with unique opportunities to grow and succeed through our direct selling model.</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Philosophy: Online Ki Speed, Offline Ka Bharosha</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Labhkari is built on the principle of combining the best of both worlds. We bring you the rapid, hassle-free shopping
                            experience of the online world, backed by the reliability and trustworthiness of offline transactions. This unique
                            blend ensures that our customers always feel secure and satisfied with their shopping choices.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Labhkari?</h2>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                            <li className="mb-2">Consumer Satisfaction: Our top priority is to ensure that every customer is delighted with their purchase and experience.</li>
                            <li className="mb-2">Growth Opportunities: We offer exceptional opportunities for growth, both for our customers and business partners, through innovative selling and marketing strategies.</li>
                            <li className="mb-2">Community Focus: We believe in adding value to the lives of people and communities, striving for success and well-being for all.</li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;

'use client';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import Head from 'next/head';

const RulesPage = () => {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 mt-32 md:mt-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Top 10 Rules for Labhkari Partners</h1>

                    <div className="space-y-6">
                        <RuleCard number="1" text="Integrity First: Always represent Labhkari with honesty and integrity." />
                        <RuleCard number="2" text="Follow Company Policies: Adhere to all sales and marketing policies set by Labhkari." />
                        <RuleCard number="3" text="Professionalism Always: Maintain a positive and professional attitude in every interaction." />
                        <RuleCard number="4" text="Stay Informed: Attend all training sessions and stay updated on products and industry trends." />
                        <RuleCard number="5" text="Deliver Exceptional Service: Build customer relationships and provide outstanding service." />
                        <RuleCard number="6" text="Compliance is Key: Follow all legal and regulatory requirements for direct selling." />
                        <RuleCard number="7" text="Ethical Practices: Conduct business ethically; avoid false claims or misleading statements." />
                        <RuleCard number="8" text="Keep Accurate Records: Maintain precise records of sales, expenses, and earnings." />
                        <RuleCard number="9" text="Respect Privacy: Safeguard customer and partner confidentiality at all times." />
                        <RuleCard number="10" text="Strive for Growth: Pursue continuous personal and professional development." />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const RuleCard = ({ number, text }: any) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0 bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl font-bold">
                    {number}
                </div>
                <p className="ml-3 text-lg font-semibold text-gray-900">{text}</p>
            </div>
        </div>
    );
};

export default RulesPage;

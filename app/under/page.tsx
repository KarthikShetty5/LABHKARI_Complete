'use client';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { Suspense } from 'react';

const PageContent: React.FC = () => {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center mb-4">This Page is</h1>
                    <h1 className="text-2xl font-bold text-center mb-4">Under Progress</h1>
                    <p className="text-lg text-center mb-8">We will get back to you soon.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

const Page: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default Page;


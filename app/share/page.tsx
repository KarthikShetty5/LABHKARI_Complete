'use client';
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FaShare, FaWhatsapp } from "react-icons/fa";

const sections = [
    {
        title: "लाभकारी व्यापार",
        content: `ऑनलाइन की स्पीड, ऑफ़लाइन का भरोसा`
    },
    {
        title: "Earn referral income upto 30%",
        content: `Our referral program offers generous commissions on sales generated through your referrals.`
    },
    {
        title: "Enjoy offers/schemes upto 20%",
        content: `Exclusive offers and schemes available only to our referral program members.`
    },
    {
        title: "Performance Bonus 3-21%",
        content: `Earn additional bonuses based on your sales performance and team volume.`
    },
    {
        title: "eShop carriage & freight upto 5%",
        content: `Additional earnings on eShop carriage and freight services.`
    },
    {
        title: "Leadership Bonuses upto 10%",
        content: `Leadership bonuses for achieving team and organizational goals.`
    },
    {
        title: "Travel/House/Car Fund upto 4%",
        content: `Opportunities to earn funds towards travel, house, or car purchases.`
    },
    {
        title: "Trips & tours, Training and support.",
        content: `Enjoy sponsored trips, tours, and continuous training and support.`
    }
];

function Card({ title, content }: any) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{content}</p>
        </div>
    );
}

function shareOnWhatsApp() {
    const message = `${process.env.NEXT_PUBLIC_CLIENT_URL}/share?ref=${localStorage.getItem('userId')}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function ShareAndEarn() {
    const searchParams = useSearchParams();
    const referralId = searchParams ? searchParams.get('ref') : "";

    useEffect(() => {
        if (referralId) {
            localStorage.setItem('ref', referralId);
        }
    }, [referralId]);

    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 md:mt-16 mt-24">
                <div className="max-w-5xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Labhkari Business</h2>
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <Card key={index} title={section.title} content={section.content} />
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                        <button onClick={shareOnWhatsApp} className="bg-[#103178] text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300">
                            Share
                        </button>
                        <Link href="/signup">
                            <span className="bg-[#103178] text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 inline-block">
                                Signup or Upgrade
                            </span>
                        </Link>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}

const Page: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShareAndEarn />
        </Suspense>
    );
};

export default Page;

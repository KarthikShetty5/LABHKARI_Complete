'use client';

import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Link from "next/link";
import { FaShare, FaWhatsapp } from "react-icons/fa";

const sections = [
    {
        title: "Here's how it works:",
        content: `<ol class="list-decimal list-inside">
        <li>Sign up for our Share and Earn program and get your unique referral link.</li>
        <li>Share your referral link with your friends, family, and network on social media, email, or any other platform.</li>
        <li>When someone clicks on your referral link and makes a purchase on Labhkari.com, you earn a commission on that sale.</li>
        <li>You can track your earnings and referrals in your Share and Earn dashboard on Labhkari.com.</li>
      </ol>`
    },
    {
        title: "Earning Opportunities:",
        content: `<p>Our Share and Earn program offers you the opportunity to earn in 14 different ways. For instance, you can receive up to 20% discount on your own purchases and take advantage of exclusive offers that are only available to our Share and Earn members.</p>
        <p>You can also earn a 10% retail bonus on the purchases made by the customers you refer to us. In addition, you have the potential to earn up to a 21% performance bonus based on the volume of sales generated by your team.</p>
        <p>Other ways to earn include leadership bonuses, car fund bonuses, travel fund bonuses, and lifestyle bonuses. You can even earn commissions on the sales generated by your entire organization, regardless of who made the sale.</p>
        <p>Our Share and Earn program is designed to reward your efforts in every way possible. So whether you're looking to earn some extra cash or build a successful business, we have the tools and resources to help you achieve your goals.</p>`
    },
    {
        title: "Contact Us",
        content: `If you have any questions or need assistance, please feel free to contact our customer support team:
      <ul>
        <li>Email: <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a></li>
        <li>WhatsApp or Phone: <a href="tel:+918607863200" class="text-blue-500">+91-8607863200</a></li>
      </ul>`
    }
];

function Card({ title, content }: any) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

function shareOnWhatsApp() {
    const message = `${process.env.NEXT_PUBLIC_CLIENT_URL}?ref=${localStorage.getItem('userId')}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

export default function ShareAndEarn() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 md:mt-16 mt-24">
                <div className="max-w-5xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share and Earn</h2>
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <Card key={index} title={section.title} content={section.content} />
                        ))}
                    </div>
                <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-2">Click to Share</h3>
                    <div className="text-gray-700" />
                </div>
                </div>
                {/* <button onClick={shareOnWhatsApp} className="fixed right-4 bottom-20 bg-[#103178] text-white md:p-3 p-1 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300">
                    <FaShare size={30} className="text-xl md:text-3xl z-50" />
                </button> */}
            </div >
            <Footer />
        </>
    );
}

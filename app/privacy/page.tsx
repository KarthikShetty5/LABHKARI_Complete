'use client';

import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

const sections = [
    {
        title: "What information do we collect?",
        content: `We may collect personal information, such as your name, email address, phone number, and shipping address when you register for an account, place an order, or participate in our referral program. We may also collect non-personal information, such as your IP address, browser type, and device information.`,
    },
    {
        title: "How do we use your information?",
        content: `We may use your personal information to:
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders, products, and promotions</li>
        <li>Provide customer support</li>
        <li>Administer our referral program and rewards</li>
        <li>Improve our website and services</li>
        <li>Comply with legal obligations</li>
      </ul>
      We may also use your non-personal information for analytics and marketing purposes.`,
    },
    {
        title: "How do we protect your information?",
        content: `We take reasonable measures to protect your personal information from unauthorized access, disclosure, or destruction. We use secure servers and encryption technologies to protect your information during transmission.
      However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure. Therefore, we cannot guarantee the absolute security of your information.`,
    },
    {
        title: "Do we share your information with third parties?",
        content: `We may share your information with third-party service providers, such as payment processors and shipping carriers, to facilitate your orders. We may also share your information with our affiliates and business partners for marketing and promotional purposes.
      We do not sell or rent your personal information to third parties.`,
    },
    {
        title: "Your rights and choices",
        content: `You have the right to access, correct, or delete your personal information. You may also opt-out of receiving marketing communications from us at any time.
      To exercise your rights or make a request, please contact us using the contact information provided below.`,
    },
    {
        title: "Changes to this Privacy Policy",
        content: `We may update this Privacy Policy from time to time. We will post the updated version on our website and indicate the date of the last revision. We encourage you to review this Privacy Policy periodically.`,
    },
    {
        title: "Contact us",
        content: `If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:labhkarishop@gmail.com" className="text-blue-500">labhkarishop@gmail.com</a>
      <p class="mt-6 text-sm text-gray-500">Effective date: 01 April 2023</p>`,
    },
];

function Card({ title, content }: any) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-24 md:mt-20">
                <div className="max-w-3xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h2>
                    {sections.map((section, index) => (
                        <Card key={index} title={section.title} content={section.content} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}


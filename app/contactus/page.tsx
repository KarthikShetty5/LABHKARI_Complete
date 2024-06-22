'use client';

import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

const contactSections = [
    {
        title: "Customer Success Support",
        content: `For any queries related to your orders, products, or account, please contact our customer support team:
      <ul>
        <li>Email: <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a></li>
        <li>WhatsApp or Phone: <a href="tel:+918607863200" class="text-blue-500">+91-8607863200</a></li>
      </ul>`,
    },
    {
        title: "Office Address",
        content: `Gyankul Network (P) Ltd.<br>
      Near Rewari Mod, Kanina,<br>
      Haryana, 123027, Bharat.`,
    },
    {
        title: "Thank you for choosing Labhkari.com. We look forward to serving you!",
        content: `Best regards,<br>
      The Labhkari Team`,
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

export default function ContactUs() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 md:mt-14 mt-28">
                <div className="max-w-5xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Contact Us</h2>
                    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg lg:w-1/2">
                            <h3 className="text-xl font-semibold mb-2">Contact Form</h3>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="name" name="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows={10} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            {contactSections.map((section, index) => (
                                <Card key={index} title={section.title} content={section.content} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

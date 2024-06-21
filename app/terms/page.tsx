'use client';

import Navbar from "@/Components/Navbar";

const termsSections = [
    {
        title: "Intellectual Property",
        content: `All content, trademarks, logos, and other intellectual property on Labhkari.com are the property of Gyankul Network (P) Ltd or its licensors. You may not use, copy, reproduce, modify, distribute, transmit, display, publish, sell, license, or create derivative works based on any content or intellectual property on our website without our prior written consent.`,
    },
    {
        title: "User Conduct",
        content: `You agree to use Labhkari.com only for lawful purposes and in a manner that does not infringe the rights of any third party. You agree not to use our website to:
      <ul>
        <li>Upload, post, email, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, pornographic, or offensive</li>
        <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
        <li>Upload, post, email, or otherwise transmit any content that infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party</li>
        <li>Upload, post, email, or otherwise transmit any unsolicited or unauthorized advertising, promotional materials, or any other form of solicitation</li>
        <li>Interfere with or disrupt the operation of our website, servers, or networks, or violate any requirements, procedures, policies, or regulations of networks connected to our website</li>
      </ul>`,
    },
    {
        title: "Disclaimer of Warranties",
        content: `Labhkari.com is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
      We make no warranty that our website will meet your requirements, or that it will be uninterrupted, timely, secure, or error-free. We make no warranty as to the accuracy, completeness, reliability, or currency of any content or information on our website.`,
    },
    {
        title: "Limitation of Liability",
        content: `In no event shall Gyankul Network (P) Ltd, its directors, officers, employees, agents, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of Labhkari.com.`,
    },
    {
        title: "Indemnification",
        content: `You agree to indemnify and hold Gyankul Network (P) Ltd, its directors, officers, employees, agents, and affiliates harmless from any and all claims, damages, expenses, and liabilities, including reasonable attorneys' fees, arising out of or in connection with your use of our website or your breach of these terms and conditions.`,
    },
    {
        title: "Governing Law",
        content: `These terms and conditions shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.`,
    },
    {
        title: "Changes to these Terms and Conditions",
        content: `We reserve the right to update or modify these terms and conditions at any time without prior notice. Your continued use of Labhkari.com after any such changes constitutes your acceptance of the new terms and conditions.`,
    },
    {
        title: "Contact Us",
        content: `If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a>
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

export default function TermsConditions() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-28 md:mt-16">
                <div className="max-w-3xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Terms and Conditions</h2>
                    {termsSections.map((section, index) => (
                        <Card key={index} title={section.title} content={section.content} />
                    ))}
                </div>
            </div>
        </>
    );
}

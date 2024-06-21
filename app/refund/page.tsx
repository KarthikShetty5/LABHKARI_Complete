'use client';

import Navbar from "@/Components/Navbar";

const cancellationRefundSections = [
    {
        title: "Cancellation Policy",
        content: `You may cancel your order within 24 hours of placing it by contacting us at <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a>. We will cancel your order and issue a full refund to your original payment method.
      If you wish to cancel your order after 24 hours, we will do our best to accommodate your request, but we cannot guarantee that we will be able to cancel the order.`,
    },
    {
        title: "Refund Policy",
        content: `We offer a 30-day money-back guarantee on all products purchased from Labhkari.com. If you are not satisfied with your purchase, you may return the product within 30 days of receipt for a full refund.
      To initiate a return, please contact us at <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a> with your order number and reason for return. We will provide you with instructions on how to return the product.
      The returned product must be in its original packaging and in unused condition. Once we receive and inspect the product, we will issue a refund to your original payment method. Please allow 7-10 business days for the refund to appear on your account.
      Shipping charges are non-refundable, and you will be responsible for the return shipping costs unless the product is defective or damaged.
      If you receive a defective or damaged product, please contact us immediately at <a href="mailto:labhkarishop@gmail.com" class="text-blue-500">labhkarishop@gmail.com</a> with your order number and a description of the issue. We will replace the product or issue a refund at our discretion.`,
    },
    {
        title: "Exceptions",
        content: `The following products are non-returnable and non-refundable:
      <ul>
        <li>E-books, digital products, and software</li>
        <li>Personalized or custom-made products</li>
        <li>Products that have been opened or used</li>
        <li>Products that are not in their original packaging</li>
      </ul>`,
    },
    {
        title: "Changes to this Cancellation and Refund Policy",
        content: `We may update this Cancellation and Refund Policy from time to time. We will post the updated version on our website and indicate the date of the last revision. We encourage you to review this policy periodically.`,
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

export default function CancellationRefundPolicy() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 md:mt-16 mt-28">
                <div className="max-w-3xl w-full space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cancellation and Refund Policy</h2>
                    {cancellationRefundSections.map((section, index) => (
                        <Card key={index} title={section.title} content={section.content} />
                    ))}
                </div>
            </div>
        </>
    );
}

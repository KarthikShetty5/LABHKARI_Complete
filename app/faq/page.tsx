'use client';
import FaqItem from '@/Components/FaCard';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

const faqSections = [
    {
        "title": "Product FAQs",
        "faqs": [
            {
                "question": "What products do you offer?",
                "answer": "We offer a wide range of products, including health supplements, beauty products, home appliances, and more."
            },
            {
                "question": "How do I know if a product is right for me?",
                "answer": "To determine which products are right for you, we recommend consulting with your healthcare provider or doing some research on our website to learn more about the benefits of each product."
            },
            {
                "question": "Can I see a list of ingredients for a particular product?",
                "answer": "You can find a list of ingredients for each product on its respective product page."
            }
        ]
    },
    {
        "title": "Ordering FAQs",
        "faqs": [
            {
                "question": "How do I place an order?",
                "answer": "To place an order, simply browse our website and add items to your cart. When you're ready to check out, follow the prompts to enter your shipping and payment information."
            },
            {
                "question": "What payment methods do you accept?",
                "answer": "We accept a variety of payment methods, including credit cards, debit cards, and PayPal."
            },
            {
                "question": "Can I change or cancel my order after it's been placed?",
                "answer": "If you need to make changes or cancel your order, please contact us as soon as possible and we'll do our best to accommodate your request."
            }
        ]
    },
    {
        "title": "Shipping FAQs",
        "faqs": [
            {
                "question": "How long will it take to receive my order?",
                "answer": "Delivery times vary depending on your location and the shipping method you choose."
            },
            {
                "question": "What shipping methods do you offer?",
                "answer": "We offer a variety of shipping options, including standard shipping and expedited shipping."
            },
            {
                "question": "Can I track my order?",
                "answer": "Yes, you can track your order by logging into your account on our website or contacting our customer service team for assistance."
            }
        ]
    },
    {
        "title": "Returns and Refunds FAQs",
        "faqs": [
            {
                "question": "What is your return policy?",
                "answer": "We offer a hassle-free return policy. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund."
            },
            {
                "question": "How do I initiate a return?",
                "answer": "To initiate a return, simply contact us and we'll provide you with instructions."
            },
            {
                "question": "When will I receive my refund?",
                "answer": "Once we receive your return, we'll process your refund within 5-7 business days."
            }
        ]
    },
    {
        "title": "Share and Earn FAQs",
        "faqs": [
            {
                "question": "How does the Share and Earn program work?",
                "answer": "Our Share and Earn program allows you to earn money by sharing our products with your friends and family. When someone makes a purchase through your unique referral link, you'll earn a commission."
            },
            {
                "question": "What are the benefits of joining the Share and Earn program?",
                "answer": "You'll earn commissions on sales, access exclusive bonuses, and rewards."
            },
            {
                "question": "How do I sign up for the Share and Earn program?",
                "answer": "Simply create an account on our website and follow the prompts to join."
            }
        ]
    },
    {
        "title": "Account FAQs",
        "faqs": [
            {
                "question": "How do I create an account?",
                "answer": "Click on the 'Sign Up' button on our website and follow the prompts to enter your information."
            },
            {
                "question": "What are the benefits of creating an account?",
                "answer": "Faster checkout, order tracking, access to special promotions and offers."
            },
            {
                "question": "How do I update my account information?",
                "answer": "Log in to your account and click on the 'My Account' section to update your information."
            }
        ]
    },
    {
        "title": "Privacy and Security FAQs",
        "faqs": [
            {
                "question": "How do you protect my personal information?",
                "answer": "We use encryption and other measures to protect your personal information."
            },
            {
                "question": "Do you share my information with third parties?",
                "answer": "We do not share your information with third parties unless required by law."
            },
            {
                "question": "How do I opt-out of receiving marketing communications?",
                "answer": "Click on the 'Unsubscribe' link in the email or contact our customer service team."
            }
        ]
    },
    {
        "title": "Technical FAQs",
        "faqs": [
            {
                "question": "I'm having trouble accessing the website - what should I do?",
                "answer": "Try clearing your browser cache and cookies or contacting your internet service provider."
            },
            {
                "question": "Why am I experiencing slow load times on the website?",
                "answer": "Slow load times may be due to high traffic or a slow internet connection."
            },
            {
                "question": "How do I clear my browser cache and cookies?",
                "answer": "Refer to your browser's settings or contact our customer service team for assistance."
            }
        ]
    },
    {
        "title": "Product FAQs",
        "faqs": [
            {
                "question": "Are your products organic/natural/safe?",
                "answer": "Our products are made with high-quality, natural ingredients that are safe for use."
            },
            {
                "question": "How do I use your products?",
                "answer": "Usage instructions can be found on each product page or packaging."
            },
            {
                "question": "Can you recommend a product for my specific needs?",
                "answer": "Contact our customer service team for personalized recommendations."
            }
        ]
    },
    {
        "title": "Payment FAQs",
        "faqs": [
            {
                "question": "What payment methods do you accept?",
                "answer": "We accept major credit cards and PayPal."
            },
            {
                "question": "Is my payment information secure?",
                "answer": "Yes, your payment information is securely encrypted and processed."
            },
            {
                "question": "Do you offer payment plans or financing options?",
                "answer": "At this time, we do not offer payment plans or financing options."
            }
        ]
    },
    {
        "title": "Affiliate Program FAQs",
        "faqs": [
            {
                "question": "How do I become an affiliate?",
                "answer": "Sign up on our website and start promoting our products through your unique referral link."
            },
            {
                "question": "What are the benefits of the affiliate program?",
                "answer": "Earn commissions on sales, access to exclusive promotions and offers."
            },
            {
                "question": "How do I track my earnings as an affiliate?",
                "answer": "Track your earnings and performance through our affiliate dashboard."
            }
        ]
    },
    {
        "title": "Business Opportunity FAQs",
        "faqs": [
            {
                "question": "How can I become a distributor?",
                "answer": "Contact our customer service team to learn more about the requirements and process."
            },
            {
                "question": "What are the benefits of becoming a distributor?",
                "answer": "Access to exclusive products, promotions, and the opportunity to earn income."
            },
            {
                "question": "How do I get started as a distributor?",
                "answer": "Complete the application process and begin promoting our products."
            }
        ]
    },
    {
        "title": "Direct Selling FAQs",
        "faqs": [
            {
                "question": "What is direct selling?",
                "answer": "Direct selling is a method of marketing and selling products directly to consumers."
            },
            {
                "question": "How do I become a direct seller for Labhkari.com?",
                "answer": "Sign up on our website and complete the registration process."
            },
            {
                "question": "How do I earn income through direct selling?",
                "answer": "Earn income through commissions, bonuses, and sales from your team."
            },
            {
                "question": "Do I need any prior experience or qualifications to become a direct seller?",
                "answer": "No, training and support are provided regardless of experience."
            },
            {
                "question": "What kind of support and resources do you offer to direct sellers?",
                "answer": "Training materials, marketing tools, and ongoing support from experienced leaders."
            },
            {
                "question": "How much time do I need to invest to be a successful direct seller?",
                "answer": "Flexibility to work at your own pace, whether part-time or full-time."
            },
            {
                "question": "Can I still be a direct seller if I have a full-time job?",
                "answer": "Yes, many successful direct sellers balance it with other commitments."
            },
            {
                "question": "Do I need to hold inventory as a direct seller?",
                "answer": "No, product storage, shipping, and fulfillment are handled by us."
            },
            {
                "question": "How do I build my customer base as a direct seller?",
                "answer": "Through home parties, online events, and social media marketing."
            },
            {
                "question": "How do I get paid as a direct seller?",
                "answer": "Commissions and bonuses through our compensation plan."
            }
        ]
    },
    {
        "title": "Company Differentiation",
        "faqs": [
            {
                "question": "How is Labhkari.com different from others?",
                "answer": "We combine direct selling, ecommerce, and digital marketing, offering unique products and a generous compensation plan."
            }
        ]
    }
];

export default function FAQ() {
    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 md:mt-8 mt-24">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">FAQs</h2>
                    {faqSections.map((section, index) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                            <div className="space-y-4">
                                {section.faqs.map((faq, faqIndex) => (
                                    <FaqItem key={faqIndex} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

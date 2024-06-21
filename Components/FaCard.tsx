import { useState } from 'react';

function FaqItem({ question, answer }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={toggleDropdown}
            >
                <span className="text-lg font-medium text-gray-900">{question}</span>
                <svg
                    className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
        </div>
    );
}

export default FaqItem;

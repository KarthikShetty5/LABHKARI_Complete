'use client'
import React from 'react';

const PaymentFailed = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-700 mb-4">Were sorry, but there was an error processing your payment.</p>
        <p className="text-gray-700 mb-4">Please try again later or contact support.</p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;

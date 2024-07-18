"use client";
import { useState } from "react";

const Index = () => {
  const [pancard, setPancard] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAgreeCheckbox = () => {
    setAgreed(!agreed);
    if (!agreed) {
      setModalIsOpen(true); // Open modal when agreed is true
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      userId: localStorage.getItem("userId"),
      pancard,
      accountNumber,
      ifscCode,
      agreed,
    };

    try {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addkyc";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("KYC form submitted successfully");
    } catch (error) {
      console.error("Error submitting KYC form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">KYC Details</h2>
        <div className="mb-4">
          <label
            htmlFor="pancard"
            className="block text-gray-700 font-bold mb-2"
          >
            PAN Card:
          </label>
          <input
            type="text"
            id="pancard"
            value={pancard}
            onChange={(e) => setPancard(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter PAN Card"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="accountNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Account Number:
          </label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Account Number"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="ifscCode"
            className="block text-gray-700 font-bold mb-2"
          >
            IFSC Code:
          </label>
          <input
            type="text"
            id="ifscCode"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter IFSC Code"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="agree" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={handleAgreeCheckbox}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              I agree to the terms and conditions
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !agreed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!agreed}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Modal for Agreement */}
      {modalIsOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Terms and Conditions for Earning Referral Income and Bonuses
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zm0 1.25a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm2.38 3.56a.75.75 0 10-1.06-1.06L10 8.44 8.69 7.19a.75.75 0 00-1.06 1.06L8.94 10l-1.31 1.31a.75.75 0 101.06 1.06L10 11.06l1.31 1.25a.75.75 0 101.06-1.06L11.06 10l1.31-1.31z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <p className="text-gray-700">
                Welcome to Labhkari.com! By participating in our referral
                program and earning bonuses, you agree to comply with and be
                bound by the following terms and conditions. Please read them
                carefully. If you do not agree with any part of these terms, you
                should not participate in our referral program.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4">
                <li>
                  Eligibility: To earn referral income and bonuses, you must be
                  at least 18 years old, have a registered account on
                  Labhkari.com, accept these Terms and Conditions, provide your
                  PAN (Permanent Account Number) for tax purposes, and have a
                  valid bank account for payments. Business entities must
                  provide a GSTIN (Goods and Services Tax Identification
                  Number).
                </li>
                <li>
                  Account Registration: You must provide accurate and complete
                  information during registration. Maintain the confidentiality
                  of your account login details.
                </li>
                <li>
                  Referral Program: Earn referral income for new users who
                  register and make purchases using your referral link. Income
                  is based on their purchase value. Labhkari may modify income
                  structures.
                </li>
                <li>
                  Performance Bonuses: Earn bonuses based on sales and
                  referrals. Meet minimum sales thresholds. Bonuses range from
                  3% to 21% and are credited monthly.
                </li>
                <li>
                  Additional Bonuses: Leadership Bonuses (up to 10%),
                  Travel/House/Car Fund (up to 4%), and eShop Carriage & Freight
                  (up to 5%).
                </li>
                <li>
                  Sharing Products: Share products with your referral code on
                  social media, adhering to Labhkaris guidelines.
                </li>
                <li>
                  Compliance with Laws: Comply with all laws and regulations
                  related to direct selling and digital marketing. Avoid
                  deceptive practices.
                </li>
                <li>
                  Termination: Labhkari may terminate your participation for
                  violating terms. You can close your account anytime.
                </li>
                <li>
                  Modification of Terms: Labhkari may modify terms at any time.
                  Your continued participation implies acceptance.
                </li>
                <li>
                  Limitation of Liability: Labhkari shall not be liable for any
                  indirect, incidental, special, or consequential damages
                  arising out of or in connection with these terms. Labhkaris
                  total liability to you for any damages arising from these
                  terms shall not exceed the amount of referral income and
                  bonuses earned by you.
                </li>
                <li>
                  Governing Law: These terms and conditions shall be governed by
                  and construed in accordance with the laws of India. Any
                  disputes arising out of these terms shall be subject to the
                  exclusive jurisdiction of the courts in Haryana, India.
                </li>
                <br></br>
                <span>
                  By agreeing to these terms and conditions, you confirm your
                  understanding and acceptance of the rules and regulations
                  governing the earning of referral income and bonuses on
                  Labhkari.com.
                </span>
                  <p>Thank you for being a valued member of Labhkari.
                  We look forward to your success in our program!</p>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal} // This should trigger form submit logic
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !agreed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!agreed}
              >
                Agree and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

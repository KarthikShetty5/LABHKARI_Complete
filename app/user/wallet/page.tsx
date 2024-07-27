"use client";
import Image from "next/image";
import Link from "next/link";
import logo2 from "../../../assets/logo2.png";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

interface Wallet {
  WalletId: string;
  referralIncome: number;
  promos: string;
  performanceBonus: number;
  eShopEarning: number;
  leaderShipBonus: number;
  otherFund: number;
  points: number;
  userId: string;
}

const Home = () => {
  const [exists, setExists] = useState(false);
  const [data, setData] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const fetchKycDetails = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/kycexist";
      const res = await axios.post(url, { userId });
      setExists(!res.data.success);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchWalletDetails = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    try {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getwalletdetails";
      const res = await axios.post(url, { userId });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycDetails();
    fetchWalletDetails();
  }, []);

  return (
    <>
      <div className="bg-red-500 text-white text-center py-2 font-semibold md:mt-16 mt-32">
        Our wallet page is under development—it may show incorrect numbers
      </div>
      <Navbar onSearch={() => {}} />
      <div className="min-h-screen bg-gray-100 text-black md:mt-1 mt-3 md:mb-0 mb-36">
        {!exists && (
          <div className="md:mt-8 mt-36 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 fill-current mr-2 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-semibold">
                  Activate your wallet by adding KYC details
                </p>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link href={"/user/kyc"}>Activate</Link>
              </button>
            </div>
          </div>
        )}
        <div className="pt-20 px-4">
          <div className="bg-[#103178] text-white rounded-lg p-6">
            <div className="text-lg">My Wallet Balance</div>
            <div className="text-2xl font-bold">
              ₹ {data ? (data.referralIncome + data.otherFund + data.leaderShipBonus + data.eShopEarning + data.performanceBonus) : '00.00'}
            </div>
            <button onClick={fetchWalletDetails} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Refresh Wallet
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md">
              <svg
                className="w-8 h-8 text-[#103178]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-2 text-sm font-medium">Add</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md">
              <svg
                className="w-8 h-8 text-[#103178]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L12 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 15L12 22L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-2 text-sm font-medium">Withdraw</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">Referral Income</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.referralIncome : "0.00"}`}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">Promos/Offers</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.promos : "0.00"}`}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">Performance Bonus</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.performanceBonus : "0.00"}`}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">eShop Earnings</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.eShopEarning : "0.00"}`}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">Leadership Bonus</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.leaderShipBonus : "0.00"}`}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-bold">Other Fund</div>
              <div className="text-xl font-bold text-[#103178]">
                {loading ? "Refreshing..." : `₹ ${data ? data.otherFund : "0.00"}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

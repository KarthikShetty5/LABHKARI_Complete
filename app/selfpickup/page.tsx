// 'use client';
// import Footer from '@/Components/Footer';
// import Navbar from '@/Components/Navbar';
// import { Suspense } from 'react';

// const PageContent: React.FC = () => {
//     return (
//         <>
//             <Navbar onSearch={() => { }} />
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
//                     <h1 className="text-3xl font-bold text-center mb-4">This Page is</h1>
//                     <h1 className="text-2xl font-bold text-center mb-4">Under Progress</h1>
//                     <p className="text-lg text-center mb-8">We will get back to you soon.</p>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// const Page: React.FC = () => {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <PageContent />
//         </Suspense>
//     );
// };

// export default Page;









'use client';
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

declare global {
    interface Window {
        Razorpay: any; // or specify the type if known
    }
}

interface Address {
    id: number;
    _id: number;
    name: string;
    address: string;
    phoneNumber: string;
    state: string;
    country: string;
    landmark: string;
    pinCode: string;
    city: string;
    tag: string;
}

interface User {
    name: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    birthdate: string;
    gender: string;
    language: string;
    timezone: string;
}

const PaymentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const amount = searchParams ? parseFloat(searchParams.get('amount') || '0') : 0;
    const gst = searchParams ? parseFloat(searchParams.get('gst') || '0') : 0;
    const shipcost = searchParams ? parseFloat(searchParams.get('shipc') || '0') : 0;
    const count = searchParams ? parseInt(searchParams.get('count') || '0', 10) : 0;
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [uid, setUid] = useState('');
    const [userSelector, setUserSelector] = useState<boolean>();
    const [idsString, setIdsString] = useState<string>('');

    const [user, setUser] = useState<User>({
        name: '',
        fullName: '',
        email: '',
        phone: '',
        avatar: '',
        birthdate: '',
        gender: '',
        language: '',
        timezone: '',
    });

    useEffect(() => {
        const idsArray = searchParams ? searchParams.getAll('ids') : [];
        const idsString = idsArray.join(',');
        setIdsString(idsString);

        const qtysArray = searchParams ? searchParams.getAll('qtys') : [];
        const qtysString = qtysArray.join(',');
        setQuantitiesString(qtysString);

        const amtsArray = searchParams ? searchParams.getAll('amts') : [];
        const amtsString = amtsArray.join(',');
        setAmountsString(amtsString);
        
    }, [searchParams]);
    
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        state: '',
        country: '',
        landmark: '',
        pinCode: '',
        city: '',
        paymentMethod: 'qr',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        email: '',
        tag: 'Home'
    });

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [quantitiesString, setQuantitiesString] = useState<string>('');
    const [amountsString, setAmountsString] = useState<string>('');

    const fetchAddresses = async () => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchorderid";
        try {
            const response = await axios.post(url, {
                userId: localStorage.getItem('userId')
            });
            setAddresses(response.data.data);
        } catch (error) {
            alert('Error fetching addresses:');
        }
    };

    useEffect(() => {
        const uid = localStorage.getItem('userId');
        if (uid !== '12345') {
            fetchAddresses();
        }
        setUid(uid || '')
    }, []);

    useEffect(() => {
        if (uid) {
            const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getuserid";
            const fetchUserData = async () => {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId:uid }),
                });
                const data = await response.json();
                setUser(data.data);
                console.log('data',data.data)
            };
            fetchUserData();
        }
    }, [uid]);

    useEffect(() => {
        console.log(selectedAddress?._id)
    })



    function generateRandomEmail() {
        const emailDomain = 'gmail.com';
        const emailPrefix = 'user';
        const randomNum = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
        const randomEmail = `${emailPrefix}${randomNum}@${emailDomain}`;
        return randomEmail;
    }

    const handleSign = async (phone: string, email: string) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/register";
        try {
            const response = await axios.post(url, {
                name: formData.name,
                email: email || generateRandomEmail(),
                phone: phone,
                password: "",
                referralId: localStorage.getItem('ref') || " "
            })
            if (response.data.success) {
                localStorage.setItem('userId', response.data.user.userId);
            }
        } catch (error) {
            alert("Error please try again")
            console.log(error)
        }
    }

    const generateOtp = async (phone: string) => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/otp";
        try {
            await axios.post(otpUrl, {
                sendOTP: true,
                phone: phone
            });
            alert('OTP has been sent to your phone number.');
            setIsOtpModalOpen(true);
        } catch (error) {
            alert('Error generating OTP.');
        }
    };

    const verifyOtp = async (phone: string, otp: string) => {
        const otpUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/otp";
        try {
            const response = await axios.post(otpUrl, {
                sendOTP: false,
                phone: phone,
                token: otp
            });
            console.log(response.data)
            setIsOtpVerified(true);
            return response.data.success === true;
        } catch (error) {
            alert('Error verifying OTP.');
            return false;
        }
    };

    const handleRef = async (phone: string) => {
        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getphoneref";
        try {
            const response = await axios.post(url, {
                phone: phone,
            })
            if (response.data.success) {
                localStorage.setItem('userId', response.data.data);
            }
        } catch (error) {
            alert("Error please try again")
        }
    }

    const handleOtpSubmit = async () => {
        const phone = formData.phoneNumber;
        const email = formData.email;
        const isValidOtp = await verifyOtp(phone, otp);
        if (isValidOtp) {
            if (!userSelector) {
                alert('OTP verified successfully.');
                handleSign(phone, email)
                setIsOtpModalOpen(false);
                fetchAddresses();
            } else {
                alert('OTP verified successfully.');
                setIsOtpModalOpen(false);
                handleRef(phone);
                fetchAddresses();
            }
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleChange = async (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'phoneNumber' && value.length === 10 && !value.startsWith('0')) {
            const userId = localStorage.getItem('userId');
            if (1) {
                const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/fetchusernumber";
                try {
                    const response = await axios.post(url, { phone: value });
                    if (response.data.success) {
                        const userConfirmed = window.confirm(`Do you want to continue as ${response.data.data.name}?`);
                        if (userConfirmed) {
                            setUserSelector(true);
                            generateOtp(value);
                            setUid(response.data.data.userId)
                        } else {
                            setUserSelector(false);
                            alert("Logging you as new User")
                            generateOtp(value);
                        }
                    } else {
                        setUserSelector(false);
                        alert("Logging you as new User")
                        generateOtp(value);
                    }
                } catch (error) {
                    setUserSelector(false);
                    alert("Logging you as new User")
                    generateOtp(value);
                }
            }
        }
    };


    const handleSubmit = async (orderId: any, email: string, amount: any, amountPaid: any, userId: string | null, shippingAddress: string, phone: string, name: string, state: string, country: string, landmark: string, city: string, tag: string, pinCode: string) => {

        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addorder";
        try {
            const res = await axios.post(url, {
                orderId: orderId,
                email: email,
                amount: amount,
                name: name,
                phone: phone,
                amountPaid: amountPaid,
                userId: userId,
                itemCount: count,
                shippingAddress: shippingAddress,
                state: state,
                country: country,
                landmark: landmark,
                city: city,
                tag: tag || "Home",
                pinCode: pinCode,
                productId:idsString || " ",
                quantity:quantitiesString || '',
                productAmount:amountsString || ''
            });
        } catch (error) {
            console.log(error)
            alert("Error placing the order")
        }
    };

    const handlePayment = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (formData) {
            const url = process.env.NEXT_PUBLIC_SERVER_URL + "/payment/getkey";
            const curl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/payment";
            const rurl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/paymentv";

            const { data: { order } } = await axios.post(curl, {
                amount: amount + shipcost
            });

            await handleSubmit(order.id, formData?.email || user?.email || '', amount + shipcost, true, localStorage.getItem('userId'), formData?.address || " ", formData?.phoneNumber || user?.phone || ' ', formData?.name || user?.name || ' ', ' ', ' ',  ' ',' ', ' ', ' ');

            localStorage.setItem('order', order.id);

            const options = {
                key: process.env.RAZORPAY_KEY_ID || '',
                amount: order.amount,
                currency: "INR",
                name: "Labhkari",
                description: "Your paying this amount to Labhkari",
                image: "https://labhkari.s3.ap-south-1.amazonaws.com/1721671728201-labhkari.logo.png",
                order_id: order.id,
                callback_url: rurl,
                prefill: {
                    name: formData.name,
                    contact: formData.phoneNumber,
                    pin: formData.pinCode
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#103178"
                }
            };

            console.log('options',options)
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on("payment.failed", function () {
                alert("Payment failed. Please try again. Contact support for help")
            });
        }
    };

    const handleTagChange = (selectedTag: string) => {
        setFormData({
            ...formData,
            tag: selectedTag
        });
    };

    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <>
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP"
                            className="border p-2 rounded-md w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={() => setIsOtpModalOpen(false)} className="mr-2 p-2 border rounded-md bg-gray-300">Close</button>
                            <button onClick={handleOtpSubmit} className="p-2 border rounded-md bg-blue-500 text-white">Verify</button>
                        </div>
                    </div>
                </div>
            )}
            <Navbar onSearch={() => { }} />
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="flex flex-col md:flex-row p-4 md:p-8 bg-gray-50 min-h-screen md:mt-16 mt-36 mb-10">
                <div className="w-full md:w-2/3">
                    <div className="flex items-center mb-4">
                        <AiOutlineArrowLeft className="text-lg mr-2 cursor-pointer" />
                        <h1 className="text-xl font-semibold" onClick={handleBackClick}>Shipping Details</h1>
                    </div>

                    {uid === '12345' &&
                        <>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <>
                                <hr className="my-6" />
                                <h2 className="text-lg font-semibold mb-4">Enter Contact Details</h2>
                                <form onSubmit={handlePayment} className="grid gap-4">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded-md" required />
                                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded-md" required />
                                </form>
                            </>
                        </div>
                        </>
                    }
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Amount:</span>
                            <span>₹{amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>GST:</span>
                            <span>₹{gst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping Cost:</span>
                            <span>₹{shipcost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>₹{(amount + shipcost).toFixed(2)}</span>
                        </div>
                    </div>
                    {(isOtpVerified || uid != '12345') && (
                        <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full">
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

const Page: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPage />
        </Suspense>
    );
};

export default Page;

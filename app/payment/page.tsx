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

const PaymentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const amount = searchParams ? parseFloat(searchParams.get('amount') || '0') : 0;
    const gst = searchParams ? parseFloat(searchParams.get('gst') || '0') : 0;
    const shipcost = searchParams ? parseFloat(searchParams.get('shipc') || '0') : 0;
    const count = searchParams ? parseInt(searchParams.get('count') || '0', 10) : 0;
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [uid, setUid] = useState('');
    const [userSelector, setUserSelector] = useState<boolean>();

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
    }, []);

    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
        setFormData({
            ...formData,
            name: address.name,
            address: address.address,
            phoneNumber: address.phoneNumber,
            state: address.state,
            country: address.country,
            landmark: address.landmark,
            pinCode: address.pinCode,
            city: address.city,
            tag: address.tag
        });
        setShowNewAddressForm(false);
    };

    const handleNewAddressSelect = () => {
        setSelectedAddress(null);
        setFormData({
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
        setShowNewAddressForm(true);
    };

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
        const url = `https://2factor.in/API/V1/${process.env.NEXT_PUBLIC_2FACTOR_API_KEY}/SMS/${phone}/AUTOGEN2/${process.env.NEXT_PUBLIC_OTP_TEMPLATE_NAME}`;
        try {
            await axios.get(url);
            alert('OTP has been sent to your phone number.');
            setIsOtpModalOpen(true);
        } catch (error) {
            alert('Error generating OTP.');
        }
    };

    const verifyOtp = async (phone: string, otp: string) => {
        const url = `https://2factor.in/API/V1/${process.env.NEXT_PUBLIC_2FACTOR_API_KEY}/SMS/VERIFY3/${phone}/${otp}`;
        try {
            const response = await axios.get(url);
            return response.data.Status === 'Success';
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

        if (name === 'phoneNumber' && value.length === 10) {
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

    const handlePinCodeBlur = async () => {
        const pincode = formData.pinCode;
        if (pincode.length === 6) {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const postOffice = response.data[0]?.PostOffice?.[0];
            if (postOffice) {
                setFormData({
                    ...formData,
                    state: postOffice.State,
                    country: postOffice.Country,
                    city: postOffice.District
                });
            } else {
                alert('Invalid pincode');
            }
        }
    };

    const handleSubmit = async (orderId: any, email: string, amount: any, amountPaid: any, userId: string | null, shippingAddress: string, phone: string, name: string, state: string, country: string, landmark: string, city: string, tag: string, pinCode: string) => {

        const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addShipway";
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
                pinCode: pinCode
            });
        } catch (error) {
            alert("Error placing the order")
        }
    };

    const isFormValid = () => {
        const { name, address, phoneNumber, state, country, pinCode, city, email } = formData;
        return name && address && phoneNumber && state && country && pinCode && city && email;
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

            await handleSubmit(order.id, formData.email, order.amount, true, localStorage.getItem('userId'), formData.address, formData.phoneNumber, formData.name, formData.state, formData.country, formData.landmark, formData.city, formData.tag, formData.pinCode);


            localStorage.setItem('order', order.id);

            const options = {
                key: process.env.RAZORPAY_KEY_ID || '',
                amount: order.amount,
                currency: "INR",
                name: "Labhkari",
                description: "Your paying this amount to Labhkari",
                image: "https://th.bing.com/th/id/R.d19fc8033978f7ba694994af8d413037?rik=S65%2f9ke1xQqbzw&riu=http%3a%2f%2frndr.juniqe-production.juniqe.com%2fmedia%2fcatalog%2fproduct%2fcache%2fx800%2f265%2f132%2f265-132-101P.jpg&ehk=uEsPKOlz8MlF8gJi44a%2fK5tBQJdSlmHy%2fyMcriONBV0%3d&risl=&pid=ImgRaw&r=0",
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
                    "color": "#121212"
                }
            };

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
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Select Address</h2>
                        {addresses && addresses.map((address, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="radio"
                                    id={`address-${index}`}
                                    name="address"
                                    value={address.id}
                                    onChange={() => handleAddressSelect(address)}
                                    checked={selectedAddress ? selectedAddress.id === address.id : false}
                                    className="mr-2"
                                />
                                <label htmlFor={`address-${index}`}>
                                    <div>
                                        <span className="font-semibold">{address.name}</span> - {address.phoneNumber}
                                    </div>
                                    <div>{address.address}</div>
                                    <div>{address.city}, {address.state}, {address.country}, {address.pinCode}</div>
                                    <div>{address.tag}</div>
                                </label>
                            </div>
                        ))}
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="new-address"
                                name="address"
                                value="new"
                                onChange={handleNewAddressSelect}
                                checked={showNewAddressForm}
                                className="mr-2"
                            />
                            <label htmlFor="new-address">Add New Address</label>
                        </div>
                        {showNewAddressForm && (
                            <>
                                <hr className="my-6" />
                                <h2 className="text-lg font-semibold mb-4">New Address Details</h2>
                                <form onSubmit={handlePayment} className="grid gap-4">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded-md" required />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded-md" required />
                                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded-md" required />
                                    <input type="text" name="pinCode" value={formData.pinCode} onBlur={handlePinCodeBlur} onChange={handleChange} placeholder="Pin Code" className="border p-2 rounded-md" required />
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded-md" required />
                                    <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" className="border p-2 rounded-md" required />
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-2 rounded-md" required />
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="border p-2 rounded-md" required />
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded-md" required />

                                    <label>Tag:</label>
                                    <select name="tag" value={formData.tag} onChange={(e) => handleTagChange(e.target.value)} className="border p-2 rounded-md">
                                        <option value="Home">Home</option>
                                        <option value="Office">Office</option>
                                        <option value="Other">Other</option>
                                    </select>


                                </form>
                            </>
                        )}
                    </div>
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
                    {(selectedAddress || showNewAddressForm) && (
                        <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full" disabled={!isFormValid()}>
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

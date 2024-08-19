'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import NavbarAdmin from '@/Components/NavbarAdmin';

interface OrderDetails {
  orderId: string;
  city: string;
  name: string;
  shippingAddress: string;
  pinCode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  itemCount: number;
  amount: number;
  weight: number;
  productAmount: number;
  productId: string;
}

interface ProductResponse {
  data: { title: string }[]; // Adjust this structure according to the actual API response
}

const OrderPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get('orderId') || null : null;

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [dimensions, setDimensions] = useState({
    length: '',
    breadth: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const response = await axios.post<{ data: OrderDetails[] }>(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getorderid`, { orderId });
          const order = response.data.data[0];
          setOrderDetails(order);
          if (order.productId) {
            fetchProductName(order.productId);
          }
        } catch (error) {
          console.error('Failed to fetch order details:', error);
        }
      }
    };

    const fetchProductName = async (productId: string) => {
      try {
        const response = await axios.post<ProductResponse>(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getproductid`, { customId: productId });
        setProductName(response.data.data[0].title);
      } catch (error) {
        console.error('Failed to fetch product name:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/addShip`;

    if (orderDetails) {
      try {
        await axios.post(url, {
          orderId: orderDetails.orderId,
          city: orderDetails.city,
          billing_customer_name: orderDetails.name,
          billing_address: orderDetails.shippingAddress,
          billing_pincode: orderDetails.pinCode,
          billing_state: orderDetails.state,
          billing_country: orderDetails.country,
          billing_email: orderDetails.email,
          billing_phone: orderDetails.phone,
          quantity: orderDetails.itemCount,
          amount: orderDetails.amount,
          shipping_charges: orderDetails.amount,
          length: dimensions.length,
          breadth: dimensions.breadth,
          height: dimensions.height,
          weight: dimensions.weight,
          product_name: productName,
        });
        alert('Order sent to Shiprocket successfully!');
      } catch (error: any) {
        console.error('Failed to send order to Shiprocket:', error.message);
        alert('Failed to send order.');
      }
    }
  };

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <>
    <NavbarAdmin/>
    <div className="max-w-lg mx-auto p-5">
      <div className="shadow-lg p-6 rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Order Details for {orderId}</h1>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Billing Address:</strong> {orderDetails.shippingAddress}, {orderDetails.city}, {orderDetails.state} - {orderDetails.pinCode}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Quantity:</strong> {orderDetails.itemCount}</p>
        <p><strong>Amount:</strong> {orderDetails.amount}</p>
        <p><strong>Product Name:</strong> {productName}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Enter Package Dimensions</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1">Length (cm):</label>
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Breadth (cm):</label>
            <input
              type="number"
              name="breadth"
              value={dimensions.breadth}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Height (cm):</label>
            <input
              type="number"
              name="height"
              value={dimensions.height}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={dimensions.weight}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Send to Shiprocket
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

const Page: React.FC = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <OrderPage />
      </Suspense>
  );
};

export default Page;

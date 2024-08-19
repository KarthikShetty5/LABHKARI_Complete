"use client";
import axios from "axios";
import { urlToUrlWithoutFlightMarker } from "next/dist/client/components/app-router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../assets/logo3.png";
import Image from "next/image";

interface Order {
  orderId: string;
  email: string;
  name: string;
  phone: string;
  amount: number;
  amountPaid: boolean;
  state: string;
  country: string;
  landmark: string;
  city: string;
  userId: string;
  itemCount: number;
  tag: string;
  pinCode: number;
  shippingAddress: string;
  productId: string;
  quantity:string;
  productAmount:string;
}

interface Product {
  data: any;
  productId: string;
  title: string;
  batchId: string;
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

interface ProductSchema {
  data: any;
  batchId: string;
  gstIn: number;
}

const Page = () => {
  const searchParams = useSearchParams();
  const success = searchParams ? searchParams.get("success") : null;

  useEffect(() => {
    const handler = async () => {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/order";
      const oid = localStorage.getItem("order");
      try {
        await axios.post(url, {
          order_id: oid,
        });
      } catch (e) {
        console.log(e);
        alert("Error adding order");
      }
    };
    if (success) {
      handler();
    }
  }, [success]);




  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [orderId, setOrderId] = useState('');

  const [product, setProduct] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<string[]>([]);

  const [gstIn, setGstIn] = useState<number | null>(null);
  const [uid,setUid] = useState('');
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
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);

    // Fetch order details by orderId
    const oid = localStorage.getItem("order");

    const fetchOrderDetails = async () => {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getorderid";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: oid, // Replace with actual orderId
          }),
        });
        const data: { data: Order[] } = await response.json();
        const orderData = data.data[0];

        console.log('order data',orderData)

        setOrder(orderData);
        setOrderId(orderData.orderId)

        const qtys = orderData.quantity.split(',').map((qty) => qty.trim());
        setQuantity(qtys)

        const amts = orderData.productAmount.split(',').map(amt => amt.trim());
        setAmounts(amts)

        const productResponse = await fetch (
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getproductid`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customId: orderData.productId }),
          }
        );
        
        const productData: Product = await productResponse.json();
        setProduct(productData.data);

        console.log('product data',productData.data)

        // const fetchProductDetails = async (productIds:string) =>{
        //   const idsArray = productIds.split(',');
        //   const products = [];

        //   for (const id of idsArray){
        //     const productResponse = await fetch(
        //       `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getdetails`,
        //       {
        //         method:"POST",

        //         headers:{
        //           "Content-Type":"application/json",
        //         },
        //         body: JSON.stringify({customId:id.trim()})
        //       }
        //     )
        //     const productData: Product = await productResponse.json();
        //     products.push(productData.data)
        //   }

        //   setProduct(products);

        // }

        // await fetchProductDetails(order?.productId)


        // Fetch GST information using batchId
        
        const gstResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getpurchase`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ batchId: productData.data[0].batchId[0] }),
          }
        );
        const gstData: ProductSchema = await gstResponse.json();
        console.log('gst res',gstData)

        setGstIn(gstData.data[0].gstIn);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const generateSuccessSms = async (phone: string) => {
    const smsUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/ordersuccessSMS";
      try {
          const orderId = localStorage.getItem('order')
          await axios.post(smsUrl, {
              phone: phone,
              orderId:orderId,
              url: 'https://labhkari.com/orders'
          });
          alert('Success message has been sent to your phone number.');
      } catch (error) {
          alert('Error generating Success message.');
      }
  };

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    if (uid !== '12345') {
      setUid(uid || '')
    }
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
              generateSuccessSms(data.data.phone)
          };
          fetchUserData();
      }
  }, [uid]);

  const downloadPdf = () => {
    const input = invoiceRef.current;
    if (input) {
      html2canvas(input, { scale: 5 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imageRatio = imgProps.width / imgProps.height;
        const pageRatio = pdfWidth / pdfHeight;
  
        let width, height, x, y;
  
        if (imageRatio > pageRatio) {
          width = pdfWidth;
          height = pdfWidth / imageRatio;
          x = 0;
          y = (pdfHeight - height) / 2;
        } else {
          height = pdfHeight;
          width = pdfHeight * imageRatio;
          x = (pdfWidth - width) / 2;
          y = 0;
        }
  
        // Adjust the image position to avoid cutting off parts of the table
        if (height > pdfHeight) {
          y = 0;
        }
  
        pdf.addImage(imgData, "PNG", x, y, width, height);
        pdf.save("invoice.pdf");
      }).catch((error) => {
        console.error("Error generating PDF:", error);
      });
    }
  };
  
  
  
  
  

  const numberToWords = (num: any) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const belowHundred = (n: number) =>
      n < 10
        ? units[n]
        : n < 20
        ? teens[n - 11]
        : tens[Math.floor(n / 10)] + (n % 10 ? " " + units[n % 10] : "");

    const belowThousand = (n: number) =>
      n < 100
        ? belowHundred(n)
        : units[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + belowHundred(n % 100) : "");

    if (num === 0) return "Zero";

    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);

    return `${belowThousand(integerPart)} ${
      decimalPart ? `and ${belowThousand(decimalPart)} Paise` : ""
    }`.trim();
  };

  return (
    <div className="container mx-auto">
      <div
        ref={invoiceRef}
        className="max-w-5xl mx-auto bg-white p-5 shadow-lg rounded-lg border"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <Image src={Logo} width={210} height={310} alt="logo" />
          <div className="text-center sm:text-right mt-4 sm:mt-0">
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-sm">No: {order?.orderId || "Loading..."}</p>
            <p className="text-sm">Date: {currentDate}</p>
            <p className="text-sm">GSTIN: {gstIn}</p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-row justify-between mb-6">
          <div className="mb-4 sm:mb-0 text-center">
            <h2 className="font-semibold">Billing Address</h2>
            <p>{order?.name || "Loading..."}</p>
            <p>
              {order?.shippingAddress || "Loading..."}, {order?.pinCode || ""}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <h2 className="font-semibold">Shipping Address</h2>
            <p>{order?.name || "Loading..."}</p>
            <p>
              {order?.shippingAddress || "Loading..."}, {order?.pinCode || ""}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[120px] text-center bg-white border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-center">ITEMS</th>
                <th className="border-b py-2 text-center">PRICE</th>
                <th className="border-b py-2 text-center">CGST</th>
                <th className="border-b py-2 text-center">SGST</th>
                <th className="border-b py-2 text-center">QTY</th>
                <th className="border-b py-2 text-center">TOTAL</th>
              </tr>
            </thead>
          <tbody>
          {product ? (
              product.map((prod,index) => (
                <tr key={index}> {/* Adding a unique key is also recommended */}
                  <td className="border-t px-4 py-2">{prod.title}</td>
                  <td className="border-t px-4 py-2 text-center">
                    ₹{amounts[index] || 0}
                  </td>
                  <td className="border-t px-4 py-2 text-center">{0}%</td>
                  <td className="border-t px-4 py-2 text-center">{0}%</td>
                  <td className="border-t px-4 py-2 text-center">
                    {quantity[index] || 1}
                  </td>
                  <td className="border-t px-4 py-2 text-center">
                    ₹{(Number(amounts[index]) * Number(quantity[index])) || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border-t px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            )}

            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            {numberToWords(order?.amount || 0)} Rupees Only
          </p>
          <div className="flex justify-end">
            <div className="text-right">
              <p>Sub-total: ₹{order?.amount || 0}</p>
              <p className="font-bold">Total: ₹{order?.amount || 0}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p>Thank you for your purchase!</p>
          <p className="text-xs">
            *Computer Generated Invoice, No Signature Required
          </p>
        </div>
      </div>
      <div className="mt-6 text-center sm:text-right">
        <button
          onClick={downloadPdf}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>


  );
};

const PageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default PageWrapper;

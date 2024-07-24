"use client";
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
}

interface Product {
  data: any;
  productId: string;
  title: string;
  batchId: string;
}

interface ProductSchema {
  data: any;
  batchId: string;
  gstIn: number;
}

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [gstIn, setGstIn] = useState<number | null>(null);

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
    const fetchOrderDetails = async () => {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getorderid";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: "order_ObH1b33DDS8u02", // Replace with actual orderId
          }),
        });
        const data: { data: Order[] } = await response.json();
        const orderData = data.data[0];
        setOrder(orderData);

        // Fetch product details using productId
        const productResponse = await fetch(
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
        setProduct(productData.data[0]);

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
        setGstIn(gstData.data[0].gstIn);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const downloadPdf = () => {
    const input = invoiceRef.current;
    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("invoice.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  const numberToWords = (num:any) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    const belowHundred = (n: number) => n < 10 ? units[n] : (n < 20 ? teens[n - 11] : tens[Math.floor(n / 10)] + (n % 10 ? ' ' + units[n % 10] : ''));
  
    const belowThousand = (n: number) => (n < 100 ? belowHundred(n) : units[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + belowHundred(n % 100) : ''));
  
    if (num === 0) return 'Zero';
  
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
  
    return `${belowThousand(integerPart)} ${decimalPart ? `and ${belowThousand(decimalPart)} Paise` : ''}`.trim();
  };


  return (
    <div className="container mx-auto p-4">
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto bg-white p-5 shadow-lg rounded-lg border"
      >
        <div className="flex justify-between items-center mb-0">
          <Image src={Logo} width={210} height={210} alt="logo" />
          <div className="text-right">
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-sm">No: {order?.orderId || "Loading..."}</p>
            <p className="text-sm">Date: {currentDate}</p>
            <p className="text-sm">GSTIN: {gstIn}</p>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="font-semibold">Billing Address</h2>
            <p>{order?.name || "Loading..."}</p>
            <p>
              {order?.shippingAddress || "Loading..."}, {order?.pinCode || ""}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-semibold">Shipping Address</h2>
            <p>{order?.name || "Loading..."}</p>
            <p>
              {order?.shippingAddress || "Loading..."}, {order?.pinCode || ""}
            </p>
          </div>
        </div>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-left">ITEMS</th>
              <th className="border-b py-2 text-right">PRICE</th>
              <th className="border-b py-2 text-right">CGST</th>
              <th className="border-b py-2 text-right">SGST</th>
              <th className="border-b py-2 text-right">QTY</th>
              <th className="border-b py-2 text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {product ? (
              <tr>
                <td className="border-t px-4 py-2">{product.title}</td>
                <td className="border-t px-4 py-2 text-right">
                  ₹{order?.amount || 0}
                </td>
                <td className="border-t px-4 py-2 text-right">{ 0}%</td>
                <td className="border-t px-4 py-2 text-right">{ 0}%</td>
                <td className="border-t px-4 py-2 text-right">
                  {order?.itemCount || 1}
                </td>
                <td className="border-t px-4 py-2 text-right">
                  ₹{order?.amount || 0}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={6} className="border-t px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-sm">{numberToWords(order?.amount || 0)} Rupees Only</p>
          <div className="flex justify-end">
            <div className="text-right">
              <p>Sub-total: ₹{order?.amount || 0}</p>
              {/* <p>Shipping: ₹55</p> */}
              <p className="font-bold">Total: ₹{order?.amount || 0}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p>Thank you for purchase!</p>
          <p className="text-xs">
            *Computer Generated Invoice, No Signature Required
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={downloadPdf}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

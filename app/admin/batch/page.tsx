"use client";
import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/Components/NavbarAdmin";

interface Product {
  _id: string;
  name: string;
  customId: string;
}

interface Var {
  _id: string;
  variation: string;
}

const BatchPage: React.FC = () => {
  const [batchNo, setBatchNo] = useState("");
  const [productId, setProductId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [MRP, setMRP] = useState("");
  const [quantity, setQuantity] = useState("");
  const [variation, setVariation] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [variations, setVariations] = useState<Var[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchVariation();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproduct"
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVariation = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getvar"
      );
      if (response.ok) {
        const data = await response.json();
        setVariations(data.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addbatch";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchNo: batchNo,
          productId: productId,
          expiryDate: expiryDate,
          MRP: MRP,
          manufactureDate: manufactureDate,
          quantity: quantity,
          variation: variation,
        }),
      });

      if (response.ok) {
        alert("Batch successfully added");
        setBatchNo("");
        setProductId("");
        setExpiryDate("");
        setMRP("");
        setManufactureDate("");
        setQuantity("");
        setVariation("");
      } else {
        alert("Failed to add Batch");
      }
    } catch (error) {
      alert("Error adding Batch");
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Batch</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Batch No:</label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter batch No"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Product ID:</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Product ID</option>
                {products &&
                  products.map((product) => (
                    <option key={product._id} value={product.customId}>
                      {product.customId}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Variation:</label>
              <select
                value={variation}
                onChange={(e) => setVariation(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Variation</option>
                {variations &&
                  variations.map((prod) => (
                    <option key={prod._id} value={prod.variation}>
                      {prod.variation}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Quantity"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">MRP:</label>
              <input
                type="text"
                value={MRP}
                onChange={(e) => setMRP(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter MRP"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">
                Manufacture Date:
              </label>
              <input
                type="date"
                value={manufactureDate}
                onChange={(e) => setManufactureDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Expiry Date:</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BatchPage;

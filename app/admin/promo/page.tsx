"use client";
import React, { useEffect, useState } from "react";
import NavbarAdmin from "@/Components/NavbarAdmin";

interface PromotionalForm {
  applicableDate: string; // Assuming applicableDate is a string for simplicity
  batchId: string;
  percentDiscount: number;
  cashAmount: number;
}

interface Batch {
  _id: string;
  batchNo: string;
}

const PromotionalPage: React.FC = () => {
  const [batch, setBatch] = useState<Batch[]>([]);
  const [formData, setFormData] = useState<PromotionalForm>({
    applicableDate: "",
    batchId: "",
    percentDiscount: 0,
    cashAmount: 0,
  });

  useEffect(() => {
    fetchBatch();
  }, []);

  const fetchBatch = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getbatch"
      );
      if (response.ok) {
        const data = await response.json();
        setBatch(data.data);
        console.log(data.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/addpromo";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(formData)
        alert("Promotional details added successfully");
        setFormData({
          applicableDate: "",
          batchId: "",
          percentDiscount: 0,
          cashAmount: 0,
        });
      } else {
        alert("Failed to add promotional details");
      }
    } catch (error) {
      alert("Error adding promotional details");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "percentDiscount" || name === "cashAmount"
          ? parseFloat(value)
          : value,
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Promotional Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">
                Applicable Date:
              </label>
              <input
                type="date"
                name="applicableDate"
                value={formData.applicableDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Batch ID:</label>
              <select
                value={formData.batchId}
                onChange={handleChange}
                name="batchId"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Batch ID</option>
                {batch &&
                  batch.map((product) => (
                    <option key={product._id} value={product.batchNo}>
                      {product.batchNo}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">
                Percent Discount:
              </label>
              <input
                type="number"
                name="percentDiscount"
                value={formData.percentDiscount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Percent Discount"
                required
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
              <label className="block mb-1 text-gray-600">Cash Amount:</label>
              <input
                type="number"
                name="cashAmount"
                value={formData.cashAmount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter Cash Amount"
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

export default PromotionalPage;

'use client';
import NavbarAdmin from '@/Components/NavbarAdmin';
import { useEffect, useState } from 'react';


export interface InventoryItem {
    _id: string;
    productId: string;
    variation: string;
    batchId: string;
    openingQty: number;
    inQty: number;
    outQty: number;
  }
  
  export interface InventoryResponse {
    data: InventoryItem[];
  }

const InventoryPage = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/getinventory`);
        const data = await response.json();
        setInventory(data.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
   <>
   <NavbarAdmin/>
   <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map(item => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Product ID: {item.productId}</h2>
            <p className="text-gray-600 mb-1">Variation: {item.variation}</p>
            <p className="text-gray-600 mb-1">Batch ID: {item.batchId}</p>
            <p className="text-gray-600 mb-1">Opening Quantity: {item.openingQty}</p>
            <p className="text-gray-600 mb-1">In Quantity: {item.inQty}</p>
            <p className="text-gray-600 mb-1">Out Quantity: {item.outQty}</p>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default InventoryPage;

"use client";
import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "@/Components/Footer";
import { useCart } from "@/context/CartContext";

interface Item {
  description: string;
  customId: number;
  title: string;
  count: number;
  userId: string;
  image: string;
  prices: number[];
  ratings: number;
  tags: string[];
  path: string;
  gsts: string[];
  shipc: string;
  weights: string[];
  variations: string[];
  batchId: string[];
}

interface CartItem {
  customId: number;
  title: string;
  price: number;
  ref: string;
  image: string;
  gst: string;
  weight: string;
  count: number;
  userId: string;
  variation: string;
}

const PageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("customId") : null;
  const [data, setData] = useState<Item[]>([]);
  const ref = searchParams ? searchParams.get("ref") : "";
  const { addToCart } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedGst, setSelectedGst] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [availability, setAvailability] = useState<string>("OUT");
  const [batchId, setBatchId] = useState<string>("");
  const [promotion, setPromotion] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Loader state
  

  useEffect(() => {
    if (ref) {
      localStorage.setItem("ref", ref);
    }
  }, [ref]);

  useEffect(() => {
    const handleCart = async () => {
      const url = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getproductid";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customId: id }),
        });
        const res = await response.json();
        setData(res.data);
        console.log('prod data',res.data)
        if (res.data[0].variations.length > 0) {
          setSelectedVariation(res.data[0].variations[0]);
          setSelectedPrice(res.data[0].prices[0]);
          setSelectedGst(res.data[0].gsts[0]);
          setSelectedWeight(res.data[0].weights[0]);
          setAvailability(res.data[0].tags[0]);
          setBatchId(res.data[0].batchId[0]);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        alert("Error occurred");
        setLoading(false); // Set loading to false even if there is an error
      }
    }
    if (id) {
      handleCart();
    }
  }, [id]);

  useEffect(() => {
    const fetchPromotion = async () => {
      if (batchId) {
        const promoUrl = process.env.NEXT_PUBLIC_CLIENT_URL + "/api/getpromo";
        try {
          const response = await fetch(promoUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ batchId }),
          });
          const res = await response.json();
          if (res.data[0] && res.data[0].percentDiscount) {
            setPromotion(res.data[0].percentDiscount);
            setOriginalPrice(selectedPrice);
            setSelectedPrice(selectedPrice - (selectedPrice * res.data[0].percentDiscount) / 100);
          }
        } catch (error) {
          console.error("Error fetching promotion:", error);
        }
      }
    };
    fetchPromotion();
  }, [batchId]);

  const handleVariationChange = (variation: string) => {
    const index = data[0].variations.indexOf(variation);
    if (index !== -1) {
      setSelectedVariation(variation);
      setSelectedPrice(data[0].prices[index]);
      setSelectedGst(data[0].gsts[index]);
      setSelectedWeight(data[0].weights[index]);
      setAvailability(data[0].tags[index]);
      setBatchId(data[0].batchId[index]);
    }
  };

  const [pincode, setPincode] = useState<string>("");
  const [isPincodeValid, setIsPincodeValid] = useState<boolean>(false);

  const handlePincodeCheck = () => {
    // Add logic to check pincode validity (e.g., API call)
    setIsPincodeValid(true); // Set to true for demonstration
  };

  const handleAddToCart = async (
    event: any,
    title: string,
    image: string,
    price: number,
    gst: string,
    weight: string
  ) => {
    event.preventDefault();
    const customIdNumber = id ? parseInt(id) : NaN;
    if (isNaN(customIdNumber)) {
      alert("Invalid Product Id");
      return;
    }

    const item: CartItem = {
      customId: customIdNumber,
      title: title,
      price: price,
      ref: ref ? ref : "",
      image: image,
      gst: gst,
      weight: weight,
      variation: selectedVariation,
      count: 1,
      userId: localStorage.getItem("userId") || " ",
    };

    console.log("product", item);

    try {
      await addToCart(item);
      alert("Added to Cart successfully");
    } catch (error) {
      alert("Failed to add to Cart");
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading Product...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar onSearch={() => {}} />
      {data.length > 0 && (
        <div className="py-8 md:mt-24 mt-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="md:h-auto rounded-lg bg-gray-300 dark:bg-black mb-4">
                  <Image
                    className="w-full rounded-lg shadow-lg"
                    width={500}
                    height={500}
                    src={data[0].image}
                    alt="Product Image"
                  />
                </div>
                <div className="flex -mx-2 ">
                  <div className="w-full px-2">
                    <button
                      className="w-full bg-[#103178] text-white md:py-2 py-3 px-4 rounded-full font-bold hover:bg-[#103178]"
                      onClick={(e) =>
                        handleAddToCart(
                          e,
                          data[0].title,
                          data[0].image,
                          selectedPrice,
                          selectedGst,
                          selectedWeight
                        )
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4 mt-3">
                {promotion > 0 && (
                  <div className="bg-yellow-100 text-yellow-900 p-4 mb-4 rounded-lg shadow-lg">
                    Special Offer! {promotion}% off on this product.
                  </div>
                )}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <h2 className="text-2xl font-bold text-black dark:text-black mb-2">
                    {data[0].title}
                  </h2>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-8">
                      <span className="font-bold text-gray-700 dark:text-black mr-2">
                        Rating :
                      </span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= data[0].ratings ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0l2.42 6.06L18 7.24l-5.2 4.5 1.55 6.65L10 15.4 5.65 18.4l1.55-6.65L2 7.24 7.58 6.06 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0l2.42 6.06L18 7.24l-5.2 4.5 1.55 6.65L10 15.4 5.65 18.4l1.55-6.65L2 7.24 7.58 6.06 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-black mr-2">
                        Availability :
                      </span>
                      {availability === "IN" ? (
                        <span className="text-green-900">Available</span>
                      ) : (
                        <span className="text-red-900">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <span className="font-bold text-gray-700 dark:text-black">
                    Product Description:
                  </span>
                  <p className="text-black dark:text-black text-sm mt-2">
                    {data[0].description}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <div className="flex flex-row items-center mt-12">
                    <div className="flex-1 mb-4 md:mb-0">
                      <span className="text-2xl leading-none align-baseline">
                        ₹{" "}
                      </span>
                      {promotion > 0 && (
                        <span className="line-through text-red-500 mr-2">
                          {originalPrice}
                        </span>
                      )}
                      <span className="font-bold text-5xl leading-none align-baseline">
                        {selectedPrice}
                      </span>
                      <span className="text-2xl leading-none align-baseline">
                        
                      </span>
                    </div>
                    <div className="flex-1 md:ml-8">
                      <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                        <i className="mdi mdi-cart -ml-2"></i>
                        <Link
                          href={{
                            pathname: "/payment",
                            query: {
                              amount: selectedPrice,
                              count: 1,
                              gst: Math.round(
                                selectedPrice -
                                  selectedPrice /
                                    (1 + (parseFloat(selectedGst) || 0) / 100)
                              ),
                              shipc:
                                ((parseFloat(selectedWeight) || 0) / 1000) *
                                60,
                              ids: id,
                            },
                          }}
                        >
                          BUY NOW
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
                {data[0].variations.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <span className="font-bold text-gray-700 dark:text-black">
                      Select Variation:
                    </span>
                    <select
                      className="mt-2 p-2 border border-gray-300 rounded-lg ml-4"
                      value={selectedVariation}
                      onChange={(e) => handleVariationChange(e.target.value)}
                    >
                      {data[0].variations.map((variation, index) => (
                        <option key={index} value={variation}>
                          {variation}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
                  <div className="flex items-center mt-3 mb-0">
                    <input
                      type="text"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-2 py-2"
                    />
                    <button
                      className="bg-[#103178] hover:bg-[#103178] md:ml-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handlePincodeCheck}
                    >
                      Check
                    </button>
                  </div>
                  {isPincodeValid && (
                    <div className="text-green-600 mb-4">
                      Delivery available to this pincode!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;

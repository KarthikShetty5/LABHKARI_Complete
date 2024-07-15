'use client';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const DeliveryPolicy = () => (
  <>
    <Navbar onSearch={function (query: string): void {
            throw new Error('Function not implemented.');
        } } />
    <div className="container mx-auto px-4 py-8 md:mt-24 mt-32">
      <h1 className="text-3xl font-bold mb-8">Delivery Policy</h1>

      {/* Delivery Destinations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Delivery Destinations</h2>
        <p className="text-gray-700">
          We currently ship products to all major cities and towns within India. If you are located in a remote area, please check service availability by putting your pin code to confirm delivery.
        </p>
      </div>

      {/* Delivery Charges */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Delivery Charges</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>For orders above INR 1000, standard Delivery is free.</li>
          <li>For orders below INR 1000, a nominal Delivery fee of INR 60 per Kg will be applied.</li>
          <li>Express Delivery: Available at an additional cost of INR 150 per kg, ensuring faster delivery.</li>
        </ul>
      </div>

      {/* Order Processing Time */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Processing Time</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.</li>
          <li>You will receive another notification when your order has shipped.</li>
        </ul>
      </div>

      {/* Delivery Time */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Delivery Time</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Standard Delivery: Typically takes 5-7 business days.</li>
          <li>Express Delivery: Typically takes 2-3 business days.</li>
        </ul>
      </div>

      {/* Order Tracking */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Tracking</h2>
        <p className="text-gray-700">
          Once your order has been dispatched, you will receive an email/SMS/InApp notification with tracking details. You can use the tracking number provided to check the status of your delivery.
        </p>
      </div>

      {/* Delivery Confirmation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Delivery Confirmation</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>A signature/OTP may be required upon delivery.</li>
          <li>If you are not available at the time of delivery, the courier service may leave a notification card with instructions on how to collect your order or arrange for re-delivery.</li>
        </ul>
      </div>

      {/* Pickup Option */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Pickup Option</h2>
        <p className="text-gray-700">
          We offer a convenient option for you to pick up your order from our nearest store location. Please select Store Pickup during checkout and choose your preferred pickup location.
        </p>
      </div>

      {/* International Delivery */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">International Delivery</h2>
        <p className="text-gray-700">
          Currently, we do not offer international Delivery. We are working to expand our services and hope to serve international customers in the near future.
        </p>
      </div>

      {/* Delivery Delays */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Delivery Delays</h2>
        <p className="text-gray-700">
          While we strive to deliver your order within the estimated time frame, unforeseen circumstances such as weather conditions, customs delays, or other external factors may cause delays. We appreciate your understanding and patience.
        </p>
      </div>

      {/* Damaged or Lost Packages */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Damaged or Lost Packages</h2>
        <p className="text-gray-700">
          If your package arrives damaged or is lost in transit, please contact our customer service team immediately. We will work with the courier service to resolve the issue and ensure you receive your order.
        </p>
      </div>

      {/* Customer Support */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Customer Support</h2>
        <p className="text-gray-700">
          For any queries or concerns regarding your order or Delivery, please contact our customer service team:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: <a href="mailto:support@labhkari.com" className="text-blue-500">support@labhkari.com</a></li>
          <li>Phone: +91-8607863200</li>
          <li>WhatsApp: +91-8607863200</li>
        </ul>
      </div>

      {/* Changes to the Delivery Policy */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Changes to the Delivery Policy</h2>
        <p className="text-gray-700">
          Labhkari.com reserves the right to modify this Delivery policy at any time. Any changes will be posted on this page, and the revised policy will be effective immediately upon posting.
        </p>
      </div>

      <p className="text-gray-700">
        Thank you for choosing Labhkari.com. We value your business and strive to provide the best possible shopping experience. Happy shopping!
      </p>
    </div>
    <Footer />
  </>
);

export default DeliveryPolicy;

import React from 'react';

export interface Order {
    _id: string;
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
}


interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 mb-4">
            <div className="ml-4">
                <h2 className="text-xl font-semibold mb-2">{order.orderId}</h2>
                <h2 className="text-xl font-semibold mb-2">{order.name}</h2>
                <p className="text-gray-600">{order.phone}</p>
            </div>
        </div>
    );
};

export default OrderCard;

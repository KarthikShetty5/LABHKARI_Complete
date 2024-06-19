import React from 'react';

interface User {
    userId: number;
    name: string;
    email: string;
    imageUrl: string;
}

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 mb-4">
            <div className="flex-shrink-0">
                <img src={user.imageUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            </div>
            <div className="ml-4">
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
    );
};

export default UserCard;

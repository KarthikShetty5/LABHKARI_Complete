import React from 'react';
import Navbar from './Navbar';

const NetworkCard = ({ connections }: { connections: any[] }) => {
    const renderConnections = (connections: any[], depth = 0) => {
        return (
            <div className="space-y-4">
                {connections.map((connection, index) => (
                    <div key={index} className={`relative p-4 bg-white rounded-lg shadow-md ${depth === 0 ? 'mx-auto' : ''}`}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 8a3 3 0 116 0 3 3 0 01-6 0zm5-6a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="text-lg font-medium text-gray-900">{connection.name}</div>
                                <p className="text-gray-600">{connection.email}</p>
                                <p className="text-gray-600">{connection.phoneNumber}</p>
                            </div>
                        </div>
                        {connection.subConnections && connection.subConnections.length > 0 && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 w-0.5 h-full bg-gray-200"></div>
                        )}
                        {connection.subConnections && connection.subConnections.length > 0 && (
                            <div className="mt-6 ml-6">
                                {renderConnections(connection.subConnections, depth + 1)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Navbar onSearch={() => { }} />
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-6 md-mt-0 mt-24">
                <h2 className="text-3xl font-bold text-center text-gray-900">Network of Connections</h2>
                {connections.length > 0 ? (
                    <div className="flex justify-center">
                        {renderConnections(connections)}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>No connections found. Start making your connections!</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default NetworkCard;

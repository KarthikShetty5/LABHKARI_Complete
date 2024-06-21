'use client';
import Navbar from '@/Components/Navbar';
import Link from 'next/link';

const Layout: React.FC = ({ children }: any) => {
    return (
        <>
            <Navbar onSearch={function (query: string): void {
                throw new Error('Function not implemented.');
            }} />
            <div className="bg-gray-200 min-h-screen md:mt-24 mt-32">
                <header className="bg-white shadow-md py-4">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
                        </div>
                        <nav className="mt-4">
                            <ul className="flex justify-center space-x-6">
                                <li>
                                    <Link href="/admin/product">
                                        <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/add">
                                        <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Add Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/user">
                                        <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/order">
                                        <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Orders</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
        </>
    );
};

export default Layout;

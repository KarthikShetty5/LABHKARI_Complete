'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo2 from '../assets/logo2.png';
import { useRouter } from 'next/navigation';
import useAdminAuth from '@/app/admin/useAdminAuth';

const NavbarAdmin = () => {
    useAdminAuth();
    
    const router = useRouter();

    const handleAdminLogOut = () => {
        try {
            localStorage.removeItem('adminLoggedIn');
            alert("Logged Out");
            router.refresh();
            router.push('/')
        } catch (e) {
            console.log("Error occured");
        }
    }
    return (
        <>
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <span className="relative flex items-center overflow-hidden">
                                <Image src={Logo2}
                                    width={120}
                                    height={120}
                                    className="mt-10" alt='logo' />
                            </span>
                        </Link>
                        <h1 className="text-3xl font-semibold text-gray-800 md:ml-0 ml-6">Admin Dashboard</h1>
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
                                <Link href="/admin/variation">
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Add Variation</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/batch">
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Add Batch</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/purchase">
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Add Purchase</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/promo">
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Add Promos</span>
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
                            <li>
                                <Link href="/admin/inventory">
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Inventory</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleAdminLogOut}>
                                    <span className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">LogOut</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default NavbarAdmin;

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAdminAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        if (adminLoggedIn !== 'true') {
            router.push('/'); // Redirect to login page if not logged in
        }
    }, [router]);
};

export default useAdminAuth;

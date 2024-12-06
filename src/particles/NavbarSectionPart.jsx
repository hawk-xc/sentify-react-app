import userImage from '../assets/images/users.png';
import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient'; // Pastikan axios sudah dikonfigurasi

// eslint-disable-next-line react/prop-types
const NavbarSectionPart = ({pages, setPage, page}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
    
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get('/profile');
                if (isMounted) setUser(response.data);
            } catch (error) {
                if (isMounted) setUser(null);
                console.error("Failed to fetch user data:", error);
            }
        };
    
        fetchUser();
    
        return () => {
            isMounted = false; // Cleanup effect jika component di-unmount
        };
    }, []);
    

    return (
        <div className="navbar bg-base-100 shadow-md md:px-56 max-sm:px-5">
            <div className="navbar-start">
                <span className="font-extrabold text-2xl">DaisyUI</span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {pages.map((pageItem) => (
                        <li key={pageItem} className={`${
                            pageItem === page
                              ? ""
                              : "text-slate-500"
                          }`}>
                            <a onClick={() => setPage(pageItem)}>{pageItem}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-2">
                <span>Hi, {user?.data[0]?.username || "Guest"}</span>
                <img src={userImage} alt="User Avatar" className="w-12 rounded-full" />
            </div>
        </div>
    );
};

export default NavbarSectionPart;

import userImage from "../assets/images/users.png";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const NavbarSectionPart = ({ pages, setPage, page }) => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Logout dari context
    Cookies.remove("token"); // Hapus token di cookie
    navigate("/login", { replace: true }); // Arahkan ke halaman login
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/profile");
        if (isMounted) setUser(response.data);
      } catch (error) {
        if (isMounted) setUser(null);
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="shadow-md navbar bg-base-100 md:px-56 max-sm:px-5 max-sm:flex max-sm:flex-row max-sm:justify-between">
      <div className="dropdown md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {pages.map((pageItem) => (
            <li
              key={pageItem}
              className={`${pageItem === page ? "" : "text-slate-500"}`}
            >
              <a className="text-xl" onClick={() => setPage(pageItem)}>{pageItem}</a>
            </li>
          ))}
          <div className="divider my-0"></div>
          <li>
            <a className="text-xl" onClick={() => setPage('profile')}>Profile</a>
          </li>
          <li>
            <a className="text-xl" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
      
      <div className="md:navbar-start">
        <span className="text-2xl font-extrabold">😍 Sentify</span>
      </div>

      <div className="md:hidden active:scale-95 duration-150">
        <i className="ri-search-2-line text-xl p-2"></i>
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 text-lg menu menu-horizontal">
          {pages.map((pageItem) => (
            <li
              key={pageItem}
              className={`${pageItem === page ? "" : "text-slate-500"}`}
            >
              <a onClick={() => setPage(pageItem)}>{pageItem}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2 navbar-end max-sm:hidden">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="flex flex-row items-center gap-3">
            <span>Hi, {user?.data[0]?.username || "Guest"}</span>
            <img src={userImage} alt="User Avatar" className="w-12 rounded-full" />
          </div>
          <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
            <li>
              <a onClick={() => setPage('profile')}>Profile</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarSectionPart;

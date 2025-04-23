import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../../public/images/logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Slice/UsersSlice';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-md px-4 md:px-8 z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[56px]">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-green-600">
            <img className="w-20" src={logo} alt="Logo" />
          </Link>

          {/* Menu Links */}
          <ul className={`menu flex items-center gap-4 md:gap-6`} style={{ height: '100%' }}>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-xl text-base font-medium transition"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-xl text-base font-medium transition"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="relative inline-block text-gray-800 font-semibold border-2 border-green-500 px-3 py-2 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:scale-105 shadow-md group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full"></span>
                    <span className="relative z-10">Dashboard</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <style>{`
        .menu {
          transition: all 0.3s ease-in-out;
          margin-top: 10px;
        }

        @media (min-width: 768px) {
          .menu {
            display: flex !important;
            position: static !important;
            flex-direction: row !important;
            background-color: transparent !important;
            width: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;

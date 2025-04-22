import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../../public/images/logo.png"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-md px-4 md:px-8 z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[56px]">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-green-600">
            <img className="w-20" src={logo} alt="" />
          </Link>

          {/* Menu Links */}
          <ul
            className={`menu flex items-center gap-4 md:gap-6`}
            style={{ height: '100%' }}
          >
            <li>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-xl text-base font-medium transition"
                style={{ textDecoration: 'none' }}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-xl text-base font-medium transition"
                style={{ textDecoration: 'none' }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style>{`
        .menu {
          transition: all 0.3s ease-in-out;
          margin-top : 10px
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

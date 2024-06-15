import React, { useState, useEffect } from "react";
import i1 from "../assets/nea-logo-white.png";
import translations from "../translation"; // Import the translations object

const Header = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState(translations.en); // Default language is English

  const toggleDropdown = (key) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // useEffect to update navbarLinks when language changes
  useEffect(() => {
    setNavbarLinks(translations.en); // Change this based on your language logic
  }, []);

  return (
    <nav
      className={`text-gray-100 dark:text-white p-4 pb-16 ${
        isMobile ? "block" : "hidden"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 mt-8">
          <img
            src={i1}
            alt="Logo"
            className="w-10 h-10"
          />{" "}
          {/* Add your logo */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-50 dark:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-8 h-8" // Increased size
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 text-white">
            <a
              href={navbarLinks.home.url}
              className="block px-4 py-2  text-lg font-semibold rounded-lg hover:bg-gray-800 focus:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
            >
              {navbarLinks.home.text}
            </a>
            {Object.keys(navbarLinks)
              .filter((key) => navbarLinks[key].dropdown)
              .map((key) => (
                <div
                  key={key}
                  className="relative mt-2"
                >
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="flex items-center px-4 py-2  text-lg font-semibold rounded-lg hover:bg-gray-200 focus:bg-gray-800 focus:outline-none dark:hover:bg-gray-600 dark:focus:bg-gray-600"
                  >
                    <span>{navbarLinks[key].text}</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {isOpen[key] && (
                    <div className="mt-2 bg-black rounded-md shadow-lg dark:bg-gray-800">
                      {Object.keys(navbarLinks[key].dropdown).map(
                        (dropdownKey) => (
                          <a
                            key={dropdownKey}
                            href={navbarLinks[key].dropdown[dropdownKey].url}
                            className="block px-4 py-2  text-lg font-semibold hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
                          >
                            {navbarLinks[key].dropdown[dropdownKey].text}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            <a
              href={navbarLinks.login.url}
              className="block px-4 py-2  text-lg font-semibold rounded-lg hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
            >
              {navbarLinks.login.text}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <Header isMobile={isMobile} />
    </>
  );
};

export default Navbar;

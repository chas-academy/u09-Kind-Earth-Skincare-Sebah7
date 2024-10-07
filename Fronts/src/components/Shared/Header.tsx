import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { LuUser } from "react-icons/lu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`p-2 fixed top-0 left-0 mb-4 w-full z-40 transition-colors duration-300 ${isScrolled ? 'bg-summerGreen' : 'bg-transparent'}`}>
      <div className="flex justify-around items-center">
        <a href="/login">
          <LuUser className="text-primaryText rounded w-9 h-9" />
        </a>

        <h1>
          <a href="/" className="no-underline text-primaryText text-2xl font-bold">
          Kind Earth Skincare
          </a>
        </h1>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden bg-transparent border-none">
          {isOpen ? (
            <IoClose className="text-primaryText w-9 h-9 rounded" />
          ) : (
            <IoMenu className="text-primaryText w-9 h-9  rounded" />
          )}
        </button>

        <div className={`hidden md:flex space-x-4`}>
          <a href="/" className="text-primaryText px-5 py-3">
            Home
          </a>
          <a
            href="/quiz"
            className="text-primaryText block text-center px-5 py-3"
          >
            Routine Finder
          </a>
          <a href="/about" className="text-primaryText px-5 py-3">
            About
          </a>
          <a href="/contact" className="text-primaryText px-5 py-3">
            Contact
          </a>
          <a href="/login" className="text-primaryText px-5 py-3">
            Login
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className={`fixed top-12 left-0 w-full bg-clayAsh flex flex-col space-y-2 p-6 z-30 transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <a href="/" className="text-primaryText block text-center px-5 py-3">
            Home
          </a>
          <a
            href="/quiz"
            className="text-primaryText block text-center px-5 py-3"
          >
            Routine Finder
          </a>
          <a
            href="/about"
            className="text-primaryText block text-center px-5 py-3"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-primaryText block text-center px-5 py-3"
          >
            Contact
          </a>
          <a
            href="/login"
            className="text-primaryText block text-center px-5 py-3"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;

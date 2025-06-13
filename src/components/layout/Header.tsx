import React from "react";
import logo from "../../assets/logo.gif";

const Header: React.FC = () => {
  return (
    <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6" id="header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0 cursor-pointer">
          <img src={logo} alt="logo" className="w-55" />
        </div>
        <nav className="hidden md:flex gap-8 text-lg font-bold text-gray-300">
          <a href="#header" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#trending" className="hover:text-white transition-colors">
            Trending
          </a>
          <a href="#movies" className="hover:text-white transition-colors">
            Movies
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

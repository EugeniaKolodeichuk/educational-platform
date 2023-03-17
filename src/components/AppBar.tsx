import React from 'react';
import logo from '../assets/logo.png';

const AppBar = () => {
  return (
    <nav className="bg-white border border-bottom-black-600 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Educational Platform
          </span>
        </a>
      </div>
    </nav>
  );
};

export default AppBar;

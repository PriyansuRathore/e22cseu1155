import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 text-center text-xl font-bold">
      {title}
    </header>
  );
};

export default Header;

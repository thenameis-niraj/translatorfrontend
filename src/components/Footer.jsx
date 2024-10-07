import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-8 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-sm">
          
        </p>
      </div>
    </footer>
  );
};

export default Footer;
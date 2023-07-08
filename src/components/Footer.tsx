import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white" aria-labelledby="footer-heading">
      <hr></hr>

      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-16">
        <div className="flex flex-col items-baseline space-y-6">
          <div className="mx-auto">
            <span className="mx-auto mt-2 text-sm text-gray-500">v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 text-sm mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Phones</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
              <li><a href="#" className="hover:text-white">Deals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Warranty</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Newsroom</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} PrimeMobiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

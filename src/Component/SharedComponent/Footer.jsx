import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto py-10 px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold">
              Courier<span className="text-primary">System</span>
            </h1>
            <p className="text-sm opacity-70">Delivering parcels with speed and care.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/" className="link link-hover hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="link link-hover hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="link link-hover hover:text-primary">
              Contact
            </Link>
            <Link to="/login" className="link link-hover hover:text-primary">
              Login
            </Link>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mt-6 mb-4"></div>

        {/* Copyright */}
        <p className="text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} Courier System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import React from "react";
import logo from "../assets/Gemini_Generated_Image_h5x2pyh5x2pyh5x2.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-800">
      <footer className="footer sm:footer-horizontal text-[#FFD700] bg-gray-800  p-10">
        <nav>
          <div className=" flex">
            <img className="h-10 " src={logo} alt="Logo" />
            <p className="text-3xl font-bold ">
               <span className="text-[#FFD700]">Fix</span>
                              <span className="text-[#FFff] font-bold">Issue</span>
              
                              <span className="text-[#FFD700] font-extrabold italic">
                                City
                              </span>
            </p>
          </div>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover" href="https://www.facebook.com/">
            <span className=" flex justify-center items-center gap-2" ><FaFacebook />Facebook</span>
          </a>
          <a className="link link-hover" href="https://www.instagram.com/">
             <span className=" flex justify-center items-center gap-2" ><FaSquareInstagram />Instagram</span>
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
             <span className=" flex justify-center items-center gap-2" ><FaLinkedin />LinkedIn</span>
          </a>
          <a className="link link-hover" href="https://www.github.com/">
           <span className=" flex justify-center items-center gap-2" ><FaSquareGithub />GitHub </span>
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>

      <div>
        <p className="text-gray-300 text-sm text-center space-y-4">
  Keep your city clean and safe by reporting issues promptly. <br />
  Contribute to ongoing solutions and track your impact. <br />
  Join the FixMyCity community to make your neighborhood better for everyone. <br />
  &copy; 2025 FixMyCity. All rights reserved.
</p>

      </div>
    </div>
  );
};

export default Footer;

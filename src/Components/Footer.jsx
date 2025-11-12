import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-yellow-600 text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover" href="https://www.facebook.com/">
            Facebook
          </a>
          <a className="link link-hover" href="https://www.instagram.com/">
            Instagram
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            LinkedIn
          </a>
          <a className="link link-hover" href="https://www.github.com/">
            Github
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

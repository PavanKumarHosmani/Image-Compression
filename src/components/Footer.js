import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "#1F2937",
      color: "#D1D5DB",
      padding: "16px 20px",
      textAlign: "center",
      marginTop: "40px",
      fontSize: "14px",
    }}
  >
    <p style={{ margin: "6px 0" }}>
      © 2025 Free Online Image Compressor | Built with React & Spring Boot
    </p>

    {/* Internal SEO-friendly links */}
    <nav style={{ margin: "8px 0" }}>
      <a
        href="/"
        style={{ color: "#93C5FD", margin: "0 10px", textDecoration: "none" }}
      >
        Home
      </a>
      <a
        href="/about"
        style={{ color: "#93C5FD", margin: "0 10px", textDecoration: "none" }}
      >
        About
      </a>
      <a
        href="/privacy-policy"
        style={{ color: "#93C5FD", margin: "0 10px", textDecoration: "none" }}
      >
        Privacy Policy
      </a>
      <a
        href="/contact"
        style={{ color: "#93C5FD", margin: "0 10px", textDecoration: "none" }}
      >
        Contact
      </a>
    </nav>

    <p style={{ margin: "6px 0", fontSize: "13px" }}>
      Compress JPG, PNG, and WebP images online for free without losing quality.
      Fast, secure, and easy-to-use image compression tool.
    </p>
  </footer>
);

export default Footer;

import React from "react";
import { Title, Meta } from "react-head";

const Header = () => (
  <>
    {/* SEO Meta Tags */}
    <Title>Free Online Image Compressor | Compress JPG, PNG & WebP</Title>
    <Meta
      name="description"
      content="Compress images online for free. Reduce JPG, PNG, and WebP file sizes without losing quality. Fast, secure, and easy-to-use image compression tool."
    />
    <Meta
      name="keywords"
      content="image compressor, compress jpg, compress png, reduce image size, online image compression, webp compressor, free image tool"
    />
    <Meta name="robots" content="index, follow" />

    {/* Accessible & SEO Friendly Header */}
    <header
      style={{
        background: "#1E40AF",
        color: "white",
        padding: "16px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>
        Free Online Image Compressor – Reduce JPG, PNG & WebP Sizes
      </h1>
      <p style={{ margin: "8px 0 0", fontSize: "16px" }}>
        Compress your images instantly without losing quality. Fast, secure, and
        free image compression tool.
      </p>
    </header>
  </>
);

export default Header;

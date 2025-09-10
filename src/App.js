import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import config from "./config";

function App() {
  const [file, setFile] = useState(null);
  const [targetSize, setTargetSize] = useState(200);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const backendUrl = config.backendUrl;

  // Dynamic canonical URL based on window location
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "https://yourdomain.com/";

  // JSON-LD: SoftwareApplication schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Online Image Compression Tool",
    operatingSystem: "Any",
    applicationCategory: "MultimediaApplication",
    description:
      "Compress JPG, PNG, and WebP images online for free without losing quality.",
    url: canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this image compressor free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this tool is 100% free to use. You can compress unlimited JPG, PNG, and WebP images without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "Will image quality be affected after compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, our tool uses smart compression techniques to reduce file size while keeping the image visually clear and sharp.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install any software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation required. This is an online tool that works directly in your browser on desktop and mobile.",
        },
      },
      {
        "@type": "Question",
        name: "Which image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support JPG, JPEG, PNG, and WebP image formats for compression.",
        },
      },
    ],
  };

  // Compress function
  const compressImage = async () => {
    if (!file) {
      setError("Select an image");
      return;
    }
    setLoading(true);
    setProgress(0);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${backendUrl}/image/compress?targetSizeKb=${encodeURIComponent(targetSize)}`,
        formData,
        {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        }
      );

      const blob = new Blob([res.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "compressed.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Compression failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9fafb",
      }}
    >
      <Helmet>
        <title>Free Online Image Compression Tool | JPG, PNG, WebP Optimizer</title>
        <meta
          name="description"
          content="Compress JPG, PNG, and WebP images online for free without losing quality. Fast, secure, and works on any device."
        />
        <meta
          name="keywords"
          content="image compression, online image compressor, reduce image size, jpg optimizer, png compressor, webp compression"
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Free Online Image Compression Tool" />
        <meta
          property="og:description"
          content="Easily compress JPG, PNG, and WebP images online without losing quality."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${canonicalUrl}/og-image.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Image Compression Tool" />
        <meta
          name="twitter:description"
          content="Compress images online for free. Works with JPG, PNG, and WebP formats."
        />
        <meta name="twitter:image" content={`${canonicalUrl}/og-image.jpg`} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Header */}
      <header
        style={{
          background: "#1E40AF",
          color: "white",
          padding: "16px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Free Online Image Compression Tool</h1>
      </header>

      {/* Main tool */}
      <main style={{ flex: 1, padding: "20px" }}>
        <section style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              minWidth: 260,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 20, color: "#333", fontSize: "1.3rem" }}>
              📉 Compress Your Images
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ margin: "10px auto", display: "block" }}
            />

            <input
              type="number"
              value={targetSize}
              min="1"
              onChange={(e) => setTargetSize(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                margin: "10px 0",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={compressImage}
              disabled={!file || loading}
              style={{
                width: "100%",
                padding: "12px 20px",
                backgroundColor: loading ? "#aaa" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                marginTop: 10,
                transition: "background 0.3s",
              }}
            >
              {loading ? "Compressing…" : "Compress"}
            </button>

            {loading && (
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    height: 20,
                    width: "100%",
                    backgroundColor: "#f3f3f3",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,.2)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      backgroundColor: "#4CAF50",
                      textAlign: "center",
                      lineHeight: "20px",
                      color: "white",
                      transition: "width 0.3s ease",
                      fontSize: "0.8rem",
                    }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div style={{ color: "red", marginTop: 15, fontSize: "0.9rem" }}>
                {error}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div>
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} style={{ marginBottom: 15, textAlign: "left" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#1E40AF" }}>{faq.name}</h3>
                <p style={{ marginTop: 5, color: "#333" }}>{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#1F2937",
          color: "#D1D5DB",
          padding: "12px 20px",
          textAlign: "center",
        }}
      >
        <p>© 2025 My Converter App | Built with React & Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;

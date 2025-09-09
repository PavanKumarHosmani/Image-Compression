import React, { useState } from "react";
import axios from "axios";

const ImageCompression = ({ backendUrl }) => {
  const [file, setFile] = useState(null);
  const [targetSize, setTargetSize] = useState(200);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

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
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420, // fits desktop
          minWidth: 260, // safe for small screens
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20, color: "#333", fontSize: "1.3rem" }}>
          📉 Image Compression
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            margin: "10px auto",
            display: "block",
            maxWidth: "100%",
          }}
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
  );
};

export default ImageCompression;

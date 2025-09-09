import React from "react";
import ImageCompression from "../components/ImageCompression";
import config from "../config";

const ImageCompressionPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Compression</h2>
      <ImageCompression backendUrl={config.backendUrl} />
    </div>
  );
};

export default ImageCompressionPage;

// components/QRCodeDisplay.js
import React from "react";
import ReactQRCode from "react-qr-code";

const QRCodeDisplay = () => {
  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto"
      }}
    >
      <ReactQRCode value="https://example.com" size={256} />
    </div>
  );
};

export default QRCodeDisplay;

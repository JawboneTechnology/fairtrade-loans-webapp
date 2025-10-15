import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
}

export const QRCodeGenerator = ({
  url,
  size = 200,
  className = "",
}: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setLoading(true);
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: "#0fc0fc", // Primary color
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "M",
        });
        setQrCodeUrl(qrDataUrl);
        setError("");
      } catch (err) {
        console.error("Failed to generate QR code:", err);
        setError("Failed to generate QR code");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      generateQRCode();
    }
  }, [url, size]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-sm text-gray-500">QR Error</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={qrCodeUrl}
        alt="QR Code to access mobile site"
        className="rounded-lg shadow-lg"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

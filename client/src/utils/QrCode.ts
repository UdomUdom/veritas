import QRCode from "qrcode";

export const generateQrCode = async (text: string, width?: number) => {
  try {
    const url = await QRCode.toDataURL(text, {
      width,
    });
    return url;
  } catch (err) {
    console.warn(err);
  }
};

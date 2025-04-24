function getMaKhachHangfromToken(token) {
  if (!token) {
    return null;
  }
  try {
    // Tách phần payload từ token
    const payload = token.split(".")[1];
    // Giải mã Base64 và parse JSON
    const decodedPayload = JSON.parse(atob(payload));
    return parseInt(decodedPayload.sub, 10) || null;
  } catch (error) {
    return null;
  }
}
export { getMaKhachHangfromToken };

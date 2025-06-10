const API_URL = import.meta.env.VITE_API_URL;

export async function layDSGheDaDat(maChuyenXe) {
  try {
    const response = await fetch(
      `${API_URL}/Chitietghe/layDSGheDaDat/${maChuyenXe}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.error("Lỗi khi gọi API:", error.message);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chi tiết ghế:", error);
    return null;
  }
}

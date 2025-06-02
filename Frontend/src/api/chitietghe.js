export async function layDSGheDaDat(maChuyenXe) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Chitietghe/layDSGheDaDat/${maChuyenXe}`,
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

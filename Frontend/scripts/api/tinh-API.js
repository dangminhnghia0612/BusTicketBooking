async function layDanhSachTinh() {
  try {
    const response = await fetch("https://localhost:7054/api/Tinh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi gọi API: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh:", error);
    return [];
  }
}

export { layDanhSachTinh };

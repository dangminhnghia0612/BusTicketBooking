export async function layDSXe() {
  try {
    const response = await fetch("https://localhost:7054/api/Xe", {
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
    console.error("Lỗi khi lấy danh sách xe:", error);
    return [];
  }
}
export async function xoaXe(maxe) {
  try {
    const response = await fetch(`https://localhost:7054/api/Xe/${maxe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa xe:", error);
  }
}

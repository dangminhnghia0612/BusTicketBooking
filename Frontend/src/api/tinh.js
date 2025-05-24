export async function layDSTinh() {
  try {
    const response = await fetch("https://localhost:7057/api/Tinh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch api tỉnh:", error);
    return [];
  }
}

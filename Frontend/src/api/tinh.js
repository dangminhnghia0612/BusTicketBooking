const API_URL = import.meta.env.VITE_API_URL;

export async function layDSTinh() {
  try {
    const response = await fetch(`${API_URL}/Tinh`, {
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

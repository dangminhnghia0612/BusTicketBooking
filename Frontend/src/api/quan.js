const API_URL = import.meta.env.VITE_API_URL;

export async function layDSQuanCuaTinh(maTinh) {
  try {
    const response = await fetch(
      `${API_URL}/Quan/lay-ds-quan-cua-tinh/${maTinh}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch API quận:", error);
    return [];
  }
}

export async function layDSQuanCuaTinh(maTinh) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Quan/lay-ds-quan-cua-tinh/${maTinh}`,
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

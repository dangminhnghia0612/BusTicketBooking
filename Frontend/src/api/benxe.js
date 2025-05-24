export async function layDSBenXeCuaTinh(maTinh) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Benxe/lay-ds-ben-xe-cua-tinh/${maTinh}`,
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
    console.error("Lỗi khi fetch api bến xe:", error);
    return [];
  }
}

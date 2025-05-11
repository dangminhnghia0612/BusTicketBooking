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
export async function themXe(bienSo, loaiXe, tenXe) {
  try {
    const response = await fetch(`https://localhost:7054/api/Xe/ThemXe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maLoaixe: loaiXe,
        bienso: bienSo,
        ten: tenXe,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm xe:", error);
  }
}
export async function suaXe(maXe, bienSo, loaiXe, tenXe) {
  try {
    const response = await fetch(`https://localhost:7054/api/Xe/${maXe}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maLoaixe: loaiXe,
        bienso: bienSo,
        ten: tenXe,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin xe:", error);
  }
}

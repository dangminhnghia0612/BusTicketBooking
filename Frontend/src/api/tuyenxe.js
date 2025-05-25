export async function layDSTuyenXe() {
  try {
    const response = await fetch("https://localhost:7057/api/Tuyenxe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API tuyến xe:", error);
    return [];
  }
}

export async function xoaTuyenXe(maTuyenXe) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Tuyenxe/${maTuyenXe}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API tuyến xe:", error);
  }
}

export async function themTuyenXe(tuyenXe, loTrinh) {
  try {
    const response = await fetch(`https://localhost:7057/api/Tuyenxe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        khoangthoigian: tuyenXe.khoangThoiGian,
        khoangcach: tuyenXe.khoangCach,
        giave: tuyenXe.giaVe,
        lotrinh: loTrinh,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API tuyến xe:", error);
  }
}

export async function suaTuyenXe(tuyenXe, loTrinh) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Tuyenxe/${tuyenXe.maTuyenXe}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          khoangthoigian: tuyenXe.khoangThoiGian,
          khoangcach: tuyenXe.khoangCach,
          giave: tuyenXe.giaVe,
          lotrinh: loTrinh,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin xe:", error);
  }
}

export async function layDSTuyenXe() {
  try {
    const response = await fetch("https://localhost:7054/api/Tuyenxe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tuyến xe:", error);
    return [];
  }
}
export async function xoaTuyenXe(matuyen) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Tuyenxe/${matuyen}`,
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
    console.error("Lỗi khi xóa tuyến xe:", error);
  }
}

export async function themTuyenXe(
  maDiemDi,
  maDiemDen,
  khoangthoigian,
  khoangcach,
  giave
) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Tuyenxe/ThemTuyenXe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maDiemdi: maDiemDi,
          maDiemden: maDiemDen,
          khoangthoigian: khoangthoigian,
          khoangcach: khoangcach,
          giave: giave,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm tuyến xe:", error);
  }
}

export async function suaTuyenXe(
  maTuyen,
  maDiemDi,
  maDiemDen,
  khoangthoigian,
  khoangcach,
  giave
) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Tuyenxe/${maTuyen}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maDiemdi: maDiemDi,
          maDiemden: maDiemDen,
          khoangthoigian: khoangthoigian,
          khoangcach: khoangcach,
          giave: giave,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin tuyến xe:", error);
  }
}
export async function timTuyenXe(matuyen) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Tuyenxe/tim-tuyen-xe/${matuyen}`,
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
    console.error("Lỗi khi tìm tuyến xe:", error);
  }
}
export async function timTuyenXeBangMaTinh(maTinhDi, maTinhDen) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Tuyenxe/tim-tuyen-xe?maTinhDi=${maTinhDi}&maTinhDen=${maTinhDen}`,
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
    console.error("Lỗi khi tìm tuyến xe:", error);
  }
}

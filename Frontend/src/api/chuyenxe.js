import { getToken } from "../lib/utils";
const API_URL = import.meta.env.VITE_API_URL;

export async function layDSChuyenXe() {
  try {
    const response = await fetch(`${API_URL}/Chuyenxe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chuyến xe:", error);
    return [];
  }
}

export async function xoaChuyenXe(maChuyenXe) {
  try {
    const response = await fetch(`${API_URL}/Chuyenxe/${maChuyenXe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chuyến xe:", error);
  }
}

export async function themChuyenXe(chuyenXe) {
  try {
    const response = await fetch(`${API_URL}/Chuyenxe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        maTuyenxe: chuyenXe.maTuyenXe,
        maXe: chuyenXe.maXe,
        giodi: chuyenXe.gioDi,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chuyến xe:", error);
  }
}

export async function suaChuyenXe(chuyenXe) {
  try {
    const response = await fetch(`${API_URL}/Chuyenxe/${chuyenXe.maChuyenXe}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        maTuyenxe: chuyenXe.maTuyenXe,
        maXe: chuyenXe.maXe,
        giodi: chuyenXe.gioDi,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chuyến xe:", error);
  }
}

export async function timChuyenXe(diemDi, diemDen, ngayDi, soLuongVe) {
  try {
    const response = await fetch(`${API_URL}/Chuyenxe/tim-chuyen-xe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maTinhDi: diemDi,
        maTinhDen: diemDen,
        ngaydi: ngayDi,
        soluongve: soLuongVe,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API chuyến xe:", error);
    return [];
  }
}

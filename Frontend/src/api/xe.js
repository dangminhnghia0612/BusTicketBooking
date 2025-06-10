import { getToken } from "../lib/utils";
const API_URL = import.meta.env.VITE_API_URL;

export async function layDSXe() {
  try {
    const response = await fetch(`${API_URL}/Xe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
    return [];
  }
}

export async function xoaXe(maXe) {
  try {
    const response = await fetch(`${API_URL}/Xe/${maXe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
  }
}

export async function themXe(xe) {
  try {
    const response = await fetch(`${API_URL}/Xe/ThemXe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        maLoaixe: xe.maloai,
        maBenxe: xe.mabenxe,
        bienso: xe.bienso,
        ten: xe.tenxe,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
  }
}

export async function suaXe(xe) {
  try {
    const response = await fetch(`${API_URL}/Xe/${xe.maxe}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        maLoaixe: xe.maloai,
        maBenxe: xe.mabenxe,
        bienso: xe.bienso,
        ten: xe.tenxe,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin xe:", error);
  }
}

export async function layDSXeTheoNoiDau(maBenXe) {
  try {
    const response = await fetch(`${API_URL}/Xe/layXeTheoNoiDau/${maBenXe}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
    return [];
  }
}

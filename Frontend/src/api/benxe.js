import { getToken } from "../lib/utils";
const API_URL = import.meta.env.VITE_API_URL;

export async function layDSBenXeCuaTinh(maTinh) {
  try {
    const response = await fetch(
      `${API_URL}/Benxe/lay-ds-ben-xe-cua-tinh/${maTinh}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken("admin")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch API bến xe:", error);
    return [];
  }
}

export async function layDSBenXe() {
  try {
    const response = await fetch(`${API_URL}/Benxe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch API bến xe:", error);
    return [];
  }
}

export async function xoaBenXe(maBenXe) {
  try {
    const response = await fetch(`${API_URL}/Benxe/${maBenXe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API bến xe:", error);
  }
}

export async function themBenXe(benXe) {
  try {
    const response = await fetch(`${API_URL}/Benxe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        tenbenxe: benXe.tenbenxe,
        diachi: benXe.diachi,
        sodienthoai: benXe.sdt,
        maQuan: benXe.maquan,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API bến xe:", error);
  }
}

export async function suaBenXe(benXe) {
  try {
    const response = await fetch(`${API_URL}/Benxe/${benXe.mabenxe}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: JSON.stringify({
        tenbenxe: benXe.tenbenxe,
        diachi: benXe.diachi,
        sodienthoai: benXe.sdt,
        maQuan: benXe.maquan,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin bến xe:", error);
  }
}

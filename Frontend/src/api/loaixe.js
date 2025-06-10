import { getToken } from "../lib/utils";
const API_URL = import.meta.env.VITE_API_URL;

export async function layDSLoaiXe() {
  try {
    const response = await fetch(`${API_URL}/Loaixe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch api loại xe:", error);
    return [];
  }
}

export async function xoaLoaiXe(maLoaiXe) {
  try {
    const response = await fetch(`${API_URL}/Loaixe/${maLoaiXe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("admin")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function themLoaiXe(formData) {
  try {
    const response = await fetch(`${API_URL}/Loaixe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function suaLoaiXe(id, formData) {
  try {
    const response = await fetch(`${API_URL}/Loaixe/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken("admin")}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function laySoDoGhe(maChuyenXe) {
  try {
    const response = await fetch(`${API_URL}/Loaixe/laySoDoGhe/${maChuyenXe}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("Lỗi khi gọi API:", error.message);
      return null;
    }
    const data = await response.json();

    const sodogheObject = JSON.parse(data.sodoghe);

    return sodogheObject;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
    return null;
  }
}

import { getToken } from "../lib/utils";
export async function layDSLoaiXe() {
  try {
    const response = await fetch("https://localhost:7057/api/Loaixe", {
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
    const response = await fetch(
      `https://localhost:7057/api/Loaixe/${maLoaiXe}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken("admin")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function themLoaiXe(formData) {
  try {
    const response = await fetch(`https://localhost:7057/api/Loaixe`, {
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
    const response = await fetch(`https://localhost:7057/api/Loaixe/${id}`, {
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
    const response = await fetch(
      `https://localhost:7057/api/Loaixe/laySoDoGhe/${maChuyenXe}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

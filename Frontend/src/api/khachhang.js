import { getToken } from "../lib/utils";
const API_URL = import.meta.env.VITE_API_URL;

export async function timKhachHang(phone, email) {
  const apiUrl = `${API_URL}/Khachhang/TimKhachHang`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sodienthoai: phone,
        Email: email,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error.message || "Lỗi không xác định";
    }
  } catch (error) {
    console.error("Lỗi fetch API khách hàng:", error);
    return null;
  }
}

export async function layKhachHang(maKH) {
  try {
    const response = await fetch(`${API_URL}/Khachhang/layKhachHang/${maKH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("user")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error.message || "Lỗi không xác định";
    }
  } catch (error) {
    console.error("Lỗi khi fetch API khách hàng", error);
    return null;
  }
}

export async function suaThongTin(maKH, formData) {
  try {
    const response = await fetch(`${API_URL}/Khachhang/suaThongTin/${maKH}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken("user")}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error.message || "Lỗi không xác định";
    }
  } catch (error) {
    console.error("Lỗi khi fetch API khách hàng", error);
    return null;
  }
}

export async function doiMatKhau(maKH, matKhauCu, matKhauMoi) {
  try {
    const response = await fetch(`${API_URL}/Khachhang/doi-mat-khau/${maKH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("user")}`,
      },
      body: JSON.stringify({
        matkhaucu: matKhauCu,
        matkhaumoi: matKhauMoi,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch API khách hàng", error);
    return null;
  }
}

export async function layLichSuMuaVe(maKH) {
  try {
    const response = await fetch(
      `${API_URL}/Khachhang/lich-su-mua-ve/${maKH}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken("user")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API khách hàng:", error);
    return [];
  }
}

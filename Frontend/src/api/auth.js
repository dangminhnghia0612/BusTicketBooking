import { ChuanHoaSDT, ktSDTHopLe, ktEmail } from "../lib/utils.js";
const API_URL = import.meta.env.VITE_API_URL;

export async function adminLogin(username, password) {
  try {
    const response = await fetch(
      `${API_URL}/Quantrivien/Dangnhap`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tendangnhap: username,
          matkhau: password,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API đăng nhập:", error);
    throw error;
  }
}

function getInputType(input) {
  if (ktSDTHopLe(input)) {
    return "phone";
  } else if (ktEmail(input)) {
    return "email";
  } else {
    return "invalid";
  }
}

export async function userLogin(username, password) {
  if (getInputType(username) === "phone") {
    username = ChuanHoaSDT(username);
  }
  try {
    const response = await fetch(`${API_URL}/Auth/dangnhap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tendangnhap: username,
        matkhau: password,
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Lỗi fetch API Auth:", error);
    throw error;
  }
}

export async function userRegistration(fullname, email, phone, password) {
  try {
    const response = await fetch(`${API_URL}/Auth/dangky`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Hoten: fullname,
        Email: email,
        Sodienthoai: phone,
        Matkhau: password,
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Lỗi fetch API Auth:", error);
    throw error;
  }
}

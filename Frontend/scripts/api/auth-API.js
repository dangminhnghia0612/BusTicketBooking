import { ChuanHoaSDT, ktSDTHopLe } from "../utils/phoneUtil.js";
import { ktEmail } from "../utils/emailUtil.js";

export async function dangNhap(email, password) {
  if (getInputType(email) === "phone") {
    email = ChuanHoaSDT(email);
  }
  const response = await fetch("https://localhost:7054/api/Auth/Dangnhap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Tendangnhap: email,
      Matkhau: password,
    }),
  });
  return response.json();
}

export async function dangKy(fullname, email, phone, password) {
  if (!fullname.trim() || !email.trim() || !phone.trim() || !password.trim()) {
    throw new Error("Vui lòng nhập đầy đủ thông tin!");
  }
  if (!ktEmail(email)) {
    throw new Error("Email không hợp lệ!");
  }
  if (!ktSDTHopLe(phone)) {
    throw new Error("Số điện thoại không hợp lệ!");
  }
  phone = ChuanHoaSDT(phone);
  const response = await fetch("https://localhost:7054/api/Auth/Dangky", {
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

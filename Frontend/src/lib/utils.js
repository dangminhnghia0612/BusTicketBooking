import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
// Hàm này giúp kết hợp các class Tailwind và xử lý các xung đột
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`,
  };
}

export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function getToken(role = "user") {
  if (role === "admin") {
    return Cookies.get("jwtTokenAdmin") || "";
  }
  return Cookies.get("jwtTokenUser") || "";
}

export function ktEmail(email) {
  email = String(email).trim();
  const strictEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return strictEmailRegex.test(email.toLowerCase());
}

export function ChuanHoaSDT(phone) {
  phone = phone.replace(/\s+/g, "");
  if (phone.startsWith("0")) {
    return phone.replace(/^0/, "+84");
  } else if (!phone.startsWith("+84")) {
    return "+84" + phone;
  }
  return phone;
}
export function ktSDTHopLe(phone) {
  const regex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
  return regex.test(phone);
}

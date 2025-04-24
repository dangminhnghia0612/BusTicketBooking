function ChuanHoaSDT(phone) {
  phone = phone.replace(/\s+/g, "");
  if (phone.startsWith("0")) {
    return phone.replace(/^0/, "+84");
  } else if (!phone.startsWith("+84")) {
    return "+84" + phone;
  }
  return phone;
}
function ktSDTHopLe(phone) {
  const regex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
  return regex.test(phone);
}
export { ChuanHoaSDT, ktSDTHopLe };

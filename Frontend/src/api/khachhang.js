export async function timKhachHang(phone, email) {
  const apiUrl = "https://localhost:7057/api/Khachhang/TimKhachHang";

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

async function timKhachHang(phone, email) {
  const apiUrl = "https://localhost:7054/api/Khachhang/TimKhachHang";

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
    } else if (response.status === 404) {
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi fetch API:", error);
    return null;
  }
}

export { timKhachHang };

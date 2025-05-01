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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Message || "Lỗi khi gọi API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API:", error);
    return null;
  }
}

export { timKhachHang };

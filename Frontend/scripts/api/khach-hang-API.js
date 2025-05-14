export async function timKhachHang(phone, email) {
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

export async function timKhachHangBangMa(maKH) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Khachhang/tim-khach-hang/${maKH}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm khách hàng:", error);
  }
}

export async function suaKhachHang(
  maKH,
  hoten,
  sodienthoai,
  email,
  ngaysinh,
  gioitinh,
  diachi,
  nghenghiep
) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Khachhang/sua-thong-tin/${maKH}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hoten: hoten,
          sodienthoai: sodienthoai,
          email: email,
          ngaysinh: ngaysinh,
          gioitinh: gioitinh,
          diachi: diachi,
          nghenghiep: nghenghiep,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin khách hàng:", error);
  }
}

export async function doiMatKhau(maKH, matkhaucu, matkhaumoi) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Khachhang/doi-mat-khau/${maKH}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matkhaucu: matkhaucu,
          matkhaumoi: matkhaumoi,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
  }
}

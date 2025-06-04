export async function thanhToanVnpay(tenKhachHang, soTien, maDatVe, dsGhe) {
  fetch("https://localhost:7057/api/Thanhtoan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: tenKhachHang,
      Amount: soTien,
      MaDatve: maDatVe,
      dsGhe: dsGhe,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Không nhận được URL thanh toán từ server.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi tạo thanh toán:", error);
    });
}

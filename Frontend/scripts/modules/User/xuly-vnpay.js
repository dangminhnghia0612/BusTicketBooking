async function guiKetQuaVnpayVeBackend() {
  const queryParams = new URLSearchParams(window.location.search);
  var maDatVe = queryParams.get("Ma_Datve");
  var dsGheStr = queryParams.get("dsGhe");
  var dsGheList = dsGheStr ? dsGheStr.split(",") : [];

  var amount = parseInt(queryParams.get("vnp_Amount"));
  var transactionStatus = queryParams.get("vnp_TransactionStatus");
  var orderInfo = decodeURIComponent(queryParams.get("vnp_OrderInfo") || "");
  var transactionNo = queryParams.get("vnp_TransactionNo");
  var payDate = queryParams.get("vnp_PayDate");

  const data = {
    maDatve: parseInt(maDatVe),
    dsGhe: dsGheList,
    sotien: amount.toString(),
    trangThaiGiaoDich: transactionStatus,
    ghichu: orderInfo,
    maGiaodich: transactionNo,
    ngaythanhtoan: payDate,
  };
  try {
    const res = await fetch("https://localhost:7054/api/Thanhtoan/XulyVnPay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.code === "00")
      window.location.href =
        window.location.href = `../../components/payment-success.html?maGiaoDich=${transactionNo}&ngayThanhToan=${payDate}&soTien=${amount}`;
    else window.location.href = "../../components/payment-failed.html";
    console.log(result.code);
  } catch (error) {
    document.body.innerHTML =
      "<h2>🚫 Gặp lỗi khi xử lý phản hồi: " + error + "</h2>";
  }
}

window.onload = guiKetQuaVnpayVeBackend;

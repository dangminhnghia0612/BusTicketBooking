import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getParamsFromURL } from "../../lib/utils";

export default function VnpayReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy các tham số trả về từ VnPay
    const params = getParamsFromURL(location.search);
    const maDatVe = params.Ma_Datve;
    const dsGheStr = params.dsGhe;
    const dsGheList = dsGheStr ? dsGheStr.split(",") : [];

    const amount = params.vnp_Amount;
    const transactionStatus = params.vnp_TransactionStatus;
    const orderInfo = decodeURIComponent(params.vnp_OrderInfo || "");
    const transactionNo = params.vnp_TransactionNo;
    const payDate = params.vnp_PayDate;

    const data = {
      maDatVe,
      dsGhe: dsGheList,
      sotien: amount?.toString(),
      trangThaiGiaoDich: transactionStatus,
      ghichu: orderInfo,
      maGiaodich: transactionNo,
      ngaythanhtoan: payDate,
    };

    setInfo({
      maDatVe,
      dsGhe: dsGheList,
      sotien: amount,
      trangThaiGiaoDich: transactionStatus,
      ghichu: orderInfo,
      maGiaodich: transactionNo,
      ngaythanhtoan: payDate,
    });

    fetch("https://localhost:7057/api/Thanhtoan/XulyVnPay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setLoading(false);
        if (res.ok) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setSuccess(false);
      });
  }, [location.search]);

  const formatCurrency = (amount) => {
    if (!amount) return "--";
    const numAmount = typeof amount === "string" ? Number(amount) : amount;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numAmount / 100);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    // Assuming format: YYYYMMDDHHMMSS
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-orange-400 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Đang xử lý thanh toán
            </h1>
            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div
          className={`p-6 ${
            success ? "bg-green-500" : "bg-red-500"
          } text-white text-center`}
        >
          <h1 className="text-2xl font-bold">
            {success ? "Thanh Toán Thành Công" : "Thanh Toán Thất Bại"}
          </h1>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                success ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {success ? (
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {success
                ? "Giao dịch của bạn đã được xử lý thành công!"
                : "Rất tiếc, giao dịch của bạn không thành công!"}
            </h2>
            <p className="text-gray-600">
              {success
                ? "Cảm ơn bạn đã đặt vé. Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn."
                : "Đã xảy ra lỗi trong quá trình xử lý thanh toán của bạn. Vui lòng kiểm tra thông tin thanh toán và thử lại."}
            </p>
          </div>

          {/* Transaction Details */}
          {info && success && (
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Mã giao dịch:</span>
                <span className="font-medium text-gray-800">
                  #{info.maGiaodich || "---"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Mã đặt vé:</span>
                <span className="font-medium text-gray-800">
                  {info.maDatVe || "---"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Ngày thanh toán:</span>
                <span className="font-medium text-gray-800">
                  {formatDate(info.ngaythanhtoan)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(info.sotien)}
                </span>
              </div>
              {info.dsGhe && info.dsGhe.length > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Ghế:</span>
                  <span className="font-medium text-gray-800">
                    {info.dsGhe.join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className={`px-6 py-3 rounded-md font-medium text-white ${
                success
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {success ? "Quay Lại Trang Chủ" : "Trang chủ"}
            </button>
            {/* 
            {!success && (
              <button
                onClick={() => navigate("/support")}
                className="px-6 py-3 rounded-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Liên Hệ Hỗ Trợ
              </button>
            )} */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-xs text-gray-600 flex flex-col sm:flex-row justify-between">
          <div>
            <span>Cần trợ giúp? </span>
            <a href="tel:0123456789" className="text-blue-500 hover:underline">
              Hotline: 0123 456 789
            </a>
          </div>
          <div>
            <a
              href="mailto:DH52111357@student.stu.edu.vn"
              className="text-blue-500 hover:underline"
            >
              DH52111357@student.stu.edu.vn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

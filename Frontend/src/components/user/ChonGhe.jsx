import { useState, useEffect } from "react";
import {
  getParamsFromURL,
  formatDateTime,
  formatPrice,
  ChuanHoaSDT,
  ktEmail,
  ktSDTHopLe,
} from "../../lib/utils.js";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { laySoDoGhe } from "../../api/loaixe.js";
import { layDSGheDaDat } from "../../api/chitietghe.js";
import AlertDialog from "../common/AlertDialog.jsx";
import { timKhachHang } from "../../api/khachhang.js";
import { sendDatVeRequest } from "../../api/datve.js";
import { thanhToanVnpay } from "../../api/thanhtoan.js";

export default function ChonGhe() {
  const location = useLocation();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dsGheDaChon, setDsGheDaChon] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);
  const [dsGheDaDat, setDsGheDaDat] = useState([]);
  const [khachHang, setKhachHang] = useState({
    hoten: "",
    sdt: "",
    email: "",
  });

  const params = getParamsFromURL(location.search);
  const chuyenXe = {
    maChuyenXe: params.maChuyenXe || -1,
    diemDi: params.diemDi || "",
    diemDen: params.diemDen || "",
    benDi: params.benDi || "",
    benDen: params.benDen || "",
    ngayDi: params.ngayDi || "",
    giaVe: params.giaVe || 0,
  };
  const tongTien = chuyenXe.giaVe * dsGheDaChon.length;

  useEffect(() => {
    if (Cookies.get("isUserLoggedIn") === "true") {
      setKhachHang({
        hoten: Cookies.get("tenUser") || "",
        sdt: Cookies.get("sdtUser") || "",
        email: Cookies.get("emailUser") || "",
      });
    }
    const fetchData = async () => {
      try {
        const soDo = await laySoDoGhe(chuyenXe.maChuyenXe);
        setSeatLayout(soDo);
        const gheDat = await layDSGheDaDat(chuyenXe.maChuyenXe);
        setDsGheDaDat(gheDat);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu ghế:", err);
      }
    };
    fetchData();
  }, [chuyenXe.maChuyenXe]);

  const layTinhTrangGhe = (soghe) => {
    if (dsGheDaDat.includes(soghe)) return "sold";
    if (dsGheDaChon.includes(soghe)) return "selected";
    return "available";
  };

  const handleChonGhe = (soghe, tinhtrang) => {
    if (tinhtrang === "sold") return;

    if (dsGheDaChon.includes(soghe)) {
      setDsGheDaChon(dsGheDaChon.filter((id) => id !== soghe));
    } else {
      setDsGheDaChon([...dsGheDaChon, soghe]);
    }
  };

  const layMauGhe = (soghe, tinhtrang) => {
    if (dsGheDaChon.includes(soghe)) {
      return "bg-amber-100 border-amber-500 text-amber-800";
    }

    switch (tinhtrang) {
      case "sold":
        return "bg-gray-200 border-gray-400 text-gray-400 cursor-not-allowed";
      default:
        return "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-300";
    }
  };

  const handleInputChange = (field, value) => {
    setKhachHang((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThanhToan = async () => {
    if (
      !khachHang.hoten ||
      !khachHang.sdt ||
      !khachHang.email ||
      dsGheDaChon.length === 0
    ) {
      setAlertMessage(
        "Vui lòng điền đầy đủ thông tin và chọn ghế trước khi thanh toán."
      );
      setOpenAlert(true);
      return;
    } else {
      if (!ktSDTHopLe(khachHang.sdt)) {
        setAlertMessage("Số điện thoại không hợp lệ.");
        setOpenAlert(true);
        return;
      } else if (!ktEmail(khachHang.email)) {
        setAlertMessage("Email không hợp lệ.");
        setOpenAlert(true);
        return;
      } else {
        const formatSdt = ChuanHoaSDT(khachHang.sdt);
        var maKH = Cookies.get("maUser");
        if (maKH) {
          maKH = parseInt(maKH);
        } else {
          maKH = await timKhachHang(formatSdt, khachHang.email);
          if (maKH) {
            maKH = parseInt(maKH);
          } else {
            maKH = null;
          }
        }
        const datVeRequest = {
          Ma_Chuyenxe: chuyenXe.maChuyenXe,
          Ma_Khachhang: maKH,
          Soluong: dsGheDaChon.length,
          Giagoc: tongTien,
          Giasaukhuyenmai: tongTien,
          Ghichu: null,
          Tenkhachhang: khachHang.hoten,
          Sodienthoai: formatSdt,
          Email: khachHang.email,
          dsGhe: dsGheDaChon,
        };
        const result = await sendDatVeRequest(datVeRequest);
        if (result.message === "Đặt vé thành công") {
          // alert("Đặt vé thành công. Vui lòng thanh toán!");
          setAlertMessage("Đặt vé thành công. Vui lòng thanh toán!");
          setOpenAlert(true);
          await thanhToanVnpay(
            khachHang.hoten,
            tongTien,
            result.maDatve,
            dsGheDaChon
          );
        } else if (result.message === "Ghế đã có người đặt") {
          // alert("Ghế đã có người đặt");
          setAlertMessage("Ghế đã có người đặt. Vui lòng chọn ghế khác.");
          setOpenAlert(true);
          window.location.reload();
        } else {
          setAlertMessage(result.message || "Đặt vé thất bại");
          setOpenAlert(true);
        }
      }
    }
  };

  const renderSoDoGhe = (soDoGhe) => {
    const isManyRows = soDoGhe.cacday.length > 3;
    let dayDoc = soDoGhe.cacday;
    let dayCuoi = null;

    // Nếu có nhiều dãy, tách dãy cuối ra để render riêng phía dưới
    if (isManyRows) {
      dayDoc = soDoGhe.cacday.slice(0, -1);
      dayCuoi = soDoGhe.cacday[soDoGhe.cacday.length - 1];
    }

    return (
      <>
        <AlertDialog
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          title="Thông báo"
          message={alertMessage}
        />
        <div
          className="border bg-gray-200 rounded-md overflow-hidden mb-4"
          key={soDoGhe.tang}
        >
          <div className="p-2 text-center font-medium text-gray-800">
            Tầng {soDoGhe.tang}
          </div>
          <div className="p-4 flex flex-col items-left gap-4">
            {/* Các dãy dọc */}
            <div className="flex flex-row gap-16 justify-center">
              {dayDoc.map((day) => (
                <div key={day.dayso} className="flex flex-col gap-4">
                  {day.soghe.map((soghe) => (
                    <button
                      key={soghe}
                      onClick={() =>
                        handleChonGhe(soghe, layTinhTrangGhe(soghe))
                      }
                      disabled={layTinhTrangGhe(soghe) === "sold"}
                      className={`w-12 h-10 flex items-center justify-center border rounded-md text-sm font-medium transition-all ${layMauGhe(
                        soghe,
                        layTinhTrangGhe(soghe)
                      )}`}
                    >
                      {soghe}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            {/* Dãy cuối nằm ngang phía dưới */}
            {dayCuoi && (
              <div className="flex flex-row gap-2 justify-center">
                {dayCuoi.soghe.map((soghe) => (
                  <button
                    key={soghe}
                    onClick={() => handleChonGhe(soghe, layTinhTrangGhe(soghe))}
                    disabled={layTinhTrangGhe(soghe) === "sold"}
                    className={`w-12 h-10 flex items-center justify-center border rounded-md text-sm font-medium transition-all ${layMauGhe(
                      soghe,
                      layTinhTrangGhe(soghe)
                    )}`}
                  >
                    {soghe}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-4 px-4">
      {/* Tiêu đề */}
      <h1 className="text-center text-2xl font-medium text-gray-800 py-4">
        {chuyenXe.diemDi} - {chuyenXe.diemDen} (
        {formatDateTime(chuyenXe.ngayDi).date})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Phần chọn ghế - 2 cột */}
        <div className="lg:col-span-2 border rounded">
          <div className="border-b p-4">
            <h2 className="font-medium text-xl text-center">Chọn ghế</h2>
          </div>

          {/* Chú thích */}
          <div className="flex gap-6 p-4 border-b items-center justify-center">
            {/* Đã bán */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded border border-gray-400 bg-gray-200"></span>
              <span className="text-sm text-gray-700">Đã bán</span>
            </div>
            {/* Còn trống */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded border-2 border-blue-300 bg-blue-100"></span>
              <span className="text-sm text-gray-700">Còn trống</span>
            </div>
            {/* Đang chọn */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-6 h-6 rounded border-2 border-amber-500 bg-amber-100"></span>
              <span className="text-sm text-gray-700">Đang chọn</span>
            </div>
          </div>

          {/*Tầng */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {seatLayout.map((soDoGhe) => renderSoDoGhe(soDoGhe))}
          </div>
        </div>

        {/* Thông tin lượt đi - 1 cột */}
        <div className="space-y-4">
          <div className="border rounded">
            <div className="border-b p-4">
              <h2 className="font-medium text-center">Thông tin lượt đi</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Tuyến xe</div>
                <div className="text-right">
                  {chuyenXe.benDi} <br /> - {chuyenXe.benDen}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Thời gian xuất bến</div>
                <div className="text-right text-green-600">
                  {formatDateTime(chuyenXe.ngayDi).time}{" "}
                  {formatDateTime(chuyenXe.ngayDi).date}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Số lượng ghế</div>
                <div className="text-right">{dsGheDaChon.length} Ghế</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Số ghế</div>
                <div className="text-right text-green-600">
                  {dsGheDaChon.join(", ")}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Điểm trả khách</div>
                <div className="text-right"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Tổng tiền</div>
                <div className="text-right text-green-600 font-medium">
                  {formatPrice(tongTien)}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleThanhToan}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded transition-colors"
          >
            Thanh toán
          </button>
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div className="mt-6 border rounded">
        <div className="border-b p-4 flex justify-center">
          <h2 className="font-medium">Thông tin khách hàng</h2>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={khachHang.hoten}
                onChange={(e) => handleInputChange("hoten", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={khachHang.sdt}
                onChange={(e) => handleInputChange("sdt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={khachHang.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nhập email"
              />
            </div>
          </div>

          <div className="border-l pl-4">
            <div className="border-l-4 border-orange-500 pl-3 text-sm">
              <p className="mb-2">
                (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít
                nhất 30 phút giờ xe khởi hành.
              </p>
              <p>
                (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng
                đài trung chuyển <span className="text-red-500">1900 0000</span>{" "}
                trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những
                điểm xe trung chuyển không thể tới được.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

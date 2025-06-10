import LayoutTaiKhoan from "../../../components/user/LayoutTaiKhoan";
import { useState, useEffect } from "react";
import { layLichSuMuaVe } from "../../../api/khachhang";
import AlertDialog from "../../../components/common/AlertDialog";
import Cookies from "js-cookie";

export default function LichSuMuaVe() {
  const [lichSu, setLichSu] = useState([]);

  useEffect(() => {
    const maKH = Cookies.get("maUser");
    if (maKH) {
      layLichSuMuaVe(maKH).then((data) => {
        if (data) {
          setLichSu(data);
        }
      });
    }
  }, []);
  return (
    <>
      <LayoutTaiKhoan
        title="Lịch sử mua vé"
        description="Theo dõi và quản lý quá trình lịch sử mua vé của bạn"
      >
        <div className="overflow-x-auto mt-6 whitespace-nowrap">
          <div className="h-[500px] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="py-3 px-4 text-center">Mã vé</th>
                  <th className="py-3 px-4 text-center">Số vé</th>
                  <th className="py-3 px-4 text-center">Tuyến đường</th>
                  <th className="py-3 px-4 text-center">Ngày đi</th>
                  <th className="py-3 px-4 text-center">Số tiền</th>
                  <th className="py-3 px-4 text-center">Thanh toán</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {lichSu.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-gray-500">
                      Không có dữ liệu lịch sử mua vé.
                    </td>
                  </tr>
                ) : (
                  lichSu.map((item) => (
                    <tr
                      key={item.madatve}
                      className="hover:bg-orange-50 transition-colors border-b border-gray-100"
                    >
                      <td className="py-2 px-4 text-center">{item.madatve}</td>
                      <td className="py-2 px-4 text-center">{item.soluong}</td>
                      <td className="py-2 px-4 text-center">
                        {item.bendi} - {item.benden}
                      </td>
                      <td className="py-2 px-4 text-center">{item.ngaydi}</td>
                      <td className="py-2 px-4 text-center">
                        {item.sotien.toLocaleString()} đ
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item.pttt || ""}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span
                          className={
                            item.trangthai === "Thành công"
                              ? "text-green-600 font-semibold"
                              : "text-red-500 font-semibold"
                          }
                        >
                          {item.trangthai}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button className="text-blue-600 hover:underline font-medium">
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutTaiKhoan>
    </>
  );
}

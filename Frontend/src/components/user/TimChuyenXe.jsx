import { ArrowLeftRight, Calendar, Users, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timChuyenXe } from "../../api/chuyenxe.js";
import FullscreenSpinner from "../common/FullScreenSpinner.jsx";
import { layDSTinh } from "../../api/tinh.js";

export default function TimChuyenXe() {
  const [diemDi, setDiemDi] = useState("");
  const [diemDen, setDiemDen] = useState("");
  const [maTinhDi, setMaTinhDi] = useState("");
  const [maTinhDen, setMaTinhDen] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [soLuongVe, setSoLuongVe] = useState(1);
  const [dsTinh, setDsTinh] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API lấy danh sách tỉnh khi component mount
    const fetchTinh = async () => {
      try {
        const res = await layDSTinh();
        setDsTinh(res);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh:", err);
        setDsTinh([]);
      }
    };
    fetchTinh();
  }, []);

  const handleTimChuyenXe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await timChuyenXe(maTinhDi, maTinhDen, ngayDi, soLuongVe);
      navigate("/tim-chuyen-xe", {
        state: { diemDi, diemDen, ngayDi, soLuongVe, ketQua: res },
      });
    } catch (error) {
      console.error("Lỗi khi tìm chuyến xe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8">
      {loading && <FullscreenSpinner />}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-orange-500 rounded-2xl p-6 md:p-8 shadow-xl">
          {/* Trip type selection */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="tripType"
                  defaultChecked
                  className="w-4 h-4 text-orange-500 border-2 border-gray-300 focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
                  Một chiều
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="tripType"
                  className="w-4 h-4 text-orange-500 border-2 border-gray-300 focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
                  Khứ hồi
                </span>
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors duration-200 hover:underline"
              >
                Hướng dẫn mua vé
              </a>
            </div>
          </div>

          {/* Tìm chuyến xe */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-5">
            {/* Cụm điểm đi, swap, điểm đến */}
            <div className="flex flex-1 gap-2">
              {/* Điểm đi */}
              <div className="flex-1">
                <label className="text-gray-700 text-sm font-semibold flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Điểm đi
                </label>
                <div className="relative">
                  <select
                    className="w-full h-12 border border-gray-200 focus:border-orange-500 rounded-lg px-4 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-gray-300"
                    value={maTinhDi}
                    onChange={(e) => {
                      setMaTinhDi(e.target.value);
                      setDiemDi(e.target.options[e.target.selectedIndex].text);
                    }}
                  >
                    <option value="">Chọn điểm đi</option>
                    {dsTinh.map((tinh) => (
                      <option key={tinh.maTinh} value={tinh.maTinh}>
                        {tinh.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Button swap */}
              <div className="flex items-end pb-0">
                <button
                  type="button"
                  className="h-10 w-10 bg-orange-50 hover:bg-orange-100 border border-orange-200 hover:border-orange-300 rounded-full flex items-center justify-center text-orange-500 hover:text-orange-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </button>
              </div>
              {/* Điểm đến */}
              <div className="flex-1">
                <label className="text-gray-700 text-sm font-semibold flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Điểm đến
                </label>
                <select
                  className="w-full h-12 border border-gray-200 focus:border-orange-500 rounded-lg px-4 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-gray-300"
                  value={maTinhDen}
                  onChange={(e) => {
                    setMaTinhDen(e.target.value);
                    setDiemDen(e.target.options[e.target.selectedIndex].text);
                  }}
                >
                  <option value="">Chọn điểm đến</option>
                  {dsTinh.map((tinh) => (
                    <option key={tinh.maTinh} value={tinh.maTinh}>
                      {tinh.ten}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Ngày đi và Số vé */}
            <div className="flex flex-1 gap-2 lg:gap-5">
              {/* Ngày đi */}
              <div className="flex-1">
                <label className="text-gray-700 text-sm font-semibold flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Ngày đi
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 border border-gray-200 focus:border-orange-500 rounded-lg px-4 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-gray-300"
                    type="date"
                    value={ngayDi}
                    onChange={(e) => setNgayDi(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end pb-0 h-10 w-10 lg:hidden"></div>
              {/*Số vé */}
              <div className="flex-1">
                <label className="text-gray-700 text-sm font-semibold flex items-center gap-1">
                  <Users className="w-4 h-4 text-purple-500" />
                  Số vé
                </label>
                <div className="relative">
                  <select
                    className="w-full h-12 border border-gray-200 focus:border-orange-500 rounded-lg px-4 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 hover:border-gray-300 appearance-none bg-white"
                    value={soLuongVe}
                    onChange={(e) => setSoLuongVe(Number(e.target.value))}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <Users className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Search button */}
          <div className="flex justify-center mt-8">
            <button
              type="button"
              disabled={loading}
              onClick={handleTimChuyenXe}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 min-w-[200px]"
            >
              🔍 Tìm chuyến xe
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                ✅ Đặt vé nhanh chóng
              </span>
              <span className="flex items-center gap-1">
                🎫 Thanh toán an toàn
              </span>
              <span className="flex items-center gap-1">📞 Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

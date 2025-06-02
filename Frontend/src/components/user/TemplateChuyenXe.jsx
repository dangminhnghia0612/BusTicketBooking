import { useEffect, useState } from "react";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import {
  formatDateTime,
  formatPrice,
  getParamsFromURL,
} from "../../lib/utils.js";
import { useLocation, useNavigate } from "react-router-dom";
import { timChuyenXe } from "../../api/chuyenxe.js";

export default function TemplateChuyenXe({ props }) {
  // const [activeTab, setActiveTab] = useState("price");
  const location = useLocation();
  const navigate = useNavigate();
  const [dsChuyenXe, setDsChuyenXe] = useState([]);

  // Lấy tham số từ URL
  const params = getParamsFromURL(location.search);
  const diemDi = params.diemDi || props.diemDi || "";
  const maTinhDi = params.maTinhDi || props.maTinhDi || "";
  const diemDen = params.diemDen || props.diemDen || "";
  const maTinhDen = params.maTinhDen || props.maTinhDen || "";
  const ngayDi = params.ngayDi || props.ngayDi || "";
  const soLuongVe = params.soLuongVe || props.soLuongVe || "";

  useEffect(() => {
    async function fetchData() {
      const ketQua = await timChuyenXe(maTinhDi, maTinhDen, ngayDi, soLuongVe);
      setDsChuyenXe(Array.isArray(ketQua) ? ketQua : []);
    }
    fetchData();
  }, [maTinhDi, maTinhDen, ngayDi, soLuongVe]);

  const handleChonChuyen = (chuyenxe) => {
    const params = new URLSearchParams({
      maChuyenXe: chuyenxe.ma_Chuyenxe,
      diemDi,
      diemDen,
      benDi: chuyenxe.bendi,
      benDen: chuyenxe.benden,
      ngayDi: chuyenxe.giodi,
      giaVe: chuyenxe.giave,
      soLuongVe,
    }).toString();
    navigate(`/dat-ve?${params}`);
  };

  // const tabs = [
  //   {
  //     id: "price",
  //     label: "Giá rẻ bất ngờ",
  //     icon: "💰",
  //     color: "bg-green-50 text-green-600 border-green-200",
  //   },
  //   {
  //     id: "time",
  //     label: "Giờ khởi hành",
  //     icon: "🕐",
  //     color: "bg-blue-50 text-blue-600 border-blue-200",
  //   },
  //   {
  //     id: "seats",
  //     label: "Ghế trống",
  //     icon: "💺",
  //     color: "bg-purple-50 text-purple-600 border-purple-200",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        {dsChuyenXe.length !== 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {diemDi}{" "}
                  <ArrowRight
                    className="inline mx-2 text-orange-500"
                    size={28}
                  />{" "}
                  {diemDen}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock size={16} />
                  Tìm thấy{" "}
                  <span className="font-semibold text-orange-600">
                    {dsChuyenXe.length}
                  </span>{" "}
                  chuyến xe
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                  {formatDateTime(ngayDi).date} • {soLuongVe} vé
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            {/* <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.color} shadow-md transform scale-105`
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-102"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div> */}
          </div>
        )}

        {/* Results Section */}
        {dsChuyenXe.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🚌</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Không tìm thấy chuyến xe
            </h3>
            <p className="text-gray-600 text-lg">
              Không có chuyến xe nào phù hợp với yêu cầu của bạn.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {dsChuyenXe.map((trip, index) => (
              <div
                key={trip.ma_Chuyenxe}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:border-orange-500"
              >
                <div className="p-4 md:p-8">
                  {/* Main Trip Info */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-6 md:gap-0">
                    {/* Departure Section */}
                    <div className="flex flex-col items-center text-center min-w-[120px]">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {formatDateTime(trip.giodi).time}
                      </div>
                      <div className="text-sm text-blue-500 mb-2 flex items-center gap-1">
                        <MapPin size={14} />
                        Điểm đi
                      </div>
                      <div className="text-sm text-gray-700 font-medium px-3 py-1 bg-gray-100 rounded-full">
                        {trip.bendi}
                      </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className="flex-1 mx-8">
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                          <div className="flex-1 h-1 bg-gradient-to-r from-green-500 via-orange-400 to-red-500 mx-4 rounded-full"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                        </div>

                        {/* Duration Info */}
                        <div className="text-center mt-3">
                          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Clock size={16} />
                            {trip.khoangthoigian} giờ
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrival Section */}
                    <div className="flex flex-col items-center text-center min-w-[120px]">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {formatDateTime(trip.gioden).time}
                      </div>
                      <div className="text-sm text-orange-500 mb-2 flex items-center gap-1">
                        <MapPin size={14} />
                        Điểm đến
                      </div>
                      <div className="text-sm text-gray-700 font-medium px-3 py-1 bg-orange-100 rounded-full">
                        {trip.benden}
                      </div>
                    </div>

                    {/* Vehicle & Seats Info */}
                    <div className="ml-8 text-center min-w-[140px]">
                      <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl mb-3">
                        <div className="text-sm font-medium">
                          {trip.tenloai}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-blue-600">
                        <Users size={16} />
                        <span className="font-semibold">
                          {trip.soGheConTrong}
                        </span>
                        <span className="text-sm">chỗ trống</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="ml-8 text-center md:text-right min-w-[120px]">
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        {formatPrice(trip.giave)}
                      </div>
                      <div className="text-sm text-gray-500">/ người</div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Còn chỗ</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Chuyến #{index + 1}
                      </div>
                    </div>

                    <button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => handleChonChuyen(trip)}
                    >
                      Chọn chuyến
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

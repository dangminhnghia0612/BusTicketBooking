import { AdminLayout } from "../../components/admin/AdminLayout";
import Cookies from "js-cookie";
import {
  BarChart3,
  Ticket,
  Users,
  Bus,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function BangDieuKhien() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thống Kê</h1>
      </div>

      <div className="flex mb-6 space-x-4 overflow-x-auto">
        <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900">
          Tổng quan
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Phân tích
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Tổng doanh thu */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Tổng doanh thu
            </span>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">152.000.000đ</div>
          <div className="flex items-center mt-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-xs text-green-500 font-medium ml-1">
              +20.1%
            </span>
            <span className="text-xs text-gray-500 ml-1">
              so với tháng trước
            </span>
          </div>
        </div>

        {/* Vé đã bán */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Vé đã bán</span>
            <Ticket className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">2,350</div>
          <div className="flex items-center mt-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-xs text-green-500 font-medium ml-1">
              +15%
            </span>
            <span className="text-xs text-gray-500 ml-1">
              so với tháng trước
            </span>
          </div>
        </div>

        {/* Người dùng mới */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Người dùng mới
            </span>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">+573</div>
          <div className="flex items-center mt-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-xs text-green-500 font-medium ml-1">
              +12.2%
            </span>
            <span className="text-xs text-gray-500 ml-1">
              so với tháng trước
            </span>
          </div>
        </div>

        {/* Chuyến xe hoạt động */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Chuyến xe hoạt động
            </span>
            <Bus className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">132</div>
          <div className="flex items-center mt-1">
            <svg
              className="w-4 h-4 text-red-500 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-xs text-red-500 font-medium ml-1">-3%</span>
            <span className="text-xs text-gray-500 ml-1">
              so với tháng trước
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doanh thu theo tháng */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Doanh thu theo tháng
          </h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">Biểu đồ doanh thu</p>
            </div>
          </div>
        </div>

        {/* Chuyến xe gần đây */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Chuyến xe gần đây
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            10 chuyến xe mới nhất trong hệ thống
          </p>
          <div className="space-y-4">
            {[
              { seats: "13/45" },
              { seats: "19/45" },
              { seats: "19/45" },
              { seats: "11/45" },
              { seats: "10/45" },
            ].map((trip, index) => (
              <div key={index} className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Hà Nội - Hồ Chí Minh
                  </p>
                  <p className="text-xs text-gray-500">
                    5/22/2025 - Xe giường nằm
                  </p>
                </div>
                <div className="ml-auto text-sm font-medium text-gray-900">
                  {trip.seats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

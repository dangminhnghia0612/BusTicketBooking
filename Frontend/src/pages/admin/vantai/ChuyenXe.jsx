import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";

export default function ChuyenXe() {
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Chuyến Xe"
        addButton={
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm chuyến xe
          </button>
        }
        search={
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm chuyến xe..."
                className="w-1/2 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="datetime-local"
                className="w-1/2 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Lọc
            </button>
          </div>
        }
        description="Danh sách các chuyến xe hiện có trong hệ thống."
        tableTitle="Danh sách chuyến xe"
        pagination={
          <>
            <div className="text-sm text-gray-500">
              Hiển thị 1-5 của 20 kết quả
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Trước
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Sau
              </button>
            </div>
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tuyến xe
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thời gian khởi hành
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Xe
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giá vé
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  route: "Hà Nội - Hồ Chí Minh",
                  time: "08:00 - 22/05/2025",
                  bus: "29A-12345",
                  price: "1,200,000đ",
                },
                {
                  route: "Hà Nội - Đà Nẵng",
                  time: "09:30 - 22/05/2025",
                  bus: "29A-54321",
                  price: "800,000đ",
                },
                {
                  route: "Hồ Chí Minh - Đà Lạt",
                  time: "10:15 - 22/05/2025",
                  bus: "51A-98765",
                  price: "350,000đ",
                },
                {
                  route: "Hà Nội - Hải Phòng",
                  time: "14:00 - 22/05/2025",
                  bus: "29A-45678",
                  price: "150,000đ",
                },
                {
                  route: "Hồ Chí Minh - Cần Thơ",
                  time: "15:30 - 22/05/2025",
                  bus: "51A-87654",
                  price: "200,000đ",
                },
              ].map((trip, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    CX{2000 + i}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {trip.route}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {trip.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {trip.bus}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {trip.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        i % 4 === 0
                          ? "bg-green-100 text-green-800"
                          : i % 4 === 1
                          ? "bg-blue-100 text-blue-800"
                          : i % 4 === 2
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {i % 4 === 0
                        ? "Đang chạy"
                        : i % 4 === 1
                        ? "Sắp khởi hành"
                        : i % 4 === 2
                        ? "Đã hoàn thành"
                        : "Đã hủy"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPageLayout>
    </AdminLayout>
  );
}

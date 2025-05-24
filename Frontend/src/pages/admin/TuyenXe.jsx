import React from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import AdminPageLayout from "../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";

export default function TuyenXe() {
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Tuyến Xe"
        addButton={
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm tuyến xe
          </button>
        }
        tableTitle="Danh sách tuyến xe"
        tableDescription="Quản lý tất cả các tuyến xe trong hệ thống"
        search={
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm tuyến xe..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Lọc
            </button>
          </div>
        }
        pagination={
          <>
            <div className="text-sm text-gray-500">
              Hiển thị 1-5 của 12 kết quả
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
                  Điểm đi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Điểm đến
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khoảng cách
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thời gian
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
                  from: "Hà Nội",
                  to: "Hồ Chí Minh",
                  distance: "1,760 km",
                  time: "36 giờ",
                },
                {
                  from: "Hà Nội",
                  to: "Đà Nẵng",
                  distance: "790 km",
                  time: "16 giờ",
                },
                {
                  from: "Hồ Chí Minh",
                  to: "Đà Lạt",
                  distance: "310 km",
                  time: "8 giờ",
                },
                {
                  from: "Hà Nội",
                  to: "Hải Phòng",
                  distance: "120 km",
                  time: "2.5 giờ",
                },
                {
                  from: "Hồ Chí Minh",
                  to: "Cần Thơ",
                  distance: "170 km",
                  time: "4 giờ",
                },
              ].map((route, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    TX{1000 + i}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {route.from}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {route.to}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {route.time}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        i % 3 === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {i % 3 === 0 ? "Hoạt động" : "Tạm ngưng"}
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

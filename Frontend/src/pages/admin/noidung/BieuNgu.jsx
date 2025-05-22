import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2, Eye } from "lucide-react";

export default function BieuNgu() {
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Banner"
        addButton={
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm biểu ngữ
          </button>
        }
        tableTitle="Danh sách banner"
        tableDescription="Quản lý tất cả các banner trong hệ thống"
        search={
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm biểu ngữ..."
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
              Hiển thị 1-5 của 8 kết quả
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
                  Tiêu đề
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hình ảnh
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vị trí
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày bắt đầu
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày kết thúc
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
                  title: "Khuyến mãi hè 2025",
                  image: "banner-summer.jpg",
                  position: "Trang chủ",
                  start: "01/06/2025",
                  end: "31/08/2025",
                  status: "Đang hiển thị",
                },
                {
                  title: "Tuyến xe mới",
                  image: "banner-new-route.jpg",
                  position: "Trang chủ",
                  start: "15/05/2025",
                  end: "15/06/2025",
                  status: "Đang hiển thị",
                },
                {
                  title: "Ưu đãi sinh viên",
                  image: "banner-student.jpg",
                  position: "Trang đặt vé",
                  start: "01/05/2025",
                  end: "30/06/2025",
                  status: "Đang hiển thị",
                },
                {
                  title: "Black Friday",
                  image: "banner-black-friday.jpg",
                  position: "Trang chủ",
                  start: "24/11/2025",
                  end: "27/11/2025",
                  status: "Chưa hiển thị",
                },
                {
                  title: "Tết Nguyên Đán",
                  image: "banner-tet.jpg",
                  position: "Trang chủ",
                  start: "15/01/2026",
                  end: "15/02/2026",
                  status: "Chưa hiển thị",
                },
              ].map((banner, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    BN{100 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="h-10 w-20 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                        {banner.image}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.start}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {banner.end}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        banner.status === "Đang hiển thị"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
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

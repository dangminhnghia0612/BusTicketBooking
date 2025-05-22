import { AdminLayout } from "../../components/admin/AdminLayout";
import AdminPageLayout from "../../components/admin/AdminPageLayout";
import { Search, Calendar, Eye, CheckCircle, XCircle } from "lucide-react";

export default function DatVe() {
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Đặt Vé"
        tableTitle="Danh sách đặt vé"
        tableDescription="Quản lý tất cả các đơn đặt vé trong hệ thống"
        search={
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm đơn đặt vé..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Chọn ngày
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                Lọc
              </button>
            </div>
          </div>
        }
        pagination={
          <>
            <div className="text-sm text-gray-500">
              Hiển thị 1-5 của 18 kết quả
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
                  Mã đặt vé
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khách hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Chuyến xe
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày đặt
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tổng tiền
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
                  customer: "Nguyễn Văn A",
                  trip: "Hà Nội - Hồ Chí Minh",
                  date: "20/05/2025",
                  quantity: 2,
                  total: "2,400,000đ",
                  status: "Đã thanh toán",
                },
                {
                  customer: "Trần Thị B",
                  trip: "Hà Nội - Đà Nẵng",
                  date: "20/05/2025",
                  quantity: 1,
                  total: "800,000đ",
                  status: "Chờ thanh toán",
                },
                {
                  customer: "Lê Văn C",
                  trip: "Hồ Chí Minh - Đà Lạt",
                  date: "21/05/2025",
                  quantity: 3,
                  total: "1,050,000đ",
                  status: "Đã thanh toán",
                },
                {
                  customer: "Phạm Thị D",
                  trip: "Hà Nội - Hải Phòng",
                  date: "21/05/2025",
                  quantity: 2,
                  total: "300,000đ",
                  status: "Đã hủy",
                },
                {
                  customer: "Hoàng Văn E",
                  trip: "Hồ Chí Minh - Cần Thơ",
                  date: "22/05/2025",
                  quantity: 4,
                  total: "800,000đ",
                  status: "Đã thanh toán",
                },
              ].map((booking, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    DV{3000 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.trip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "Đã thanh toán"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Chờ thanh toán"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      {booking.status === "Chờ thanh toán" && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
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

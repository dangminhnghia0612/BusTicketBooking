import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";

// const columns = [
//   {
//     key: "maxe",
//     title: "ID",
//     tdClassName: "px-6 py-4 text-sm font-bold",
//   },
//   { key: "bienso", title: "Biển số" },
//   { key: "tenloai", title: "Loại xe" },
//   { key: "soghe", title: "Số ghế" },
//   { key: "noidauxe", title: "Nơi đậu xe" },
//   { key: "tenxe", title: "Tên xe" },
//   {
//     key: "actions",
//     title: "Thao tác",
//     className:
//       "px-6 py-3 text-center text-xs font-bold uppercase tracking-wider",
//     render: (row, i, onDelete, onEdit) => (
//       <div className="flex justify-center space-x-2">
//         <button
//           className="text-blue-600 hover:text-blue-900"
//           onClick={() => onEdit(row)}
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           className="text-red-600 hover:text-red-900"
//           onClick={() => onDelete(row.maxe)}
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//     ),
//   },
// ];

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
      ></AdminPageLayout>
    </AdminLayout>
  );
}

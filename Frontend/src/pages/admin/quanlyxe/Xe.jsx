import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";
import { layDSXe, xoaXe, themXe, suaXe } from "../../../api/xe.js";
import { layDSTinh } from "../../../api/tinh.js";
import { layDSBenXeCuaTinh } from "../../../api/benxe.js";
import { layDSLoaiXe } from "../../../api/loaixe.js";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";

const columns = [
  {
    key: "maxe",
    title: "Mã xe",
    tdClassName: "px-6 py-4 text-sm font-bold",
  },
  { key: "bienso", title: "Biển số" },
  { key: "tenloai", title: "Loại xe" },
  { key: "soghe", title: "Số ghế" },
  { key: "noidauxe", title: "Nơi đậu xe" },
  { key: "tenxe", title: "Tên xe" },
  {
    key: "actions",
    title: "Thao tác",
    className:
      "px-6 py-3 text-center text-xs font-bold uppercase tracking-wider",
    render: (row, i, onDelete, onEdit) => (
      <div className="flex justify-center space-x-2">
        <button
          className="text-blue-600 hover:text-blue-900"
          onClick={() => onEdit(row)}
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => onDelete(row.maxe)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function Xe() {
  const [data, setData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dsTinh, setDsTinh] = useState([]);
  const [dsLoaiXe, setDsLoaiXe] = useState([]);
  const [dsBenXe, setDsBenXe] = useState([]);
  const [xe, setXe] = useState({
    bienso: "",
    tenxe: "",
    matinh: "",
    maloai: "",
    mabenxe: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await layDSXe();
      setData(res);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (openModal) {
      layDSTinh().then(setDsTinh);
      layDSLoaiXe().then(setDsLoaiXe);
    }
  }, [openModal]);

  const columnsWithActions = columns.map((col) =>
    col.key === "actions"
      ? {
          ...col,
          render: (row, i) =>
            columns
              .find((c) => c.key === "actions")
              .render(
                row,
                i,
                (maxe) => {
                  setDeleteId(maxe);
                  setConfirmOpen(true);
                },
                async (row) => {
                  setIsEdit(true);
                  setXe(row);
                  setOpenModal(true);
                  if (row.matinh) {
                    const ds = await layDSBenXeCuaTinh(row.matinh);
                    setDsBenXe(ds);
                  }
                }
              ),
        }
      : col
  );

  const handleDelete = async () => {
    setConfirmOpen(false);
    try {
      const res = await xoaXe(deleteId);
      if (res.message === "Xóa thành công") {
        const newData = await layDSXe();
        setData(newData);
        setAlertMsg("Xóa xe thành công");
      } else {
        setAlertMsg(res.message);
      }
    } catch (error) {
      setAlertMsg("Lỗi khi xóa xe: " + error.message);
    }
    setAlertOpen(true);
  };

  function resetModal() {
    setOpenModal(false);
    setXe({
      bienso: "",
      tenxe: "",
      matinh: "",
      maloai: "",
      mabenxe: "",
    });
    setDsBenXe([]);
  }

  const handleSave = async () => {
    try {
      if (!xe.bienso || !xe.maloai || !xe.mabenxe || !xe.matinh) {
        setAlertMsg(
          "Vui lòng điền và chọn đầy đủ thông tin xe với những trường (*)"
        );
        setAlertOpen(true);
        return;
      } else {
        if (isEdit) {
          const res = await suaXe(xe);
          if (res.message === "Sửa thành công") {
            const newData = await layDSXe();
            setData(newData);
            setAlertMsg("Sửa thông tin xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        } else {
          const res = await themXe(xe);
          if (res.message === "Thêm thành công") {
            const newData = await layDSXe();
            setData(newData);
            setAlertMsg("Thêm xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        }
      }
    } catch (error) {
      setAlertMsg("Lỗi khi lưu xe: " + error.message);
    }
    setAlertOpen(true);
  };

  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Xe"
        addButton={
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm xe mới
          </button>
        }
        search={
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm xe..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Lọc
            </button>
          </div>
        }
        description="Quản lý tất cả các xe trong hệ thống"
        tableTitle="Danh sách xe"
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
        <Table columns={columnsWithActions} data={data} />
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa"
          message={"Bạn có chắc chắn muốn xóa xe có ID " + deleteId + " không?"}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
        <AlertDialog
          open={alertOpen}
          title="Thông báo"
          message={alertMsg}
          onClose={() => setAlertOpen(false)}
        />
      </AdminPageLayout>
      <Modal
        open={openModal}
        title={isEdit ? "Chỉnh sửa xe" : "Thêm xe mới"}
        onClose={resetModal}
        handleSave={handleSave}
      >
        <div className="space-y-3">
          {/* Biển số */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biển số (51A-123.45)
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Biển số"
              value={xe.bienso}
              onChange={(e) => setXe({ ...xe, bienso: e.target.value })}
            />
          </div>
          {/* Loại xe*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại xe (*)
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={xe.maloai || ""}
              onChange={(e) => setXe({ ...xe, maloai: e.target.value })}
            >
              <option value="">Chọn loại xe</option>
              {dsLoaiXe.map((loai) => (
                <option key={loai.maloaixe} value={loai.maloaixe}>
                  {loai.tenloai}
                </option>
              ))}
            </select>
          </div>
          {/* Tỉnh và nơi đậu xe */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={xe.matinh || ""}
                onChange={(e) => handleChangeTinh(e, xe, setXe, setDsBenXe)}
              >
                <option value="">Chọn tỉnh</option>
                {dsTinh.map((tinh) => (
                  <option key={tinh.maTinh} value={tinh.maTinh}>
                    {tinh.ten}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nơi đậu xe (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={xe.mabenxe || ""}
                onChange={(e) => setXe({ ...xe, mabenxe: e.target.value })}
              >
                <option value="">Chọn nơi đậu xe</option>
                {dsBenXe.map((benXe) => (
                  <option key={benXe.mabenxe} value={benXe.mabenxe}>
                    {benXe.tenbenxe}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Tên xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên xe
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên xe"
              value={xe.tenxe}
              onChange={(e) => setXe({ ...xe, tenxe: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

async function handleChangeTinh(e, xe, setXe, setDsBenXe) {
  const maTinh = e.target.value;
  setXe({ ...xe, matinh: maTinh, mabenxe: "" }); // reset nơi đậu xe khi đổi tỉnh
  if (maTinh) {
    const ds = await layDSBenXeCuaTinh(maTinh);
    setDsBenXe(ds);
  } else {
    setDsBenXe([]);
  }
}

import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";
import { layDSBenXe, xoaBenXe, themBenXe, suaBenXe } from "../../../api/benxe";
import { layDSTinh } from "../../../api/tinh.js";
import { layDSQuanCuaTinh } from "../../../api/quan.js";

const columns = [
  {
    key: "mabenxe",
    title: "ID",
    tdClassName: "px-6 py-4 text-sm font-bold",
  },
  { key: "tenbenxe", title: "Tên bến xe" },
  { key: "diachiFull", title: "Địa chỉ" },
  { key: "sdt", title: "Số điện thoại" },
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
          onClick={() => onDelete(row.mabenxe)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function BenXe() {
  const [data, setData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dsTinh, setDsTinh] = useState([]);
  const [dsQuan, setDsQuan] = useState([]);
  const [benXe, setBenXe] = useState({
    tenbenxe: "",
    diachi: "",
    sdt: "",
    maquan: "",
    matinh: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await layDSBenXe();
      setData(res);
    }
    fetchData();
    if (openModal) {
      layDSTinh().then(setDsTinh);
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
                (mabenxe) => {
                  setDeleteId(mabenxe);
                  setConfirmOpen(true);
                },
                async (row) => {
                  setIsEdit(true);
                  setBenXe(row);
                  setOpenModal(true);
                  if (row.matinh) {
                    const ds = await layDSQuanCuaTinh(row.matinh);
                    setDsQuan(ds);
                  }
                }
              ),
        }
      : col
  );

  const handleDelete = async () => {
    setConfirmOpen(false);
    try {
      const res = await xoaBenXe(deleteId);
      if (res.message === "Xóa thành công") {
        setData((prev) => prev.filter((item) => item.mabenxe !== deleteId));
        setAlertMsg("Xóa bến xe thành công");
      } else {
        setAlertMsg(res.message);
      }
    } catch (error) {
      setAlertMsg("Lỗi khi xóa bến xe: " + error.message);
    }
    setAlertOpen(true);
  };

  function resetModal() {
    setOpenModal(false);
    setBenXe({
      tenbenxe: "",
      diachi: "",
      sdt: "",
      maquan: "",
      matinh: "",
    });
    setDsTinh([]);
  }

  const handleSave = async () => {
    try {
      if (!benXe.diachi || !benXe.maquan || !benXe.matinh) {
        setAlertMsg(
          "Vui lòng điền và chọn đầy đủ thông tin xe với những trường (*)"
        );
        setAlertOpen(true);
        return;
      } else {
        if (isEdit) {
          const res = await suaBenXe(benXe);
          if (res.message === "Sửa thành công") {
            setData((prev) =>
              prev.map((item) =>
                item.mabenxe === benXe.mabenxe ? benXe : item
              )
            );
            setAlertMsg("Sửa thông tin bến xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        } else {
          const res = await themBenXe(benXe);
          if (res.message === "Thêm thành công") {
            setData((prev) => [...prev, benXe]);
            setAlertMsg("Thêm bến xe thành công");
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
        title="Bến Xe"
        addButton={
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm bến xe
          </button>
        }
        tableTitle="Danh sách bến xe"
        tableDescription="Thông tin chi tiết về các bến xe trong hệ thống"
        search={
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm bến xe..."
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
        <Table columns={columnsWithActions} data={data} />
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa"
          message={
            "Bạn có chắc chắn muốn xóa bến xe có ID " + deleteId + " không?"
          }
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
        // title={isEdit ? "Chỉnh sửa bến xe" : "Thêm bến xe mới"}
        title={"Thêm bến xe mới"}
        onClose={resetModal}
        handleSave={handleSave}
      >
        <div className="space-y-3">
          {/* Tên bến xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên bến xe
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên bến xe"
              value={benXe.tenbenxe}
              onChange={(e) => setBenXe({ ...benXe, tenbenxe: e.target.value })}
            />
          </div>
          {/* Tỉnh và quận */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh/Thành phố (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={benXe.matinh || ""}
                onChange={(e) =>
                  handleChangeTinh(e, benXe, setBenXe, setDsQuan)
                }
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
                Quận/Huyện (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={benXe.maquan || ""}
                onChange={(e) => setBenXe({ ...benXe, maquan: e.target.value })}
              >
                <option value="">Chọn quận</option>
                {dsQuan.map((quan) => (
                  <option key={quan.maquan} value={quan.maquan}>
                    {quan.tenquan}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Địa chỉ*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ (*)
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Địa chỉ"
              value={benXe.diachi || ""}
              onChange={(e) => setBenXe({ ...benXe, diachi: e.target.value })}
            />
          </div>
          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Số điện thoại"
              value={benXe.sdt || ""}
              onChange={(e) => setBenXe({ ...benXe, sdt: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

async function handleChangeTinh(e, benXe, setBenXe, setDsQuan) {
  const maTinh = e.target.value;
  setBenXe({ ...benXe, matinh: maTinh, maquan: "" }); // reset quận khi đổi tỉnh
  if (maTinh) {
    const ds = await layDSQuanCuaTinh(maTinh);
    setDsQuan(ds);
  } else {
    setDsQuan([]);
  }
}

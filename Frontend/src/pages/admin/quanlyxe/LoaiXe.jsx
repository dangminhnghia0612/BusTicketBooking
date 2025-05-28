import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";
import {
  layDSLoaiXe,
  xoaLoaiXe,
  themLoaiXe,
  suaLoaiXe,
} from "../../../api/loaixe.js";

const columns = [
  {
    key: "maloaixe",
    title: "Mã loại xe",
    tdClassName: "px-6 py-4 text-sm font-bold",
  },
  { key: "tenloai", title: "Loại xe" },
  { key: "soluongghe", title: "Số lượng ghế" },
  {
    key: "nvs",
    title: "Nhà vệ sinh",
    render: (row) => (
      <div className="px-6 py-4 text-sm">{row.nvs ? "Có" : "Không"}</div>
    ),
  },
  {
    key: "anh",
    title: "Ảnh",
    render: (row) => (
      <img
        className="w-64 h-24 object-cover rounded"
        src={row.anh}
        alt={`Ảnh ${row.tenloai}`}
      />
    ),
  },
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
          onClick={() => onDelete(row.maloaixe)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function LoaiXe() {
  const [data, setData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [soTang, setSoTang] = useState(1);
  const [soDay, setSoDay] = useState(1);
  const [soGheMoiDay, setSoGheMoiDay] = useState([1]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loaiXe, setLoaiXe] = useState({
    tenloai: "",
    soluongghe: 1,
    nvs: false,
    anh: null,
  });
  useEffect(() => {
    async function fetchData() {
      const res = await layDSLoaiXe();
      setData(res);
    }
    fetchData();
  }, []);

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
                (maloaixe) => {
                  setDeleteId(maloaixe);
                  setConfirmOpen(true);
                },
                (row) => {
                  setIsEdit(true);
                  setEditId(row.maloaixe);
                  setLoaiXe({
                    tenloai: row.tenloai,
                    soluongghe: row.soluongghe,
                    nvs: row.nvs,
                    anh: null,
                  });
                  const sodogheObj = JSON.parse(row.sodoghe);
                  const soTang = sodogheObj.length;
                  const soDay = sodogheObj[0]?.cacday.length || 1;
                  const soGheMoiDay = sodogheObj[0]?.cacday.map(
                    (day) => day.soghe.length
                  ) || [1];
                  setSoTang(soTang);
                  setSoDay(soDay);
                  setSoGheMoiDay(soGheMoiDay);
                  setPreviewImage(row.anh ? row.anh : "");
                  setOpenModal(true);
                }
              ),
        }
      : col
  );

  const handleDelete = async () => {
    setConfirmOpen(false);
    try {
      const res = await xoaLoaiXe(deleteId);
      if (res.message === "Xóa thành công") {
        const newData = await layDSLoaiXe();
        setData(newData);
        setAlertMsg("Xóa loại xe thành công");
      } else {
        setAlertMsg("Không thể xóa: " + res.message);
      }
    } catch (error) {
      setAlertMsg("Lỗi khi xóa loại xe: " + error.message);
    }
    setAlertOpen(true);
  };

  function resetModal() {
    setOpenModal(false);
    setLoaiXe({
      tenloai: "",
      soluongghe: 1,
      nvs: false,
      anh: null,
    });
    setPreviewImage("");
    setSoTang(1);
    setSoDay(1);
    setSoGheMoiDay([1]);
  }

  const handleSave = async () => {
    try {
      if (
        !loaiXe.tenloai ||
        !loaiXe.soluongghe ||
        !soTang ||
        !soDay ||
        !soGheMoiDay
      ) {
        setAlertMsg(
          "Vui lòng điền và chọn đầy đủ thông tin xe với những trường (*)"
        );
        setAlertOpen(true);
        return;
      } else {
        const formData = new FormData();
        formData.append("Tenloai", loaiXe.tenloai);
        formData.append("Soluongghe", loaiXe.soluongghe);
        formData.append("Nhavesinh", loaiXe.nvs);
        formData.append("Sodoghe.SoTang", soTang);
        formData.append("Sodoghe.SoDay", soDay);
        soGheMoiDay.forEach((val, idx) => {
          formData.append(`Sodoghe.SoGheMoiDay[${idx}]`, val);
        });
        if (loaiXe.anh) {
          formData.append("anh", loaiXe.anh);
        }
        if (isEdit) {
          const res = await suaLoaiXe(editId, formData);
          if (res.message === "Sửa thành công") {
            const newData = await layDSLoaiXe();
            setData(newData);
            setAlertMsg("Sửa thông tin loại xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        } else {
          const res = await themLoaiXe(formData);
          if (res.message === "Thêm thành công") {
            const newData = await layDSLoaiXe();
            setData(newData);
            setAlertMsg("Thêm loại xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        }
      }
    } catch (error) {
      setAlertMsg("Lỗi khi lưu loại xe: " + error.message);
    }
    setAlertOpen(true);
  };
  return (
    <AdminLayout>
      <AdminPageLayout
        title="Quản Lý Loại Xe"
        addButton={
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm loại xe
          </button>
        }
        search={
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Tìm kiếm loại xe..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Lọc
            </button>
          </div>
        }
        description="Quản lý các loại xe trong hệ thống"
        tableTitle="Loại xe"
      >
        <Table columns={columnsWithActions} data={data} />
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa"
          message={
            "Bạn có chắc chắn muốn xóa loại xe có ID " + deleteId + " không?"
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
        title={isEdit ? "Chỉnh sửa loại xe" : "Thêm loại xe mới"}
        onClose={resetModal}
        handleSave={handleSave}
      >
        <div className="space-y-3">
          {/* Tên loại xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên loại xe (*)
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Tên loại xe"
              value={loaiXe.tenloai}
              onChange={(e) =>
                setLoaiXe({ ...loaiXe, tenloai: e.target.value })
              }
            />
          </div>
          {/* Số lượng ghế */}
          <div>
            <label
              hidden={isEdit}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số lượng ghế (*)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Số lượng ghế"
              value={loaiXe.soluongghe}
              hidden={isEdit}
              onChange={(e) =>
                setLoaiXe({ ...loaiXe, soluongghe: e.target.value })
              }
            />
          </div>
          {/* Nhà vệ sinh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhà vệ sinh (*)
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={loaiXe.nvs}
              onChange={(e) =>
                setLoaiXe({ ...loaiXe, nvs: e.target.value === "true" })
              }
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>
          {/* Số tầng */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              hidden={isEdit}
            >
              Số tầng (*)
            </label>
            <input
              type="number"
              min={1}
              className="w-full border rounded px-3 py-2"
              value={soTang}
              onChange={(e) => setSoTang(Number(e.target.value))}
              hidden={isEdit}
            />
          </div>
          {/* Số dãy */}
          <div>
            <label
              hidden={isEdit}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số dãy (*)
            </label>
            <input
              type="number"
              min={1}
              className="w-full border rounded px-3 py-2"
              value={soDay}
              hidden={isEdit}
              onChange={(e) => handleChangeSoDay(e, setSoDay, setSoGheMoiDay)}
            />
          </div>
          {/* Số ghế từng dãy  */}
          <div>
            <label
              hidden={isEdit}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số ghế từng dãy (*)
            </label>
            <div className="grid grid-cols-1 gap-2">
              {Array.from({ length: soDay }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-10">
                  <span
                    hidden={isEdit}
                    className="text-sm font-medium text-gray-700 "
                  >
                    Dãy {idx + 1} (*):
                  </span>
                  <input
                    type="number"
                    min={1}
                    hidden={isEdit}
                    className="w-fit border rounded px-3 py-2"
                    value={soGheMoiDay[idx] || 1}
                    onChange={(e) => {
                      const arr = [...soGheMoiDay];
                      arr[idx] = Number(e.target.value);
                      setSoGheMoiDay(arr);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setLoaiXe, setPreviewImage)}
              className="w-full border rounded px-3 py-2"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-fit h-32 object-cover border rounded"
              />
            )}
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

function handleFileChange(e, setLoaiXe, setPreviewImage) {
  const file = e.target.files[0];
  if (file) {
    setLoaiXe((prev) => ({ ...prev, anh: file }));
    // Tạo preview
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  } else {
    // Nếu không có file (bấm cancel hoặc xóa), reset preview và state ảnh
    setPreviewImage("");
    setLoaiXe((prev) => ({ ...prev, anh: null }));
  }
}

function handleChangeSoDay(e, setSoDay, setSoGheMoiDay) {
  const value = Number(e.target.value);
  setSoDay(value);
  setSoGheMoiDay((prev) => {
    const newArr = [...prev];
    if (value > prev.length) {
      // Thêm dãy mới với mặc định 1 ghế
      for (let i = prev.length; i < value; i++) newArr.push(1);
    } else {
      // Giảm số dãy
      newArr.length = value;
    }
    return newArr;
  });
}

import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";
import { formatDateTime } from "../../../lib/utils.js";
import {
  layDSChuyenXe,
  themChuyenXe,
  xoaChuyenXe,
  suaChuyenXe,
} from "../../../api/chuyenxe.js";
import { layDSTinh } from "../../../api/tinh.js";
import { layDSTuyenXeTheoTinh } from "../../../api/tuyenxe.js";
import { layDSXeTheoNoiDau } from "../../../api/xe.js";

const columns = [
  {
    key: "maChuyenxe",
    title: "Mã chuyến",
    tdClassName: "px-6 py-4 text-sm font-bold",
  },
  {
    key: "tenTuyen",
    title: "Tuyến xe",
    render: (row) => {
      const arr = row.loTrinh || [];
      if (arr.length === 0)
        return <span className="text-gray-400 italic">Chưa xác định</span>;
      return (
        <span>
          {arr[0].tenTinh} <span className="mx-1 text-gray-500">-</span>{" "}
          {arr[arr.length - 1].tenTinh}
        </span>
      );
    },
  },
  {
    key: "loTrinh",
    title: "Lộ trình",
    render: (row) => {
      const arr = row.loTrinh || [];
      if (arr.length === 0)
        return <span className="text-gray-400 italic">Chưa có lộ trình</span>;
      const start = arr[0]?.tenBenXe || "";
      const end = arr[arr.length - 1]?.tenBenXe || "";
      const middle = arr.slice(1, arr.length - 1);
      return (
        <div>
          <span className="font-semibold text-blue-600 text-sm">
            {start} <span className="mx-2 text-gray-700 font-bold">→</span>{" "}
            {end}
          </span>
          {middle.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Qua: {middle.map((item) => item.tenTinh).join(" → ")}
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "giodi",
    title: "Giờ đi",
    render: (row) => {
      const { date, time } = formatDateTime(row.giodi);
      return (
        <div>
          <div className="font-semibold text-sm">{date}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      );
    },
  },
  // {
  //   key: "gioden",
  //   title: "Dự kiến đến",
  //   render: (row) => {
  //     const { date, time } = formatDateTime(row.gioden);
  //     return (
  //       <div>
  //         <div className="font-semibold">{date}</div>
  //         <div className="text-xs text-gray-500">{time}</div>
  //       </div>
  //     );
  //   },
  // },
  {
    key: "bienso",
    title: "Xe",
    render: (row) => {
      return <div className="text-sm font-semibold">{row.bienso}</div>;
    },
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
          onClick={() => onDelete(row.maChuyenxe)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function ChuyenXe() {
  const [data, setData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dsTinh, setDsTinh] = useState([]);
  const [dsTuyenXe, setDsTuyenXe] = useState([]);
  const [dsXe, setDsXe] = useState([]);
  const [chuyenXe, setChuyenXe] = useState({
    maTinhDi: "",
    maTinhDen: "",
    maTuyenXe: "",
    maXe: "",
    gioDi: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await layDSChuyenXe();
      setData(res);
    }
    fetchData();
  }, []);
  useEffect(() => {
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
                (maChuyenxe) => {
                  setDeleteId(maChuyenxe);
                  setConfirmOpen(true);
                },
                (row) => loadModalData(row)
              ),
        }
      : col
  );

  const handleDelete = async () => {
    setConfirmOpen(false);
    try {
      const res = await xoaChuyenXe(deleteId);
      if (res.message === "Xóa thành công") {
        const newData = await layDSChuyenXe();
        setData(newData);
        setAlertMsg("Xóa chuyến xe thành công");
      } else {
        setAlertMsg(res.message);
      }
    } catch (error) {
      setAlertMsg("Lỗi khi xóa chuyến xe: " + error.message);
    }
    setAlertOpen(true);
  };

  function resetModal() {
    setOpenModal(false);
    setChuyenXe({
      maTinhDi: "",
      maTinhDen: "",
      maTuyenXe: "",
      maXe: "",
      gioDi: "",
    });
    setIsEdit(false);
  }

  async function loadModalData(row) {
    setIsEdit(true);
    setOpenModal(true);

    // 1. Set dữ liệu chuyến xe
    setChuyenXe({
      maChuyenXe: row.maChuyenxe || "",
      maTinhDi: row.loTrinh[0]?.maTinh || "",
      maTinhDen: row.loTrinh[row.loTrinh.length - 1]?.maTinh || "",
      maTuyenXe: row.maTuyenxe || "",
      maXe: row.maXe || row.maxe || "",
      gioDi: row.giodi ? row.giodi.slice(0, 16) : "", // Nếu là ISO string, cắt về yyyy-MM-ddTHH:mm
    });

    // 2. Load danh sách tỉnh (nếu cần, bạn đã có useEffect khi openModal)
    // 3. Load danh sách tuyến xe theo tỉnh đi/đến
    if (row.loTrinh[0]?.maTinh && row.loTrinh[row.loTrinh.length - 1]?.maTinh) {
      const dsTuyen = await layDSTuyenXeTheoTinh(
        row.loTrinh[0].maTinh,
        row.loTrinh[row.loTrinh.length - 1].maTinh
      );
      setDsTuyenXe(dsTuyen);
    }

    // 4. Load danh sách xe theo bến đi của tuyến
    if (row.loTrinh[0]?.maBenxe) {
      const dsXe = await layDSXeTheoNoiDau(row.loTrinh[0].maBenxe);
      setDsXe(dsXe);
    }
  }

  const handleSave = async () => {
    try {
      if (
        !chuyenXe.maTinhDi ||
        !chuyenXe.maTinhDen ||
        !chuyenXe.maTuyenXe ||
        !chuyenXe.maXe ||
        !chuyenXe.gioDi
      ) {
        setAlertMsg(
          "Vui lòng điền và chọn đầy đủ thông tin xe với những trường (*)"
        );
        setAlertOpen(true);
        return;
      } else {
        if (isEdit) {
          const res = await suaChuyenXe(chuyenXe);
          if (res.message === "Sửa thành công") {
            const newData = await layDSChuyenXe();
            setData(newData);
            setAlertMsg("Sửa thông tin chuyến xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        } else {
          const res = await themChuyenXe(chuyenXe);
          if (res.message === "Thêm thành công") {
            const newData = await layDSChuyenXe();
            setData(newData);
            setAlertMsg("Thêm chuyến xe thành công");
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
        title="Quản Lý Chuyến Xe"
        addButton={
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
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
        <Table columns={columnsWithActions} data={data} />
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa"
          message={
            "Bạn có chắc chắn muốn xóa chuyến xe có ID " + deleteId + " không?"
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
        title={isEdit ? "Chỉnh sửa chuyến xe" : "Thêm chuyến xe mới"}
        onClose={resetModal}
        handleSave={handleSave}
      >
        <div className="space-y-3">
          {/* Tỉnh đi và tỉnh đến */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh đi (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={chuyenXe.maTinhDi || ""}
                onChange={(e) =>
                  handleChangeTinh(e, chuyenXe, setChuyenXe, setDsTuyenXe, "di")
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
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh đến (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={chuyenXe.maTinhDen || ""}
                onChange={(e) =>
                  handleChangeTinh(
                    e,
                    chuyenXe,
                    setChuyenXe,
                    setDsTuyenXe,
                    "den"
                  )
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
          </div>
          {/* Tuyến Xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Tuyến xe (*)
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={chuyenXe.maTuyenXe || ""}
              onChange={(e) =>
                handleChangeTuyen(e, dsTuyenXe, setChuyenXe, setDsXe)
              }
            >
              <option value="">Chọn tuyến</option>
              {dsTuyenXe.map((tuyen) => (
                <option key={tuyen.maTuyenxe} value={tuyen.maTuyenxe}>
                  ({tuyen.maTuyenxe}) {tuyen.bendi} - {tuyen.benden}
                </option>
              ))}
            </select>
          </div>
          {/* Xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Xe (*)
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={chuyenXe.maXe || ""}
              onChange={(e) =>
                setChuyenXe({ ...chuyenXe, maXe: e.target.value })
              }
            >
              <option value="">Chọn xe</option>
              {dsXe.map((xe) => (
                <option key={xe.maxe} value={xe.maxe}>
                  {xe.bienso} - {xe.loaixe}
                </option>
              ))}
            </select>
          </div>
          {/* Ngày đi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày và giờ đi (*)
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={chuyenXe.gioDi || ""}
              onChange={(e) =>
                setChuyenXe({ ...chuyenXe, gioDi: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

async function handleChangeTinh(e, chuyenXe, setChuyenXe, setDsTuyenXe, type) {
  const value = e.target.value;
  let newChuyenXe = { ...chuyenXe };

  if (type === "di") {
    newChuyenXe.maTinhDi = value;
  } else if (type === "den") {
    newChuyenXe.maTinhDen = value;
  }

  setChuyenXe(newChuyenXe);

  // Chỉ gọi API khi cả hai tỉnh đã được chọn
  if (newChuyenXe.maTinhDi && newChuyenXe.maTinhDen) {
    try {
      const dsTuyen = await layDSTuyenXeTheoTinh(
        newChuyenXe.maTinhDi,
        newChuyenXe.maTinhDen
      );
      setDsTuyenXe(dsTuyen);
      // Reset tuyến xe đã chọn nếu không còn phù hợp
      setChuyenXe((prev) => ({ ...prev, maTuyenXe: "" }));
    } catch (error) {
      console.log(error);
      setDsTuyenXe([]);
    }
  } else {
    setDsTuyenXe([]);
    setChuyenXe((prev) => ({ ...prev, maTuyenXe: "" }));
  }
}

async function handleChangeTuyen(e, dsTuyenXe, setChuyenXe, setDsXe) {
  const maTuyenXe = e.target.value;
  setChuyenXe((prev) => ({ ...prev, maTuyenXe }));

  // Tìm tuyến xe đã chọn trong dsTuyenXe để lấy maBendi
  const tuyen = dsTuyenXe.find(
    (t) => String(t.maTuyenxe) === String(maTuyenXe)
  );
  if (tuyen && tuyen.maBendi) {
    try {
      const dsXe = await layDSXeTheoNoiDau(tuyen.maBendi);
      setDsXe(dsXe);
      // Reset xe đã chọn nếu không còn phù hợp
      setChuyenXe((prev) => ({ ...prev, maXe: "" }));
    } catch (error) {
      console.log(error);
      setDsXe([]);
      setChuyenXe((prev) => ({ ...prev, maXe: "" }));
    }
  } else {
    setDsXe([]);
    setChuyenXe((prev) => ({ ...prev, maXe: "" }));
  }
}

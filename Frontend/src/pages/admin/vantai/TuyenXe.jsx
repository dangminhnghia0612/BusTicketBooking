import { useEffect, useState } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import AdminPageLayout from "../../../components/admin/AdminPageLayout";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import Table from "../../../components/admin/Table";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AlertDialog from "../../../components/common/AlertDialog";
import Modal from "../../../components/admin/Modal";
import {
  layDSTuyenXe,
  xoaTuyenXe,
  themTuyenXe,
  suaTuyenXe,
} from "../../../api/tuyenxe.js";
import { layDSTinh } from "../../../api/tinh.js";
import { layDSBenXeCuaTinh } from "../../../api/benxe.js";

const columns = [
  {
    key: "maTuyenXe",
    title: "ID",
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
    tdClassName: "px-6 py-4",
  },
  { key: "khoangThoiGian", title: "Khoảng thời gian" },
  { key: "khoangCach", title: "Khoảng cách" },
  { key: "giaVe", title: "Giá vé" },
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
          onClick={() => onDelete(row.maTuyenXe)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function TuyenXe() {
  const [data, setData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dsTinh, setDsTinh] = useState([]);
  const [dsBenXeDi, setDsBenXeDi] = useState([]);
  const [dsBenXeDen, setDsBenXeDen] = useState([]);
  const [soBenTrungGian, setSoBenTrungGian] = useState(0);
  const [loTrinh, setLoTrinh] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tuyenXe, setTuyenXe] = useState({
    maTinhDi: "",
    maBenDi: "",
    maTinhDen: "",
    maBenDen: "",
    khoangThoiGian: "",
    khoangCach: "",
    giaVe: "",
  });
  useEffect(() => {
    async function fetchData() {
      const res = await layDSTuyenXe();
      setData(res);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (openModal) {
      layDSTinh().then(setDsTinh);
    }
  }, [openModal]);
  useEffect(() => {
    setLoTrinh((prev) => {
      const arr = [...prev];
      if (soBenTrungGian > arr.length) {
        // Thêm mới
        for (let i = arr.length; i < soBenTrungGian; i++) {
          arr.push({ maTinh: "", maBenXe: "", dsBenXe: [] });
        }
      } else if (soBenTrungGian < arr.length) {
        // Giảm bớt
        arr.length = soBenTrungGian;
      }
      return arr;
    });
  }, [soBenTrungGian]);

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
                (maTuyenXe) => {
                  setDeleteId(maTuyenXe);
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
      const res = await xoaTuyenXe(deleteId);
      if (res.message === "Xóa thành công") {
        const newData = await layDSTuyenXe();
        setData(newData);
        setAlertMsg("Xóa tuyến xe thành công");
      } else {
        setAlertMsg(res.message);
      }
    } catch (error) {
      setAlertMsg("Lỗi khi xóa tuyến xe: " + error.message);
    }
    setAlertOpen(true);
  };

  function resetModal() {
    setOpenModal(false);
    setTuyenXe({
      maTinhDi: "",
      maBenDi: "",
      maTinhDen: "",
      maBenDen: "",
      khoangThoiGian: "",
      khoangCach: "",
      giaVe: "",
    });
    setDsBenXeDi([]);
    setDsBenXeDen([]);
    setSoBenTrungGian(0);
    setLoTrinh([]);
  }
  async function loadModalData(row) {
    setIsEdit(true);
    setOpenModal(true);

    // Set dữ liệu tuyến xe
    setTuyenXe({
      maTinhDi: row.loTrinh[0]?.maTinh || "",
      maBenDi: row.loTrinh[0]?.maBenxe || "",
      maTinhDen: row.loTrinh[row.loTrinh.length - 1]?.maTinh || "",
      maBenDen: row.loTrinh[row.loTrinh.length - 1]?.maBenxe || "",
      khoangThoiGian: row.khoangThoiGian,
      khoangCach: row.khoangCach,
      giaVe: row.giaVe,
      maTuyenXe: row.maTuyenXe, // để gửi lên khi sửa
    });

    // Load danh sách bến đi
    if (row.loTrinh[0]?.maTinh) {
      const dsDi = await layDSBenXeCuaTinh(row.loTrinh[0].maTinh);
      setDsBenXeDi(dsDi);
    }

    // Load danh sách bến đến
    if (row.loTrinh[row.loTrinh.length - 1]?.maTinh) {
      const dsDen = await layDSBenXeCuaTinh(
        row.loTrinh[row.loTrinh.length - 1].maTinh
      );
      setDsBenXeDen(dsDen);
    }

    // Xử lý bến trung gian
    const trungGian = row.loTrinh.slice(1, row.loTrinh.length - 1) || [];
    console.log("Trung gian:", trungGian);
    setSoBenTrungGian(trungGian.length);
    // Load dsBenXe cho từng tỉnh trung gian
    const loTrinhArr = await Promise.all(
      trungGian.map(async (item) => ({
        maTinh: item.maTinh,
        maBenXe: item.maBenxe,
        dsBenXe: item.maTinh ? await layDSBenXeCuaTinh(item.maTinh) : [],
      }))
    );
    setLoTrinh(loTrinhArr);
  }
  const handleSave = async () => {
    try {
      if (
        !tuyenXe.maTinhDi ||
        !tuyenXe.maBenDi ||
        !tuyenXe.maTinhDen ||
        !tuyenXe.maBenDen ||
        !tuyenXe.khoangThoiGian ||
        !tuyenXe.khoangCach ||
        !tuyenXe.giaVe
      ) {
        setAlertMsg(
          "Vui lòng điền và chọn đầy đủ thông tin xe với những trường (*)"
        );
        setAlertOpen(true);
        return;
      } else {
        const loTrinhFull = [
          tuyenXe.maBenDi,
          ...loTrinh.map((item) => item.maBenXe),
          tuyenXe.maBenDen,
        ];
        if (isEdit) {
          const res = await suaTuyenXe(tuyenXe, loTrinhFull);
          if (res.message === "Sửa thành công") {
            const newData = await layDSTuyenXe();
            setData(newData);
            setAlertMsg("Sửa thông tin tuyến xe thành công");
            resetModal();
          } else {
            setAlertMsg(res.message);
          }
        } else {
          const res = await themTuyenXe(tuyenXe, loTrinhFull);
          if (res.message === "Thêm thành công") {
            const newData = await layDSTuyenXe();
            setData(newData);
            setAlertMsg("Thêm tuyến xe thành công");
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
        title="Quản Lý Tuyến Xe"
        addButton={
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm tuyến xe
          </button>
        }
        description="Quản lý tất cả các tuyến xe trong hệ thống"
        tableTitle="Danh sách tuyến xe"
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
        <Table columns={columnsWithActions} data={data} />
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa"
          message={
            "Bạn có chắc chắn muốn xóa tuyến xe có ID " + deleteId + " không?"
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
        title={isEdit ? "Chỉnh sửa tuyến xe" : "Thêm tuyến xe mới"}
        onClose={resetModal}
        handleSave={handleSave}
      >
        <div className="space-y-3">
          {/* Tỉnh và bến đi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh đi (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={tuyenXe.maTinhDi || ""}
                onChange={(e) =>
                  handleChangeTinh(e, tuyenXe, setTuyenXe, setDsBenXeDi, "di")
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
                Bến đi (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={tuyenXe.maBenDi || ""}
                onChange={(e) =>
                  setTuyenXe({ ...tuyenXe, maBenDi: e.target.value })
                }
              >
                <option value="">Chọn bến đi</option>
                {dsBenXeDi.map((benXe) => (
                  <option key={benXe.mabenxe} value={benXe.mabenxe}>
                    {benXe.tenbenxe}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Tỉnh và bến đến */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Tỉnh đến (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={tuyenXe.maTinhDen || ""}
                onChange={(e) =>
                  handleChangeTinh(e, tuyenXe, setTuyenXe, setDsBenXeDen, "den")
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
                Bến đến (*)
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={tuyenXe.maBenDen || ""}
                onChange={(e) =>
                  setTuyenXe({ ...tuyenXe, maBenDen: e.target.value })
                }
              >
                <option value="">Chọn bến đến</option>
                {dsBenXeDen.map((benXe) => (
                  <option key={benXe.mabenxe} value={benXe.mabenxe}>
                    {benXe.tenbenxe}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Số lượng bến trung gian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số bến trung gian
            </label>
            <input
              type="number"
              min={0}
              className="w-full border rounded px-3 py-2"
              value={soBenTrungGian}
              onChange={(e) => setSoBenTrungGian(Number(e.target.value))}
            />
          </div>

          {/* Danh sách lộ trình trung gian */}
          {loTrinh.map((item, idx) => (
            <div className="grid grid-cols-2 gap-4" key={idx}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tỉnh trung gian {idx + 1}
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={item.maTinh || ""}
                  onChange={(e) =>
                    handleChangeTinhTrungGian(e, idx, setLoTrinh)
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
                  Bến trung gian {idx + 1}
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={item.maBenXe || ""}
                  onChange={(e) =>
                    handleChangeBenXeTrungGian(e, idx, setLoTrinh)
                  }
                >
                  <option value="">Chọn bến xe</option>
                  {item.dsBenXe.map((benXe) => (
                    <option key={benXe.mabenxe} value={benXe.mabenxe}>
                      {benXe.tenbenxe}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          {/* Khoảng thời gian*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khoảng thời gian (*)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="khoảng thời gian (giờ)"
              value={tuyenXe.khoangThoiGian || ""}
              onChange={(e) =>
                setTuyenXe({ ...tuyenXe, khoangThoiGian: e.target.value })
              }
            />
          </div>
          {/* Khoảng cách*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khoảng cách (*)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="khoảng cách (km)"
              value={tuyenXe.khoangCach || ""}
              onChange={(e) =>
                setTuyenXe({ ...tuyenXe, khoangCach: e.target.value })
              }
            />
          </div>
          {/* Giá vé*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá vé (*)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Giá vé"
              value={tuyenXe.giaVe || ""}
              onChange={(e) =>
                setTuyenXe({ ...tuyenXe, giaVe: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

async function handleChangeTinh(e, tuyenXe, setTuyenXe, setDsBenXe, type) {
  const maTinh = e.target.value;
  if (type === "di") {
    setTuyenXe({ ...tuyenXe, maTinhDi: maTinh, maBenDi: "" }); // reset bến đi khi đổi tỉnh đi
  } else if (type === "den") {
    setTuyenXe({ ...tuyenXe, maTinhDen: maTinh, maBenDen: "" }); // reset bến đến khi đổi tỉnh đến
  }
  if (maTinh) {
    const ds = await layDSBenXeCuaTinh(maTinh);
    setDsBenXe(ds);
  } else {
    setDsBenXe([]);
  }
}

async function handleChangeTinhTrungGian(e, idx, setLoTrinh) {
  const maTinh = e.target.value;
  const dsBenXe = maTinh ? await layDSBenXeCuaTinh(maTinh) : [];
  setLoTrinh((prev) => {
    const arr = [...prev];
    arr[idx] = { ...arr[idx], maTinh, maBenXe: "", dsBenXe };
    return arr;
  });
}

function handleChangeBenXeTrungGian(e, idx, setLoTrinh) {
  const maBenXe = e.target.value;
  setLoTrinh((prev) => {
    const arr = [...prev];
    arr[idx] = { ...arr[idx], maBenXe };
    return arr;
  });
}

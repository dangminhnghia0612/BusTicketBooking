import LayoutTaiKhoan from "../../../components/user/LayoutTaiKhoan";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { layKhachHang, suaThongTin } from "../../../api/khachhang";
import AlertDialog from "../../../components/common/AlertDialog";
import Cookies from "js-cookie";

export default function ThongTin() {
  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [khachHang, setKhachHang] = useState({
    hoten: "",
    sdt: "",
    gioitinh: "",
    email: "",
    ngaysinh: "",
    diachi: "",
    nghenghiep: "",
    anh: "",
  });

  useEffect(() => {
    const maKH = Cookies.get("maUser");
    if (maKH) {
      layKhachHang(maKH).then((data) => {
        if (data) {
          let ngaySinh = "";
          if (data.ngaysinh) {
            const d = new Date(data.ngaysinh);
            ngaySinh = d.toISOString().slice(0, 10);
          }
          setKhachHang({
            hoten: data.hoten || "",
            sdt: data.sodienthoai || "",
            gioitinh: data.gioitinh ? "true" : "false",
            email: data.email || "",
            ngaysinh: ngaySinh || "",
            diachi: data.diachi || "",
            nghenghiep: data.nghenghiep || "",
          });
          setPreviewImg(data.anh || "");
        }
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setKhachHang((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const maKH = Cookies.get("maUser");
    if (!maKH) {
      setMessageDialog("Không tìm thấy thông tin tài khoản!");
      setOpenDialog(true);
      return;
    }
    if (!khachHang.hoten || !khachHang.sdt || !khachHang.email) {
      setMessageDialog("Vui lòng điền đầy đủ thông tin vào những trường (*)");
      setOpenDialog(true);
      return;
    }
    const formData = new FormData();
    formData.append("hoten", khachHang.hoten);
    formData.append("sodienthoai", khachHang.sdt);
    formData.append("gioitinh", khachHang.gioitinh === "true");
    formData.append("ngaysinh", khachHang.ngaysinh);
    formData.append("diachi", khachHang.diachi);
    formData.append("nghenghiep", khachHang.nghenghiep);
    if (selectedFile) {
      formData.append("anh", selectedFile);
    }
    const response = await suaThongTin(maKH, formData);
    if (response.message === "Cập nhật thành công.") {
      const newInfo = await layKhachHang(maKH);
      Cookies.set("tenUser", newInfo.hoten);
      Cookies.set("sdtUser", newInfo.sodienthoai);
      Cookies.set("avatarUser", newInfo.anh);
      setMessageDialog("Cập nhật thông tin thành công!");
      setOpenDialog(true);
    } else {
      setMessageDialog(response.message || "Cập nhật thất bại!");
      setOpenDialog(true);
    }
  };
  return (
    <>
      <AlertDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Thông báo"
        message={messageDialog}
      />
      <LayoutTaiKhoan
        title="Thông tin tài khoản"
        description="Quản lý thông tin hồ sơ để bảo mật tài khoản"
      >
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side - Profile photo */}
                <div className="flex flex-col items-center lg:w-1/3">
                  <div className="relative mb-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={previewImg || "/default-avatar.png"}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <label className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors mb-4 cursor-pointer">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>

                  <p className="text-sm text-gray-500 text-center">
                    Dung lượng file tối đa 1 MB Định dạng: JPEG, PNG
                  </p>
                </div>

                {/* Right side - Form */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Full Name */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Họ và tên (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={khachHang.hoten}
                          onChange={(e) =>
                            handleInputChange("hoten", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* sdt */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Số điện thoại (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={khachHang.sdt}
                          onChange={(e) =>
                            handleInputChange("sdt", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* gioitinh */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Giới tính
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <select
                          value={khachHang.gioitinh}
                          onChange={(e) =>
                            handleInputChange("gioitinh", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Email (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="email"
                          disabled
                          value={khachHang.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Ngày sinh */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Ngày sinh
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="date"
                          value={khachHang.ngaysinh}
                          onChange={(e) =>
                            handleInputChange("ngaysinh", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-500"
                        />
                      </div>
                    </div>

                    {/* diachi */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Địa chỉ
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={khachHang.diachi}
                          onChange={(e) =>
                            handleInputChange("diachi", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* nghenghiep */}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Nghề nghiệp
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={khachHang.nghenghiep}
                          onChange={(e) =>
                            handleInputChange("nghenghiep", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleUpdate}
                      className="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium flex items-center gap-2"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutTaiKhoan>
    </>
  );
}

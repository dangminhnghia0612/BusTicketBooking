import LayoutTaiKhoan from "../../../components/user/LayoutTaiKhoan";
import { useState } from "react";
import { doiMatKhau } from "../../../api/khachhang";
import AlertDialog from "../../../components/common/AlertDialog";
import Cookies from "js-cookie";

export default function DoiMatKhau() {
  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState("");
  const [khachHang, setKhachHang] = useState({
    matKhauCu: "",
    matKhauMoi: "",
    xacNhanMatKhauMoi: "",
  });

  const handleInputChange = (field, value) => {
    setKhachHang((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    const maKH = Cookies.get("maUser");
    if (!maKH) {
      setMessageDialog("Không tìm thấy thông tin tài khoản!");
      setOpenDialog(true);
      return;
    }
    if (
      !khachHang.matKhauCu ||
      !khachHang.matKhauMoi ||
      !khachHang.xacNhanMatKhauMoi
    ) {
      setMessageDialog("Vui lòng điền đầy đủ thông tin vào những trường (*)");
      setOpenDialog(true);
      return;
    }
    if (khachHang.matKhauMoi !== khachHang.xacNhanMatKhauMoi) {
      setMessageDialog("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      setOpenDialog(true);
      return;
    }
    const response = await doiMatKhau(
      maKH,
      khachHang.matKhauCu,
      khachHang.matKhauMoi
    );
    if (response.message === "Cập nhật thành công") {
      setMessageDialog("Thay đổi mật khẩu thành công!");
      setOpenDialog(true);
    } else {
      setMessageDialog(response.message || "Thay đổi thất bại!");
      console.error(response.message);
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
        title="Đặt lại mật khẩu"
        description="Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
      >
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8 justify-center">
                <div className="w-2/3">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Mật khẩu cũ*/}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Mật khẩu cũ (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="password"
                          value={khachHang.matKhauCu}
                          onChange={(e) =>
                            handleInputChange("matKhauCu", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    {/* Mật khẩu mới*/}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Mật khẩu mới (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="password"
                          value={khachHang.matKhauMoi}
                          onChange={(e) =>
                            handleInputChange("matKhauMoi", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    {/* Xác nhận mật khẩu mới*/}
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 font-medium">
                        Xác nhận mật khẩu mới (*)
                      </label>
                      <span className="mx-4">:</span>
                      <div className="flex-1 relative">
                        <input
                          type="password"
                          value={khachHang.xacNhanMatKhauMoi}
                          onChange={(e) =>
                            handleInputChange(
                              "xacNhanMatKhauMoi",
                              e.target.value
                            )
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

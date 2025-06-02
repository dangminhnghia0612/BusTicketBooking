import { useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { LockIcon, UserIcon, MailIcon, PhoneIcon } from "lucide-react";
import AlertDialog from "../../components/common/AlertDialog";
import FullScreenSpinner from "../../components/common/FullScreenSpinner";
import { userLogin, userRegistration } from "../../api/auth";
import { ktEmail, ktSDTHopLe, ChuanHoaSDT } from "../../lib/utils";

export default function DangNhap() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setAlertMsg("");
    setAlertOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMsg("");
    setAlertOpen(false);

    try {
      if (isLogin) {
        if (!form.email || !form.password) {
          setAlertMsg("Vui lòng nhập đầy đủ thông tin!");
          setAlertOpen(true);
          return;
        }
        const res = await userLogin(form.email, form.password);
        if (res.message === "Đăng nhập thành công") {
          Cookies.set("jwtTokenUser", res.token);
          Cookies.set("tenUser", res.tenKH);
          Cookies.set("sdtUser", res.sdt);
          Cookies.set("emailUser", res.email);
          Cookies.set("avatarUser", res.avatarURL);
          Cookies.set("isUserLoggedIn", "true");
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo, { replace: true });
        } else {
          setAlertMsg(res.message);
          setAlertOpen(true);
        }
      } else {
        if (!form.email || !form.password || !form.fullName || !form.phone) {
          setAlertMsg("Vui lòng nhập đầy đủ thông tin!");
          setAlertOpen(true);
          return;
        }
        if (!ktEmail(form.email)) {
          setAlertMsg("Email không hợp lệ!");
          setAlertOpen(true);
          return;
        }
        if (!ktSDTHopLe(form.phone)) {
          setAlertMsg("Số điện thoại không hợp lệ!");
          setAlertOpen(true);
          return;
        }
        const phone = ChuanHoaSDT(form.phone);
        const res = await userRegistration(
          form.fullName,
          form.email,
          phone,
          form.password
        );
        if (res.success) {
          setAlertMsg(
            "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
          );
          setAlertOpen(true);
        } else {
          setAlertMsg(res.message || "Đăng ký thất bại");
          setAlertOpen(true);
        }
      }
    } catch (err) {
      setAlertMsg("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Lỗi đăng nhập/đăng ký:", err);
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-400 to-orange-600">
      {loading && <FullScreenSpinner />}
      <AlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMsg}
        title={"Thông báo"}
      />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Đăng nhập để tiếp tục" : "Tạo tài khoản mới"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ tên
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập họ tên của bạn"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {isLogin ? "Email hoặc số điện thoại" : "Email"}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder={
                    isLogin
                      ? "Nhập email hoặc số điện thoại"
                      : "Nhập email của bạn"
                  }
                />
              </div>
            </div>
          </div>

          {!isLogin && (
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Nhập mật khẩu của bạn"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            {isLogin
              ? "Chưa có tài khoản? Đăng ký ngay"
              : "Đã có tài khoản? Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}

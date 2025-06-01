import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/auth.js";
import FullScreenSpinner from "../../components/common/FullScreenSpinner.jsx";
export default function DangNhap() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      if (data.message === "Đăng nhập thành công.") {
        setError("");
        Cookies.set("ma", data.ma);
        Cookies.set("hoten", data.hoten);
        Cookies.set("sdt", data.sdt);
        Cookies.set("anh", data.avatarURL);
        Cookies.set("jwtTokenAdmin", data.token);
        Cookies.set("isLoggedIn", "true");
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình đăng nhập: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-400">
      {loading && <FullScreenSpinner />}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Tên đăng nhập:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Mật khẩu:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded transition duration-200"
            disabled={loading}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

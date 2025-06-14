import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import DangNhap from "./pages/admin/DangNhap";
import BangDieuKhien from "./pages/admin/BangDieuKhien";
import KhachHang from "./pages/admin/KhachHang";
import Xe from "./pages/admin/quanlyxe/Xe";
import LoaiXe from "./pages/admin/quanlyxe/LoaiXe";
import TuyenXe from "./pages/admin/vantai/TuyenXe";
import ChuyenXe from "./pages/admin/vantai/ChuyenXe";
import BenXe from "./pages/admin/vantai/BenXe";
import DatVe from "./pages/admin/DatVe";
import KhuyenMai from "./pages/admin/KhuyenMai";
import TinTuc from "./pages/admin/noidung/TinTuc";
import BieuNgu from "./pages/admin/noidung/BieuNgu";
import NhaXe from "./pages/admin/noidung/NhaXe";

import TrangChu from "./pages/user/TrangChu";
import DangNhapUser from "./pages/user/DangNhap";
import TimChuyenXePage from "./pages/user/TimChuyenXePage";
import DatVePage from "./pages/user/DatVePage";
import VnpayReturn from "./pages/user/VnpayReturn";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import ThongTin from "./pages/user/taikhoan/ThongTin";
import LichSuMuaVe from "./pages/user/taikhoan/LichSuMuaVe";
import DoiMatKhau from "./pages/user/taikhoan/DoiMatKhau";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dangnhap" element={<DangNhapUser />} />
        <Route path="/tim-chuyen-xe" element={<TimChuyenXePage />} />
        <Route path="/dat-ve" element={<DatVePage />} />
        <Route path="/vnpay-return" element={<VnpayReturn />} />
        <Route
          element={
            <UserProtectedRoute>
              <Outlet />
            </UserProtectedRoute>
          }
        >
          <Route path="/thong-tin" element={<ThongTin />} />
          <Route path="/lich-su-mua-ve" element={<LichSuMuaVe />} />
          <Route path="/dat-lai-mat-khau" element={<DoiMatKhau />} />
        </Route>

        <Route path="/admin/dangnhap" element={<DangNhap />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<BangDieuKhien />} />
          <Route path="/admin/khachhang" element={<KhachHang />} />
          <Route path="/admin/quanlyxe/xe" element={<Xe />} />
          <Route path="/admin/quanlyxe/loaixe" element={<LoaiXe />} />
          <Route path="/admin/vantai/tuyenxe" element={<TuyenXe />} />
          <Route path="/admin/vantai/benxe" element={<BenXe />} />
          <Route path="/admin/vantai/chuyenxe" element={<ChuyenXe />} />
          <Route path="/admin/datve" element={<DatVe />} />
          <Route path="/admin/khuyenmai" element={<KhuyenMai />} />
          <Route path="/admin/noidung/tintuc" element={<TinTuc />} />
          <Route path="/admin/noidung/bieungu" element={<BieuNgu />} />
          <Route path="/admin/noidung/nhaxe" element={<NhaXe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

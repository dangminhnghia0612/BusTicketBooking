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
import TuyenXe from "./pages/admin/TuyenXe";
import ChuyenXe from "./pages/admin/ChuyenXe";
import DatVe from "./pages/admin/DatVe";
import KhuyenMai from "./pages/admin/KhuyenMai";
import TinTuc from "./pages/admin/noidung/TinTuc";
import BieuNgu from "./pages/admin/noidung/BieuNgu";
import NhaXe from "./pages/admin/noidung/NhaXe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} /> {/* Trang chủ */}
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
          <Route path="/admin/tuyenxe" element={<TuyenXe />} />
          <Route path="/admin/chuyenxe" element={<ChuyenXe />} />
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

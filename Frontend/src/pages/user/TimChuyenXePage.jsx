import Header from "../../components/user/Header";
import Menu from "../../components/user/Menu";
import TimChuyenXe from "../../components/user/TimChuyenXe";
import Footer from "../../components/user/Footer";
import Banner from "../../components/user/Banner";
import TemplateChuyenXe from "../../components/user/TemplateChuyenXe";
import { useLocation } from "react-router-dom";

export default function TimChuyenXePage() {
  const location = useLocation();
  const { diemDi, diemDen, ngayDi, soLuongVe, ketQua } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Menu />
      <Banner />
      <TimChuyenXe />
      <TemplateChuyenXe
        diemDi={diemDi}
        diemDen={diemDen}
        ngayDi={ngayDi}
        soLuongVe={soLuongVe}
        ketQua={ketQua}
      />
      <Footer />
    </div>
  );
}

import Header from "../../components/user/Header";
import Menu from "../../components/user/Menu";
import TimChuyenXe from "../../components/user/TimChuyenXe";
import Footer from "../../components/user/Footer";
import Banner from "../../components/user/Banner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Menu />
      <Banner />
      <TimChuyenXe />
      <Footer />
    </div>
  );
}

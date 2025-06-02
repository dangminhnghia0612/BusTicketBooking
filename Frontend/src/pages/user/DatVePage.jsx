import Header from "../../components/user/Header";
import Menu from "../../components/user/Menu";
import Footer from "../../components/user/Footer";
import Banner from "../../components/user/Banner";
import ChonGhe from "../../components/user/ChonGhe";

export default function DatVePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Menu />
      <Banner />
      <ChonGhe />
      <Footer />
    </div>
  );
}

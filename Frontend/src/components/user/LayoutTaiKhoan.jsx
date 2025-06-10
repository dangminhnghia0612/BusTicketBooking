import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

export default function LayoutTaiKhoan({ title, description, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Menu />
      <main>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {title}
              </h1>
              <p className="text-gray-600">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

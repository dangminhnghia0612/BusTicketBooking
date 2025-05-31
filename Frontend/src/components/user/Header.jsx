import { useState } from "react";
import { User, Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    "TRANG CHỦ",
    "LỊCH TRÌNH",
    "TRA CỨU VÉ",
    "TIN TỨC",
    "HÓA ĐƠN",
    "LIÊN HỆ",
    "VỀ CHÚNG TÔI",
  ];

  return (
    <header className="bg-gradient-to-b from-orange-500 to-orange-600 px-4 py-3 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4 relative">
        {/* Sidebar menu icon - chỉ hiện trên tablet/mobile */}
        <div className="flex-1 flex lg:hidden justify-start">
          <button
            className="text-white"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
          >
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Center logo */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">MN</span>
            </div>
            <div className="ml-2">
              <div className="text-red-500 font-bold text-base md:text-lg">
                Nhà xe Minh Nghĩa
              </div>
              <div className="text-gray-600 text-xs">CHẤT LƯỢNG LÀ DANH DỰ</div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1 flex justify-end">
          <button className="w-auto px-4 py-2 bg-white rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            <span className="xs:inline max-md:hidden">Đăng nhập/Đăng ký</span>
          </button>
        </div>
      </div>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 z-[101] bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar menu */}
      <aside
        className={`fixed top-0 left-0 z-[102] h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-bold text-orange-500 text-lg">MENU</span>
          <button
            className="text-orange-500"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <ul className="mt-4 space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="block py-2 px-2 rounded text-orange-700 font-medium hover:bg-orange-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  );
}

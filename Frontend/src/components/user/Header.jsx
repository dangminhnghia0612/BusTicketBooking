import { useState, useRef, useEffect } from "react";
import { User, Menu as MenuIcon, X, LogOut, ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const userName = Cookies.get("tenUser");
  const avatar = Cookies.get("avatarUser");
  const isLoggedIn = Cookies.get("isUserLoggedIn") === "true";
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const menuItems = [
    "TRANG CHỦ",
    "LỊCH TRÌNH",
    "TRA CỨU VÉ",
    "TIN TỨC",
    "HÓA ĐƠN",
    "LIÊN HỆ",
    "VỀ CHÚNG TÔI",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleLogin = () => {
    navigate("/dangnhap", {
      state: { from: location.pathname + location.search },
    });
  };

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
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="w-auto px-4 py-2 bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="xs:inline max-md:hidden">Đăng nhập/Đăng ký</span>
            </button>
          ) : (
            <div
              className="ml-auto flex items-center relative"
              ref={dropdownRef}
            >
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onMouseEnter={() => setOpenDropdown(true)}
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <span className="hidden md:block font-medium text-white">
                  {userName}
                </span>
                <ChevronDown
                  className="hidden md:block w-4 h-4 text-white"
                  strokeWidth={5}
                />
              </div>
              {/* Dropdown menu */}
              {openDropdown && (
                <div
                  className="absolute right-0 top-12 w-40 bg-white rounded shadow-lg border z-50 animate-fade-in"
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  <a
                    href="/thong-tin-tai-khoan"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-2" /> Hồ sơ
                  </a>
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleDangXuat}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
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

function handleDangXuat() {
  Cookies.remove("isUserLoggedIn");
  Cookies.remove("maUser");
  Cookies.remove("tenUser");
  Cookies.remove("sdtUser");
  Cookies.remove("emailUser");
  Cookies.remove("avatarUser");
  Cookies.remove("jwtTokenUser");
  window.location.href = "/";
}

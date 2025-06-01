import { Menu, LogOut, User } from "lucide-react";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";

export default function Header({ onOpenMobileMenu }) {
  const adminName = Cookies.get("hoten");
  const avatar = Cookies.get("anh");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
      <button
        onClick={onOpenMobileMenu}
        className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="ml-auto flex items-center relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen((prev) => !prev)}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <span className="hidden sm:block font-medium text-gray-700">
            {adminName}
          </span>
        </div>
        {/* Dropdown menu */}
        {open && (
          <div
            className="absolute right-0 top-12 w-40 bg-white rounded shadow-lg border z-50 animate-fade-in"
            // onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <a
              href="/admin/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" /> Hồ sơ
            </a>
            <button
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={dangXuat}
            >
              <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function dangXuat() {
  Cookies.remove("isLoggedIn");
  Cookies.remove("hoten");
  Cookies.remove("ma");
  Cookies.remove("sdt");
  Cookies.remove("anh");
  Cookies.remove("jwtTokenAdmin");
  window.location.href = "/admin/dangnhap";
}

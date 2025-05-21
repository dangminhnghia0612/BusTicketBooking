// src/components/admin-layout.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  BarChart3,
  Users,
  Bus,
  Map,
  Calendar,
  Ticket,
  Tag,
  FileText,
  ChevronDown,
  LogOut,
  Menu,
  ArrowRight,
  Newspaper,
  ImageIcon,
  Building2,
} from "lucide-react";

const menuItems = [
  {
    title: "Thống kê",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Quản lý người dùng",
    href: "/admin/khachhang",
    icon: Users,
  },
  {
    title: "Quản lý xe và loại xe",
    href: "/admin/xe",
    icon: Bus,
  },
  {
    title: "Quản lý tuyến xe",
    href: "/admin/tuyenxe",
    icon: Map,
  },
  {
    title: "Quản lý chuyến xe",
    href: "/admin/chuyenxe",
    icon: Calendar,
  },
  {
    title: "Quản lý đặt vé",
    href: "/admin/datve",
    icon: Ticket,
  },
  {
    title: "Quản lý khuyến mãi",
    href: "/admin/khuyenmai",
    icon: Tag,
  },
  {
    title: "Quản lý nội dung",
    href: "/admin/noidung",
    icon: FileText,
    submenu: [
      {
        title: "Quản lý tin tức",
        href: "/admin/noidung/tintuc",
        icon: Newspaper,
      },
      {
        title: "Quản lý biểu ngữ",
        href: "/admin/noidung/bieungu",
        icon: ImageIcon,
      },
      {
        title: "Thông tin nhà xe",
        href: "/admin/noidung/nhaxe",
        icon: Building2,
      },
    ],
  },
];

export function AdminLayout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? "" : title);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bus className="h-6 w-6 text-gray-700" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              Bus Ticket Admin
            </span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Menu Quản Trị
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const isSubmenuActive = item.submenu?.some(
                (subitem) => pathname === subitem.href
              );
              const isOpen = openSubmenu === item.title;

              return (
                <li key={item.href}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md",
                          isSubmenuActive || isOpen
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isOpen ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      {isOpen && (
                        <ul className="mt-1 pl-8 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.href}>
                              <Link
                                to={subitem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm rounded-md",
                                  pathname === subitem.href
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                <subitem.icon className="h-4 w-4 mr-3" />
                                <span>{subitem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bus className="h-6 w-6 text-gray-700" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Quản Trị Hệ Thống
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Menu Quản Trị
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const isSubmenuActive = item.submenu?.some(
                (subitem) => pathname === subitem.href
              );
              const isOpen = openSubmenu === item.title;

              return (
                <li key={item.href}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md",
                          isSubmenuActive || isOpen
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isOpen ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      {isOpen && (
                        <ul className="mt-1 pl-8 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.href}>
                              <Link
                                to={subitem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm rounded-md",
                                  pathname === subitem.href
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                <subitem.icon className="h-4 w-4 mr-3" />
                                <span>{subitem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

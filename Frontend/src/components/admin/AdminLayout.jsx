import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Bus,
  Map,
  Calendar,
  Ticket,
  Tag,
  FileText,
  Newspaper,
  ImageIcon,
  Building2,
  BusFront,
  MapPin,
  Route,
  Navigation,
  Truck,
  MoveRight,
} from "lucide-react";
import Header from "./Header";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import MainContent from "./MainContent";
const menuItems = [
  {
    title: "Thống kê",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Người dùng",
    href: "/admin/khachhang",
    icon: Users,
  },
  {
    title: "Xe và loại xe",
    href: "/admin/xe",
    icon: Bus,
    submenu: [
      {
        title: "Xe",
        href: "/admin/quanlyxe/xe",
        icon: Bus,
      },
      {
        title: "Loại xe",
        href: "/admin/quanlyxe/loaixe",
        icon: BusFront,
      },
    ],
  },
  {
    title: "Quản lý vận tải",
    href: "/admin/vantai",
    icon: Route,
    submenu: [
      {
        title: "Chuyến xe",
        href: "/admin/vantai/chuyenxe",
        icon: Calendar,
      },
      {
        title: "Tuyến xe",
        href: "/admin/vantai/tuyenxe",
        icon: Map,
      },
      {
        title: "Bến xe",
        href: "/admin/vantai/benxe",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Đặt vé",
    href: "/admin/datve",
    icon: Ticket,
  },
  {
    title: "Khuyến mãi",
    href: "/admin/khuyenmai",
    icon: Tag,
  },
  {
    title: "Nội dung",
    href: "/admin/noidung",
    icon: FileText,
    submenu: [
      {
        title: "Tin tức",
        href: "/admin/noidung/tintuc",
        icon: Newspaper,
      },
      {
        title: "Biểu ngữ",
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
      <DesktopSidebar
        menuItems={menuItems}
        pathname={pathname}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
      />
      <MobileSidebar
        menuItems={menuItems}
        pathname={pathname}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <MainContent children={children} />
      </div>
    </div>
  );
}

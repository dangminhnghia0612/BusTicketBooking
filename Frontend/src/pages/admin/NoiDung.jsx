import { AdminLayout } from "../../components/admin/AdminLayout";
import { Newspaper, ImageIcon, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Content() {
  const contentSections = [
    {
      title: "Quản lý tin tức",
      description: "Quản lý các bài viết tin tức, thông báo và hướng dẫn",
      icon: Newspaper,
      href: "/admin/noidung/tintuc",
      count: 24,
    },
    {
      title: "Quản lý biểu ngữ",
      description: "Quản lý banner quảng cáo trên trang web và ứng dụng",
      icon: ImageIcon,
      href: "/admin/noidung/bieungu",
      count: 8,
    },
    {
      title: "Thông tin nhà xe",
      description: "Quản lý thông tin công ty, liên hệ và giới thiệu",
      icon: Building2,
      href: "/admin/noidung/nhaxe",
      count: 1,
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản Lý Nội Dung</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý tất cả nội dung hiển thị trên trang web và ứng dụng
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section, index) => (
          <Link
            key={index}
            to={section.href}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <section.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-sm font-medium">
                {section.count}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-gray-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}

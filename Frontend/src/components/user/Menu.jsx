export default function Menu() {
  const menuItems = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "LỊCH TRÌNH", href: "/lich-trinh" },
    { label: "TRA CỨU VÉ", href: "/tra-cuu-ve" },
    { label: "TIN TỨC", href: "/tin-tuc" },
    { label: "HÓA ĐƠN", href: "/hoa-don" },
    { label: "LIÊN HỆ", href: "/lien-he" },
    { label: "VỀ CHÚNG TÔI", href: "/ve-chung-toi" },
  ];

  return (
    <nav className="bg-gradient-to-b from-orange-600 to-orange-700 px-4 py-3 max-lg:hidden">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-center space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`text-white font-medium hover:text-orange-200 transition-colors ${
                  index === 0 ? "border-b-2 border-white pb-1" : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Menu() {
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
    <nav className="bg-gradient-to-b from-orange-600 to-orange-700 px-4 py-3 max-lg:hidden">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-center space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`text-white font-medium hover:text-orange-200 transition-colors ${
                  index === 0 ? "border-b-2 border-white pb-1" : ""
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

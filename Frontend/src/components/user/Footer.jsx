import { Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 sm:gap-10 ">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MN</span>
              </div>
              <div>
                <div className="text-red-500 font-bold">Nhà xe Minh Nghĩa</div>
                <div className="text-gray-700 text-xs">
                  CHẤT LƯỢNG LÀ DANH DỰ
                </div>
              </div>
            </div>
            <p className="text-sm text-justify">
              Công ty vận tải hành khách hàng. Chúng tôi cam kết mang đến dịch
              vụ tốt nhất cho hành khách với đội ngũ lái xe chuyên nghiệp và xe
              cộ hiện đại.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400" />
              <Youtube className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400" />
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold  text-green-700">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Lịch trình
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Tra cứu vé
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Khuyến mãi
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Hướng dẫn mua vé
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Chính sách hoàn vé
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-orange-500">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">Liên hệ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700">1900 0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700">
                  DH52111357@student.stu.edu.vn
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-gray-700">
                  180 Cao Lỗ, Phường 4, Quận 8, TP.HCM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; ĐẶNG MINH NGHĨA - DH52111357 - Trường Đại học Công Nghệ Sài
            Gòn.
          </p>
        </div>
      </div>
    </footer>
  );
}

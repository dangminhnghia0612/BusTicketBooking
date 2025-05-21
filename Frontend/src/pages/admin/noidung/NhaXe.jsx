import { AdminLayout } from "../../../components/admin/AdminLayout";
import { Save } from "lucide-react";

export default function NhaXe() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thông Tin Nhà Xe</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Thông tin cơ bản
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Quản lý thông tin cơ bản của công ty
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên công ty
              </label>
              <input
                type="text"
                id="company-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="Công ty TNHH Vận tải XYZ"
              />
            </div>
            <div>
              <label
                htmlFor="company-slogan"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Slogan
              </label>
              <input
                type="text"
                id="company-slogan"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="Đồng hành cùng mọi chuyến đi"
              />
            </div>
            <div>
              <label
                htmlFor="company-phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="company-phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="1900 1234"
              />
            </div>
            <div>
              <label
                htmlFor="company-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="company-email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="info@xyzbus.com"
              />
            </div>
            <div>
              <label
                htmlFor="company-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="company-address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="123 Đường ABC, Quận XYZ, TP. Hà Nội"
              />
            </div>
            <div>
              <label
                htmlFor="company-tax"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mã số thuế
              </label>
              <input
                type="text"
                id="company-tax"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="0123456789"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="company-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Giới thiệu công ty
            </label>
            <textarea
              id="company-description"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="Công ty TNHH Vận tải XYZ được thành lập vào năm 2010, là một trong những đơn vị vận tải hành khách uy tín hàng đầu tại Việt Nam. Với đội xe hiện đại, đội ngũ lái xe chuyên nghiệp, chúng tôi cam kết mang đến cho khách hàng những chuyến đi an toàn, thoải mái và đúng giờ."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo công ty
            </label>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                Thay đổi
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Mạng xã hội
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Liên kết đến các trang mạng xã hội
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="social-facebook"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facebook
              </label>
              <input
                type="text"
                id="social-facebook"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://facebook.com/xyzbus"
              />
            </div>
            <div>
              <label
                htmlFor="social-youtube"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                YouTube
              </label>
              <input
                type="text"
                id="social-youtube"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://youtube.com/xyzbus"
              />
            </div>
            <div>
              <label
                htmlFor="social-instagram"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instagram
              </label>
              <input
                type="text"
                id="social-instagram"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://instagram.com/xyzbus"
              />
            </div>
            <div>
              <label
                htmlFor="social-tiktok"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                TikTok
              </label>
              <input
                type="text"
                id="social-tiktok"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="https://tiktok.com/@xyzbus"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

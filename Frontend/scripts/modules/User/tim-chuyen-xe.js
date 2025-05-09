import { TimChuyenXe_API } from "../../api/chuyen-xe-API.js";
document.addEventListener("DOMContentLoaded", async function () {
  // Lấy tham số từ URL
  const params = new URLSearchParams(window.location.search);
  const departure = params.get("departure");
  const destination = params.get("destination");
  const date = params.get("date");
  const ticketCount = params.get("tickets");
  await TimChuyenXe_KetQua(
    decodeURIComponent(departure),
    decodeURIComponent(destination),
    date,
    ticketCount
  );
});
async function TimChuyenXe_KetQua(departure, destination, date, ticketCount) {
  try {
    const dsChuyenXe = await TimChuyenXe_API(
      departure,
      destination,
      date,
      ticketCount
    );

    if (dsChuyenXe.length === 0) {
      document.getElementById("search-header").textContent =
        "Không tìm thấy chuyến xe nào phù hợp với yêu cầu của bạn.";
      return;
    }
    document.getElementById("search-header").textContent =
      departure +
      " - " +
      destination +
      " (" +
      dsChuyenXe.length +
      " chuyến xe)";
    const searchResults = document.getElementById("search-results");
    const template = document.getElementById("chuyen-xe-template");

    // Xóa nội dung cũ
    searchResults.innerHTML = "";

    // Duyệt qua danh sách chuyến xe và tạo các phần tử từ template
    dsChuyenXe.forEach((chuyenXe) => {
      const clone = template.content.cloneNode(true);

      // Gán dữ liệu vào các phần tử trong template
      clone.querySelector(".giodi").textContent = new Date(
        chuyenXe.giodi
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      clone.querySelector(".diemdi").textContent = chuyenXe.diemdi;
      clone.querySelector(
        ".khoangthoigian"
      ).textContent = `${chuyenXe.khoangthoigian} giờ`;
      clone.querySelector(".gioden").textContent = new Date(
        chuyenXe.gioden
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      clone.querySelector(".diemden").textContent = chuyenXe.diemden;
      clone.querySelector(".tenloai").textContent = chuyenXe.tenloai;
      clone.querySelector(
        ".soGheConTrong"
      ).textContent = `${chuyenXe.soGheConTrong} chỗ trống`;
      clone.querySelector(
        ".giave"
      ).textContent = `${chuyenXe.giave.toLocaleString()}đ`;

      // Thêm sự kiện cho nút "Chọn chuyến"
      const btnBook = clone.querySelector(".btn-book");
      btnBook.addEventListener("click", () => {
        // Chuyển hướng đến dat-ve.html với dữ liệu chuyến xe
        const params = new URLSearchParams({
          maChuyenXe: chuyenXe.ma_Chuyenxe,
          giodi: chuyenXe.giodi,
          bendi: chuyenXe.diemdi,
          gioden: chuyenXe.gioden,
          benden: chuyenXe.diemden,
          giave: chuyenXe.giave,
          diemdi: departure,
          diemden: destination,
          date: date,
        });
        window.top.location.href = `dat-ve.html?${params.toString()}`;
      });

      // Thêm phần tử vào kết quả tìm kiếm
      searchResults.appendChild(clone);
    });
  } catch (error) {
    console.error("Lỗi khi tìm chuyến xe:", error.message);
    document.getElementById("search-results").innerHTML = `
      <p class="text-danger">Đã xảy ra lỗi khi tìm chuyến xe. Vui lòng thử lại sau.</p>
    `;
  }
}

import { timKhachHangBangMa, suaKhachHang } from "../../api/khach-hang-API.js";
import { ChuanHoaSDT, ktSDTHopLe } from "../../utils/phoneUtil.js";
import { ktEmail } from "../../utils/emailUtil.js";

document.addEventListener("DOMContentLoaded", function () {
  // Load sidebar
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    fetch("../../../components/sidebarUser.html")
      .then((response) => response.text())
      .then((html) => {
        sidebarContainer.innerHTML = html;
        setActiveNavItem();
        DangXuat("btnDangXuat");
      })
      .catch((error) => console.error("Error loading sidebar:", error));
  }

  // Load header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("../../../components/header.html")
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        ktDangNhap();
        DangXuat("logout");
      })
      .catch((error) => console.error("Lỗi tải header:", error));
  }

  // Load footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    fetch("../../../components/footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerContainer.innerHTML = html;
      })
      .catch((error) => console.error("Lỗi tải footer:", error));
  }
  loadThongTinKH();
  document.getElementById("btnCapNhat").addEventListener("click", function (e) {
    e.preventDefault();
    capnhatThongTinKH();
  });
});
function setActiveNavItem() {
  // Lấy đường dẫn hiện tại
  const currentPage =
    window.location.pathname.split("/").pop() || "thong-tin-chung.html";

  // Lấy tất cả các liên kết điều hướng
  const navLinks = document.querySelectorAll(".sidebar .nav-link");

  // Xóa class "active" khỏi tất cả các liên kết
  navLinks.forEach((link) => link.parentElement.classList.remove("active"));

  // Tìm và đặt class "active" cho liên kết phù hợp
  navLinks.forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPage) {
      link.parentElement.classList.add("active");
    }
  });
}

function ktDangNhap() {
  const before = document.getElementsByClassName("before-login")[0];
  const after = document.getElementsByClassName("after-login")[0];
  const userName = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");

  const customerName = localStorage.getItem("hotenKH");
  const customerAvatar = localStorage.getItem("avatarURL");

  if (customerName) {
    before.style.display = "none";
    after.style.display = "block";
    userName.textContent = customerName;
    if (customerAvatar) {
      userAvatar.src = customerAvatar;
    } else {
      userAvatar.style.display = "none";
    }
  }
}
function DangXuat(id) {
  const logoutButton = document.getElementById(id);
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("hotenKH");
    localStorage.removeItem("email");
    localStorage.removeItem("sdt");
    localStorage.removeItem("token");
    localStorage.removeItem("maKH");
    localStorage.removeItem("avatarURL");
    window.location.href = "/index.html";
  });
}
async function loadThongTinKH() {
  var maKH = localStorage.getItem("maKH");
  if (maKH) {
    var response = await timKhachHangBangMa(maKH);
    if (response) {
      document.getElementById("hoten").value = response.hoten || "";
      document.getElementById("sdt").value = response.sodienthoai || "";
      document.getElementById("email").value = response.email || "";
      document.getElementById("ngaysinh").value = response.ngaysinh
        ? response.ngaysinh.split("T")[0]
        : "";
      document.getElementById("diachi").value = response.diachi || "";
      document.getElementById("nghenghiep").value = response.nghenghiep || "";
      const gioiTinhSelect = document.getElementById("gioitinh");
      if (response.gioitinh === false) {
        gioiTinhSelect.value = "false";
      } else {
        gioiTinhSelect.value = "true";
      }
    } else if ("message" in response) {
      alert(response.message);
    }
  }
}

async function capnhatThongTinKH() {
  var maKH = localStorage.getItem("maKH");
  var hoten = document.getElementById("hoten").value;
  hoten = hoten.trim();
  var sdt = document.getElementById("sdt").value;
  sdt = sdt.trim();
  var email = document.getElementById("email").value;
  email = email.trim();
  var ngaysinh = document.getElementById("ngaysinh").value;
  var diachi = document.getElementById("diachi").value;
  var nghenghiep = document.getElementById("nghenghiep").value;
  var gioitinh = document.getElementById("gioitinh").value;
  var gioitinhValue = gioitinh === "true" ? true : false;

  if (maKH && hoten && sdt && email) {
    if (!ktEmail(email)) {
      alert("Email không hợp lệ!");
      throw new Error("Email không hợp lệ!");
    }
    if (!ktSDTHopLe(sdt)) {
      alert("Số điện thoại không hợp lệ!");
      throw new Error("Số điện thoại không hợp lệ!");
    }
    sdt = ChuanHoaSDT(sdt);
    var response = await suaKhachHang(
      maKH,
      hoten,
      sdt,
      email,
      ngaysinh,
      gioitinhValue,
      diachi,
      nghenghiep
    );
    if (response.message === "Cập nhật thành công") {
      localStorage.setItem("hotenKH", hoten);
      localStorage.setItem("sdt", sdt);
      localStorage.setItem("email", email);
      localStorage.setItem("ngaysinh", ngaysinh);
      localStorage.setItem("diachi", diachi);
      localStorage.setItem("nghenghiep", nghenghiep);
      localStorage.setItem("gioitinh", gioitinhValue);
      window.location.reload();
      alert(response.message);
    } else {
      alert("Cập nhật thất bại vì " + response.message);
    }
  } else
    alert(
      "Vui lòng nhập đầy đủ thông tin bắt buộc (Họ tên, Số điện thoại, Email)!"
    );
}

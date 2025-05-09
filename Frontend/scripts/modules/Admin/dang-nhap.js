import { dangnhap } from "../../api/quan-tri-vien.js";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const submitBtn = document.getElementById("submit-btn");
  const spinner = document.getElementById("loading-spinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tendangnhap = document.getElementById("tendangnhap").value;
    const matkhau = document.getElementById("matkhau").value;

    spinner.style.display = "block";
    submitBtn.disabled = true;
    try {
      const response = await dangnhap(tendangnhap, matkhau);
      if (response.message === "Đăng nhập thành công.") {
        sessionStorage.setItem("hoten", response.hoten);
        sessionStorage.setItem("sdt", response.sdt);
        sessionStorage.setItem("ma_quantrivien", response.ma_Quantrivien);
        sessionStorage.setItem("isLoggedIn", true);
        window.location.href = "./bang-dieu-khien.html";
      } else {
        hienThiThongBao(response.message);
      }
    } catch (error) {
      hienThiThongBao(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      spinner.style.display = "none";
      submitBtn.disabled = false;
    }
  });
});
function hienThiThongBao(message) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;
  messageBox.style.display = "block";
}

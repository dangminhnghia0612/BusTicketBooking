import { dangNhap, dangKy } from "../api/auth-API.js";

const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const fullnameGroup = document.getElementById("fullname-group");
const phoneGroup = document.getElementById("phone-group");
const emailField = document.getElementById("email");
const lblEmail = document.getElementById("lblEmail");
const spinner = document.getElementById("loading-spinner");
const messageBox = document.getElementById("message-box");
let isLogin = true;

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Đăng Nhập";
    submitBtn.textContent = "Đăng Nhập";
    toggleForm.innerHTML = "Chưa có tài khoản? <span>Đăng ký ngay</span>";
    fullnameGroup.style.display = "none";
    phoneGroup.style.display = "none";
    emailField.placeholder = "Email hoặc Số điện thoại";
    lblEmail.textContent = "Email hoặc Số điện thoại";
  } else {
    formTitle.textContent = "Đăng Ký";
    submitBtn.textContent = "Đăng Ký";
    toggleForm.innerHTML = "Đã có tài khoản? <span>Đăng nhập</span>";
    fullnameGroup.style.display = "block";
    phoneGroup.style.display = "block";
    emailField.placeholder = "Email";
    lblEmail.textContent = "Email";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.style.display = "block";
  submitBtn.disabled = true;

  const fullname = document.getElementById("fullname").value;
  const email = emailField.value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {
    let data;
    if (isLogin) {
      data = await dangNhap(email, password);
    } else {
      data = await dangKy(fullname, email, phone, password);
    }

    if (data.message === "Đăng nhập thành công.") {
      localStorage.setItem("hotenKH", data.tenKH);
      localStorage.setItem("token", data.token);
      localStorage.setItem("sdt", data.sdt);
      localStorage.setItem("email", data.email);
      window.location.href = "../index.html";
    } else {
      hienThiThongBao(data.message);
    }
  } catch (error) {
    hienThiThongBao(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau!");
  } finally {
    spinner.style.display = "none";
    submitBtn.disabled = false;
  }
});

function hienThiThongBao(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}

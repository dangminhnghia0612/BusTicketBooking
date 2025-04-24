import { ChuanHoaSDT, ktSDTHopLe } from "../utils/phoneUtil.js";
import { ktEmail } from "../utils/emailUtil.js";

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

  var fullname = document.getElementById("fullname").value;
  var email = emailField.value;
  var phone = document.getElementById("phone").value;
  phone = ChuanHoaSDT(phone);
  var password = document.getElementById("password").value;

  try {
    let response;
    if (isLogin) {
      hienThiSpinner();
      if (getInputType(email) === "phone") {
        email = ChuanHoaSDT(email);
      }
      response = await fetch("https://localhost:7054/api/Auth/Dangnhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Tendangnhap: email,
          Matkhau: password,
        }),
      });
    } else {
      if (
        fullname.trim() === "" ||
        email.trim() === "" ||
        phone.trim() === "" ||
        password.trim() === ""
      ) {
        hienThiThongBao("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      if (!ktEmail(email)) {
        hienThiThongBao("Email không hợp lệ!");
        return;
      }
      if (!ktSDTHopLe(phone)) {
        hienThiThongBao("Số điện thoại không hợp lệ!");
        return;
      }
      hienThiSpinner();
      response = await fetch("https://localhost:7054/api/Auth/Dangky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Hoten: fullname,
          Email: email,
          Sodienthoai: phone,
          Matkhau: password,
        }),
      });
    }
    const data = await response.json();
    if (response.ok) {
      if (data.message === "Đăng nhập thành công.") {
        localStorage.setItem("hotenKH", data.tenKH);
        localStorage.setItem("token", data.token);
        window.location.href = "/Frontend/index.html";
      } else hienThiThongBao(data.message);
    } else {
      hienThiThongBao(data.message);
    }
  } catch (error) {
    hienThiThongBao("Có lỗi xảy ra. Vui lòng thử lại sau!");
  } finally {
    spinner.style.display = "none";
    submitBtn.disabled = false;
  }
});
function hienThiSpinner() {
  spinner.style.display = "block";
  submitBtn.disabled = true;
}
function hienThiThongBao(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";
}
function getInputType(input) {
  if (ktSDTHopLe(input)) {
    return "phone";
  } else if (ktEmail(input)) {
    return "email";
  } else {
    return "invalid";
  }
}

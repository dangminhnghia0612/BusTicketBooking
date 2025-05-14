import { doiMatKhau } from "../../api/khach-hang-API.js";
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnXacNhan")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      var matKhauCu = document.getElementById("matkhaucu").value;
      var matKhauMoi = document.getElementById("matkhaumoi").value;
      var xacNhanMatKhau = document.getElementById("xacnhanmatkhau").value;

      if (matKhauMoi !== xacNhanMatKhau) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
      }
      var maKH = localStorage.getItem("maKH");
      if (maKH) {
        var response = await doiMatKhau(maKH, matKhauCu, matKhauMoi);
        if (response.message === "Cập nhật thành công") {
          alert(response.message);
          window.location.reload();
        } else {
          alert("Đổi mật khẩu thất bại vì " + response.message);
        }
      }
    });
});

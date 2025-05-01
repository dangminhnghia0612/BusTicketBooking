import { getParamsFromURL } from "../utils/urlUtil.js";
import { laySoDoGhe } from "../api/loai-xe-API.js";
import { layDSGheDaDat } from "../api/ghe-API.js";
import { ktEmail } from "../utils/emailUtil.js";
import { ktSDTHopLe, ChuanHoaSDT } from "../utils/phoneUtil.js";
import { timKhachHang } from "../api/khach-hang-API.js";
import { sendDatVeRequest } from "../api/dat-ve-API.js";

async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);
  if (container) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const content = await response.text();
        container.innerHTML = content;
      } else {
        console.error(`Không thể tải file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Lỗi khi tải file: ${filePath}`, error);
    }
  }
}

// Tải header và footer
document.addEventListener("DOMContentLoaded", async function () {
  await loadComponent("header", "../components/header.html");
  await loadComponent("footer", "../components/footer.html");

  ktDangNhap();
  Dangxuat();

  const params = getParamsFromURL();
  var maCX = parseInt(params.maChuyenXe);
  const sodo = await laySoDoGhe(maCX);
  const dsGheDaDat = await layDSGheDaDat(maCX);
  veSoDoGhe(sodo, "seat-map", dsGheDaDat);

  autoFillInformation();

  const payButton = document.getElementById("pay-button");
  payButton.addEventListener("click", function () {
    thanhToan();
  });
});

function veSoDoGhe(sodo, containerId, dsGheDaDat) {
  const seatMapContainer = document.getElementById(containerId);

  if (!seatMapContainer) {
    console.error(`Container với ID "${containerId}" không tồn tại.`);
    return;
  }

  // Xóa nội dung cũ trong container
  seatMapContainer.innerHTML = "";

  // Duyệt qua từng tầng
  sodo.forEach((floor) => {
    const floorContainer = document.createElement("div");
    floorContainer.classList.add("floor");

    // Tiêu đề tầng
    const floorTitle = document.createElement("h6");
    if (floor.tang === 1) {
      floorTitle.innerHTML = `
      Tầng dưới <br/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <circle cx="12" cy="12" r="9" fill="none" stroke="#333" stroke-width="2"/>
                                            <circle cx="12" cy="12" r="3" fill="none" stroke="#333" stroke-width="2"/>
                                            <line x1="12" y1="3" x2="12" y2="9" stroke="#333" stroke-width="2"/>
                                            <line x1="12" y1="15" x2="12" y2="21" stroke="#333" stroke-width="2"/>
                                            <line x1="3" y1="12" x2="9" y2="12" stroke="#333" stroke-width="2"/>
                                            <line x1="15" y1="12" x2="21" y2="12" stroke="#333" stroke-width="2"/>
        </svg>
      `;
    } else if (floor.tang === 2) {
      floorTitle.innerHTML = `
      Tầng trên <br/>
        <div style="width: 24px; height: 24px;">
        </div>
      `;
    } else {
      floorTitle.textContent = `Tầng ${floor.tang}`;
    }
    floorContainer.appendChild(floorTitle);

    // Kiểm tra số lượng dãy ghế
    if (floor.cacday.length > 3) {
      // Tạo 2 thẻ div
      const verticalContainer = document.createElement("div");
      verticalContainer.classList.add("verticalContainer");

      const horizontalContainer = document.createElement("div");

      // Duyệt qua từng dãy ghế
      floor.cacday.forEach((row) => {
        const rowContainer = document.createElement("div");

        if (row.dayso <= 3) {
          rowContainer.classList.add("row-vertical"); // Sắp xếp dọc cho dãy 1-3
          row.soghe.forEach((seatId) => {
            const seat = document.createElement("button");
            seat.classList.add("seat");
            seat.id = seatId;
            seat.textContent = seatId;
            if (dsGheDaDat.includes(seatId)) {
              seat.classList.add("sold");
              seat.disabled = true;
            } else {
              seat.classList.add("available");
              seat.addEventListener("click", () => {
                var selectedSeats = document.querySelectorAll(
                  `#${containerId} .seat.selected`
                );
                if (seat.classList.contains("selected")) {
                  // Bỏ chọn ghế
                  seat.classList.remove("selected");
                  updateSelectedSeats(containerId);
                } else if (selectedSeats.length < 5) {
                  // Chọn ghế nếu chưa đạt giới hạn
                  seat.classList.add("selected");
                  updateSelectedSeats(containerId);
                } else {
                  // Hiển thị thông báo nếu vượt quá giới hạn
                  alert("Bạn chỉ được chọn tối đa 5 ghế.");
                }
              });
            }
            rowContainer.appendChild(seat);
          });
          verticalContainer.appendChild(rowContainer);
        } else {
          rowContainer.classList.add("row-horizontal"); // Sắp xếp ngang cho dãy > 3
          row.soghe.forEach((seatId) => {
            const seat = document.createElement("button");
            seat.classList.add("seat");
            seat.id = seatId;
            seat.textContent = seatId;
            if (dsGheDaDat.includes(seatId)) {
              seat.classList.add("sold");
              seat.disabled = true;
            } else {
              seat.classList.add("available");
              seat.addEventListener("click", () => {
                var selectedSeats = document.querySelectorAll(
                  `#${containerId} .seat.selected`
                );
                if (seat.classList.contains("selected")) {
                  // Bỏ chọn ghế
                  seat.classList.remove("selected");
                  updateSelectedSeats(containerId);
                } else if (selectedSeats.length < 5) {
                  // Chọn ghế nếu chưa đạt giới hạn
                  seat.classList.add("selected");
                  updateSelectedSeats(containerId);
                } else {
                  // Hiển thị thông báo nếu vượt quá giới hạn
                  alert("Bạn chỉ được chọn tối đa 5 ghế.");
                }
              });
            }
            rowContainer.appendChild(seat);
          });
          horizontalContainer.appendChild(rowContainer);
        }
      });

      // Thêm cả 2 container vào tầng
      floorContainer.appendChild(verticalContainer);
      floorContainer.appendChild(horizontalContainer);
    } else {
      // Nếu số lượng dãy ghế <= 3
      const verticalContainer = document.createElement("div");
      verticalContainer.classList.add("verticalContainer");

      floor.cacday.forEach((row) => {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-vertical");

        row.soghe.forEach((seatId) => {
          const seat = document.createElement("button");
          seat.classList.add("seat");
          seat.id = seatId;
          seat.textContent = seatId;

          if (dsGheDaDat.includes(seatId)) {
            seat.classList.add("sold");
            seat.disabled = true;
          } else {
            seat.classList.add("available");
            seat.addEventListener("click", () => {
              var selectedSeats = document.querySelectorAll(
                `#${containerId} .seat.selected`
              );
              if (seat.classList.contains("selected")) {
                // Bỏ chọn ghế
                seat.classList.remove("selected");
                updateSelectedSeats(containerId);
              } else if (selectedSeats.length < 5) {
                // Chọn ghế nếu chưa đạt giới hạn
                seat.classList.add("selected");
                updateSelectedSeats(containerId);
              } else {
                // Hiển thị thông báo nếu vượt quá giới hạn
                alert("Bạn chỉ được chọn tối đa 5 ghế.");
              }
            });
          }
          rowContainer.appendChild(seat);
        });

        verticalContainer.appendChild(rowContainer);
      });

      floorContainer.appendChild(verticalContainer);
    }

    seatMapContainer.appendChild(floorContainer);
  });
}

// Hàm cập nhật danh sách ghế đã chọn
function updateSelectedSeats(containerId) {
  const selectedSeats = document.querySelectorAll(
    `#${containerId} .seat.selected`
  );
  const selectedSeatIds = Array.from(selectedSeats).map((seat) => seat.id);

  // Hiển thị danh sách ghế đã chọn lên giao diện
  const selectedSeatsDisplay = document.getElementById("selected-seats");
  const quantity = document.getElementById("quantity");
  const totalAmount = document.getElementById("totalAmount");
  const params = getParamsFromURL();
  var price = parseInt(params.giave);

  if (selectedSeatsDisplay) {
    selectedSeatsDisplay.textContent = selectedSeatIds.join(", ") || "";
    quantity.textContent = selectedSeatIds.length + " Ghế" || 0 + " Ghế";
    var formatTien = (selectedSeatIds.length * price).toLocaleString("vi-VN");
    totalAmount.textContent = formatTien + "đ" || "0đ";
  }
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

function Dangxuat() {
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("hotenKH");
    localStorage.removeItem("email");
    localStorage.removeItem("sdt");
    localStorage.removeItem("token");
    localStorage.removeItem("maKH");
    localStorage.removeItem("avatarURL");
    window.location.reload();
  });
}

function autoFillInformation() {
  const params = getParamsFromURL();
  document.getElementsByClassName("RouteDetails")[0].textContent =
    params.diemdi + " - " + params.diemden + " (" + params.date + ")";
  document.getElementById("time").textContent =
    new Date(params.giodi).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }) +
    " " +
    params.date;
  document.getElementById("route").textContent =
    params.bendi + " - " + params.benden;

  const hotenKH = localStorage.getItem("hotenKH");
  const email = localStorage.getItem("email");
  const sodienthoai = localStorage.getItem("sdt");

  if (hotenKH) {
    document.getElementById("fullName").value = hotenKH;
  }
  if (email) {
    document.getElementById("email").value = email;
  }
  if (sodienthoai) {
    document.getElementById("phone").value = sodienthoai;
  }
}

async function thanhToan() {
  // Lấy thông tin từ các trường input
  var fullName = document.getElementById("fullName").value;
  var phone = document.getElementById("phone").value.trim();
  phone = ChuanHoaSDT(phone);
  var email = document.getElementById("email").value.trim();

  // Lấy danh sách ghế đã chọn
  const selectedSeats = document.querySelectorAll("#seat-map .seat.selected");
  const selectedSeatIds = Array.from(selectedSeats).map((seat) => seat.id);

  // Kiểm tra các điều kiện
  if (!fullName || !phone || !email) {
    alert("Vui lòng nhập đủ thông tin.");
    return;
  }
  if (!ktSDTHopLe(phone)) {
    alert("Số điện thoại không hợp lệ.");
    return;
  }
  if (!ktEmail(email)) {
    alert("Email không hợp lệ.");
    return;
  }
  if (selectedSeatIds.length === 0) {
    alert("Vui lòng chọn ít nhất một ghế trước khi thanh toán.");
    return;
  }
  const params = getParamsFromURL();
  var maChuyenXe = parseInt(params.maChuyenXe);
  var giaGoc = parseFloat(params.giave);
  var soLuong = selectedSeatIds.length;
  var tongTien = soLuong * giaGoc;
  var maKH = localStorage.getItem("maKH");
  if (maKH) {
    maKH = parseInt(maKH);
  } else {
    maKH = await timKhachHang(phone, email);
    if (maKH) {
      maKH = parseInt(maKH);
    } else {
      maKH = null;
    }
  }

  const datVeRequest = {
    Ma_Chuyenxe: maChuyenXe,
    Ma_Khachhang: maKH,
    Soluong: soLuong,
    Giagoc: tongTien,
    Giasaukhuyenmai: tongTien,
    Ghichu: null,
    Tenkhachhang: fullName,
    Sodienthoai: phone,
    Email: email,
    dsGhe: selectedSeatIds,
  };
  const result = await sendDatVeRequest(datVeRequest);
  console.log(result.message);
  if (result.message === "Đặt vé thành công!") {
    alert("Đặt vé thành công!");
    window.location.href = "../index.html";
  } else if (result.message === "Ghế đã có người đặt") {
    alert("Ghế đã có người đặt");
    window.location.reload();
  } else {
    alert(result.message);
  }
}

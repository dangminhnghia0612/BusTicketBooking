import { layDanhSachTinh } from "./api/tinh.js";
document.addEventListener("DOMContentLoaded", async function () {
  const before = document.getElementsByClassName("before-login")[0];
  const after = document.getElementsByClassName("after-login")[0];
  const userName = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");

  ThietLapNgayMacDinh('input[type="date"]');

  // Kiểm tra xem người dùng đã đăng nhập chưa
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
  XulyDangXuat();

  // Danh sách các điểm đi
  const locations = await layDanhSachTinh();
  const departureInput = document.getElementById("departure-input");
  const departureSuggestions = document.getElementById("departure-suggestions");
  GoiYDiaDiem(departureInput, departureSuggestions, locations);
  const destinationInput = document.getElementById("destination-input");
  const destinationSuggestions = document.getElementById(
    "destination-suggestions"
  );
  GoiYDiaDiem(destinationInput, destinationSuggestions, locations);

  //Sự kiện nút Swap
  const swapButton = document.getElementById("swap-button");
  swapButton.addEventListener("click", function () {
    HoanDoi();
  });

  //Sự kiện click vào nút tìm chuyến xe
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function () {
    TimChuyenXe();
  });
});

function ThietLapNgayMacDinh(inputSelector) {
  const ngayDiInput = document.querySelector(inputSelector);

  if (!ngayDiInput) {
    console.error(`Không tìm thấy phần tử với selector: ${inputSelector}`);
    return;
  }

  // Lấy ngày hiện tại của hệ thống
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const dd = String(today.getDate()).padStart(2, "0");

  // Định dạng ngày theo chuẩn yyyy-mm-dd
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  // Gán giá trị mặc định cho input
  ngayDiInput.value = formattedDate;
}
function GoiYDiaDiem(inputElement, suggestionsElement, data) {
  inputElement.addEventListener("input", function () {
    const query = inputElement.value.toLowerCase().trim();
    suggestionsElement.innerHTML = ""; // Xóa gợi ý cũ

    if (query === "") {
      suggestionsElement.style.display = "none";
      return;
    }

    // Lọc danh sách gợi ý
    const filteredLocations = data.filter((location) =>
      location.ten.toLowerCase().includes(query)
    );

    // Hiển thị danh sách gợi ý
    if (filteredLocations.length > 0) {
      suggestionsElement.style.display = "block";
      filteredLocations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location.maTinh; // Lưu MaTinh vào thuộc tính value
        option.textContent = location.ten; // Hiển thị tên tỉnh
        suggestionsElement.appendChild(option);
      });
      // Xử lý sự kiện chọn gợi ý
      suggestionsElement.addEventListener("change", function () {
        const selectedOption =
          suggestionsElement.options[suggestionsElement.selectedIndex];
        inputElement.value = selectedOption.textContent; // Điền tên tỉnh vào ô input
        suggestionsElement.style.display = "none"; // Ẩn danh sách gợi ý
      });
    } else {
      suggestionsElement.style.display = "none";
    }
  });

  // Ẩn danh sách gợi ý khi click ra ngoài
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".form-group")) {
      suggestionsElement.style.display = "none";
    }
  });
}
function XulyDangXuat() {
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("hotenKH");
    localStorage.removeItem("avatarURL");
    window.location.reload();
  });
}
function HoanDoi() {
  const departureInput = document.getElementById("departure-input");
  const destinationInput = document.getElementById("destination-input");
  const temp = departureInput.value;
  departureInput.value = destinationInput.value;
  destinationInput.value = temp;
}
function TimChuyenXe() {
  const iframeContainer = document.getElementById("iframe-container");
  const resultIframe = document.getElementById("result-iframe");

  // Lấy giá trị từ các input
  const departure = document.getElementById("departure-input").value;
  const destination = document.getElementById("destination-input").value;
  const date = document.getElementById("departure-date").value;
  const ticketCount = document.getElementById("ticket-count").value;

  // Kiểm tra nếu các trường bắt buộc chưa được nhập
  if (!departure || !destination) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Tạo URL với query string để truyền dữ liệu đến `tim-chuyen-xe.html`
  const url = `./pages/tim-chuyen-xe.html?departure=${encodeURIComponent(
    departure
  )}&destination=${encodeURIComponent(
    destination
  )}&date=${date}&tickets=${ticketCount}`;

  // Hiển thị iframe và gán URL
  iframeContainer.style.display = "block";
  resultIframe.src = url;
}

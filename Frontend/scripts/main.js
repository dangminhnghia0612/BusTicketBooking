import { layDanhSachTinh } from "./api/tinh-API.js";
import { setDefaultDate } from "./utils/dateUtil.js";
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
  await loadComponent("header", "./components/header.html");
  await loadComponent("footer", "./components/footer.html");

  ktDangNhap();
  Dangxuat();

  setDefaultDate('input[type="date"]');
  const locations = await layDanhSachTinh();

  goiYDiaDiem(
    document.getElementById("departure-input"),
    document.getElementById("departure-suggestions"),
    locations
  );
  goiYDiaDiem(
    document.getElementById("destination-input"),
    document.getElementById("destination-suggestions"),
    locations
  );
  hoanDoi("swap-button", "departure-input", "destination-input");

  timChuyenXe("search-button", "iframe-container", "result-iframe");
});
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
    window.location.href = "/index.html";
  });
}

function goiYDiaDiem(inputElement, suggestionsElement, data) {
  inputElement.addEventListener("input", function () {
    const query = inputElement.value.toLowerCase().trim();
    suggestionsElement.innerHTML = "";

    if (query === "") {
      suggestionsElement.style.display = "none";
      return;
    }

    const filteredLocations = data.filter((location) =>
      location.ten.toLowerCase().includes(query)
    );

    if (filteredLocations.length > 0) {
      suggestionsElement.style.display = "block";
      filteredLocations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location.maTinh;
        option.textContent = location.ten;
        suggestionsElement.appendChild(option);
      });

      suggestionsElement.addEventListener("change", function () {
        const selectedOption =
          suggestionsElement.options[suggestionsElement.selectedIndex];
        inputElement.value = selectedOption.textContent;
        suggestionsElement.style.display = "none";
      });
    } else {
      suggestionsElement.style.display = "none";
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".form-group")) {
      suggestionsElement.style.display = "none";
    }
  });
}

function hoanDoi(swapButtonId, departureInputId, destinationInputId) {
  const swapButton = document.getElementById(swapButtonId);
  const departureInput = document.getElementById(departureInputId);
  const destinationInput = document.getElementById(destinationInputId);

  swapButton.addEventListener("click", function () {
    const temp = departureInput.value;
    departureInput.value = destinationInput.value;
    destinationInput.value = temp;
  });
}

function timChuyenXe(searchButtonId, iframeContainerId, resultIframeId) {
  const searchButton = document.getElementById(searchButtonId);
  const iframeContainer = document.getElementById(iframeContainerId);
  const resultIframe = document.getElementById(resultIframeId);

  searchButton.addEventListener("click", function () {
    const departure = document.getElementById("departure-input").value;
    const destination = document.getElementById("destination-input").value;
    const date = document.getElementById("departure-date").value;
    const ticketCount = document.getElementById("ticket-count").value;

    if (!departure || !destination) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const url = `./pages/User/tim-chuyen-xe.html?departure=${encodeURIComponent(
      departure
    )}&destination=${encodeURIComponent(
      destination
    )}&date=${date}&tickets=${ticketCount}`;

    iframeContainer.style.display = "block";
    resultIframe.src = url;
  });
}

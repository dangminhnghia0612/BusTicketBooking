import { getParamsFromURL } from "../utils/urlUtil.js";

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

  const params = getParamsFromURL();
  document.getElementsByClassName("RouteDetails")[0].textContent =
    params.diemdi + " - " + params.diemden + " (" + params.date + ")";

  const seatData = [
    {
      tang: 1,
      cacday: [
        { dayso: 1, soghe: ["A1", "A3", "A5", "A7", "A9"] },
        { dayso: 2, soghe: ["B1", "B3", "B5", "B7", "B9"] },
        { dayso: 3, soghe: ["C1", "C3", "C5", "C7", "C9"] },
        { dayso: 4, soghe: ["A11", "A13", "B11", "C13", "C11"] },
      ],
    },
    {
      tang: 2,
      cacday: [
        { dayso: 1, soghe: ["A2", "A4", "A6", "A8", "A10"] },
        { dayso: 2, soghe: ["B2", "B4", "B6", "B8", "B10"] },
        { dayso: 3, soghe: ["C2", "C4", "C6", "C8", "C10"] },
        { dayso: 4, soghe: ["A12", "A14", "B12", "C14", "C12"] },
      ],
    },
  ];
  veSoDoGhe(seatData, "seat-map");
});

function veSoDoGhe(seatData, containerId) {
  const seatMapContainer = document.getElementById(containerId);

  if (!seatMapContainer) {
    console.error(`Container với ID "${containerId}" không tồn tại.`);
    return;
  }

  // Xóa nội dung cũ trong container
  seatMapContainer.innerHTML = "";

  // Duyệt qua từng tầng
  seatData.forEach((floor) => {
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
            seat.classList.add("seat", "available");
            seat.id = seatId;
            seat.textContent = seatId;
            seat.addEventListener("click", () => {
              if (seat.classList.contains("sold")) return; // Không cho chọn ghế đã bán

              seat.classList.toggle("selected");
              updateSelectedSeats(containerId);
            });
            rowContainer.appendChild(seat);
          });
          verticalContainer.appendChild(rowContainer);
        } else {
          rowContainer.classList.add("row-horizontal"); // Sắp xếp ngang cho dãy > 3
          row.soghe.forEach((seatId) => {
            const seat = document.createElement("button");
            seat.classList.add("seat", "available");
            seat.id = seatId;
            seat.textContent = seatId;
            seat.addEventListener("click", () => {
              if (seat.classList.contains("sold")) return; // Không cho chọn ghế đã bán

              seat.classList.toggle("selected");
              updateSelectedSeats(containerId);
            });
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
          seat.classList.add("seat", "available");
          seat.id = seatId;
          seat.textContent = seatId;

          seat.addEventListener("click", () => {
            if (seat.classList.contains("sold")) return; // Không cho chọn ghế đã bán

            seat.classList.toggle("selected");
            updateSelectedSeats(containerId);
          });
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

  console.log("Ghế đã chọn:", selectedSeatIds);

  // Hiển thị danh sách ghế đã chọn lên giao diện (nếu cần)
  const selectedSeatsDisplay = document.getElementById("selected-seats");
  if (selectedSeatsDisplay) {
    selectedSeatsDisplay.textContent =
      selectedSeatIds.join(", ") || "Chưa chọn ghế nào";
  }
}

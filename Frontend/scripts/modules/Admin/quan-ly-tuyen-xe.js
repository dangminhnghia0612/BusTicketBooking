import {
  layDSTuyenXe,
  xoaTuyenXe,
  themTuyenXe,
  suaTuyenXe,
  timTuyenXe,
} from "../../api/tuyen-xe-API.js";
import { layDanhSachTinh } from "../../api/tinh-API.js";
import { layDSBenXeCuaTinh } from "../../api/ben-xe-API.js";
let idTuyenXe = -1;
document.addEventListener("DOMContentLoaded", async function () {
  const btnThemTuyenXe = document.getElementById("btnThemTuyenXe");
  const btnLuuTuyenXe = document.getElementById("btnLuuTuyenXe");
  const modalTuyenXe = document.getElementById("modalTuyenXe");
  const tieude = document.getElementById("tieudeModalTuyenXe");

  loadDSTuyenXe();
  thietlapDropdowns();

  btnThemTuyenXe.addEventListener("click", function () {
    tieude.textContent = "Thêm tuyến xe mới";
    const modal = new bootstrap.Modal(modalTuyenXe);
    modal.show();
  });

  modalTuyenXe.addEventListener("hidden.bs.modal", function () {
    resetModal();
  });
  modalTuyenXe.addEventListener("shown.bs.modal", function () {
    if (idTuyenXe !== -1) {
      loadTuyenXe(idTuyenXe);
    }
  });
  btnLuuTuyenXe.addEventListener("click", function () {
    if (tieude.textContent === "Thêm tuyến xe mới") {
      themTuyenXeMoi();
    } else {
      suaThongTinTuyenXe(idTuyenXe);
    }
  });
});

async function loadDSTuyenXe() {
  const dsTuyenXe = await layDSTuyenXe();

  const tuyenxeTableBody = document.querySelector("#tableTuyenXe tbody");
  tuyenxeTableBody.innerHTML = "";

  dsTuyenXe.forEach((tx) => {
    const row = document.createElement("tr");
    var tentuyen = tx.tinhdi + " - " + tx.tinhden;
    row.innerHTML = `
        <td>${tx.matuyen}</td>
        <td>${tentuyen}</td>
        <td>${tx.bendi}</td>
        <td>${tx.benden}</td>
        <td>${tx.khoangthoigian}</td>
        <td>${tx.khoangcach}</td>
        <td>${tx.giave}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1" id="btnSuaTuyenXe-${tx.matuyen}">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" id="btnXoaTuyenXe-${tx.matuyen}">
                <i class="bi bi-trash"></i>
            </button>
        </td>
      `;
    tuyenxeTableBody.appendChild(row);
    document
      .getElementById(`btnXoaTuyenXe-${tx.matuyen}`)
      .addEventListener("click", async function () {
        var confirm = window.confirm(
          `Bạn có chắc chắn muốn xóa tuyến xe có mã ${tx.matuyen} không?`
        );
        if (confirm) {
          var response = await xoaTuyenXe(tx.matuyen);
          if (response.message === "Xóa thành công") {
            loadDSTuyenXe();
            alert("Xóa thành công");
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
      });
    document
      .getElementById(`btnSuaTuyenXe-${tx.matuyen}`)
      .addEventListener("click", function () {
        const modal = new bootstrap.Modal(
          document.getElementById("modalTuyenXe")
        );
        const tieude = document.getElementById("tieudeModalTuyenXe");
        tieude.textContent = "Sửa thông tin tuyến xe";

        idTuyenXe = tx.matuyen;
        modal.show();
      });
  });
}

async function themTuyenXeMoi() {
  var bendi = document.getElementById("bendi").value;
  var benden = document.getElementById("benden").value;
  var khoangthoigian = document.getElementById("khoangthoigian").value;
  var khoangcach = document.getElementById("khoangcach").value;
  var giave = document.getElementById("giave").value;
  if (bendi && benden && khoangthoigian && khoangcach && giave) {
    khoangthoigian = parseInt(khoangthoigian);
    khoangcach = parseFloat(khoangcach);
    giave = parseFloat(giave);
    const response = await themTuyenXe(
      bendi,
      benden,
      khoangthoigian,
      khoangcach,
      giave
    );
    if (response.message === "Thêm thành công") {
      alert("Thêm tuyến xe mới thành công!");
      loadDSTuyenXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTuyenXe")
      );
      modal.hide();
    } else {
      alert("Thêm tuyến xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}

async function thietlapDropdowns() {
  const tinhdiDropdown = document.getElementById("tinhBendi");
  const bendiDropdown = document.getElementById("bendi");
  const tinhdenDropdown = document.getElementById("tinhBenden");
  const bendenDropdown = document.getElementById("benden");

  // Load danh sách tỉnh
  const dsTinh = await layDanhSachTinh();
  tinhdiDropdown.innerHTML =
    '<option value="" disabled selected>Chọn tỉnh đi</option>';
  tinhdenDropdown.innerHTML =
    '<option value="" disabled selected>Chọn tỉnh đến</option>';
  dsTinh.forEach((tinh) => {
    tinhdiDropdown.innerHTML += `<option value="${tinh.maTinh}">${tinh.ten}</option>`;
    tinhdenDropdown.innerHTML += `<option value="${tinh.maTinh}">${tinh.ten}</option>`;
  });

  // Khi chọn tỉnh, load danh sách bến
  tinhdiDropdown.addEventListener("change", async () => {
    const tinhValue = tinhdiDropdown.value;
    const dsBendi = await layDSBenXeCuaTinh(tinhValue);
    bendiDropdown.innerHTML = `<option value="" disabled selected>Chọn bến đi</option>`;
    if (dsBendi.length === 0) {
      alert("Tỉnh này chưa có bến xe nào");
    } else {
      bendiDropdown.disabled = false;
      dsBendi.forEach((ben) => {
        bendiDropdown.innerHTML += `<option value="${ben.mabenxe}">${ben.tenbenxe}</option>`;
      });
    }
  });
  tinhdenDropdown.addEventListener("change", async () => {
    const tinhValue = tinhdenDropdown.value;
    const dsBenden = await layDSBenXeCuaTinh(tinhValue);
    bendenDropdown.innerHTML = `<option value="" disabled selected>Chọn bến đến</option>`;
    if (dsBenden.length === 0) {
      alert("Tỉnh này chưa có bến xe nào");
    } else {
      bendenDropdown.disabled = false;
      dsBenden.forEach((ben) => {
        bendenDropdown.innerHTML += `<option value="${ben.mabenxe}">${ben.tenbenxe}</option>`;
      });
    }
  });
}

function resetModal() {
  const form = document.getElementById("formTuyenXe");
  form.reset();

  const tinhBendi = document.getElementById("tinhBendi");
  const bendi = document.getElementById("bendi");
  const tinhBenden = document.getElementById("tinhBenden");
  const benden = document.getElementById("benden");
  tinhBendi.value = "";
  bendi.innerHTML = '<option value="" disabled selected>Chọn bến đi</option>';
  bendi.disabled = true;

  tinhBenden.value = "";
  benden.innerHTML = '<option value="" disabled selected>Chọn bến đến</option>';
  benden.disabled = true;

  idTuyenXe = -1;
}

async function loadTuyenXe(maTuyen) {
  const tx = await timTuyenXe(maTuyen);
  const tinhdiDropdown = document.getElementById("tinhBendi");
  const tinhdenDropdown = document.getElementById("tinhBenden");
  var bendiDropdown = document.getElementById("bendi");
  var bendenDropdown = document.getElementById("benden");

  var optionsTinhdi = tinhdiDropdown.querySelectorAll("option");
  optionsTinhdi.forEach(async function (option) {
    if (option.textContent === tx.tinhdi) {
      option.selected = true;
      var dsBendi = await layDSBenXeCuaTinh(option.value);
      bendiDropdown.innerHTML = `<option value="" selected>Chọn bến đi</option>`;
      dsBendi.forEach((ben) => {
        bendiDropdown.innerHTML += `<option value="${ben.mabenxe}" ${
          ben.tenbenxe === tx.bendi ? "selected" : ""
        }>${ben.tenbenxe}</option>`;
      });
    }
  });

  var optionsTinhden = tinhdenDropdown.querySelectorAll("option");
  optionsTinhden.forEach(async function (option) {
    if (option.textContent === tx.tinhden) {
      option.selected = true;
      var dsBenden = await layDSBenXeCuaTinh(option.value);
      bendenDropdown.innerHTML = `<option value="" selected>Chọn bến đến</option>`;
      dsBenden.forEach((ben) => {
        bendenDropdown.innerHTML += `<option value="${ben.mabenxe}" ${
          ben.tenbenxe === tx.benden ? "selected" : ""
        }>${ben.tenbenxe}</option>`;
      });
    }
  });
  bendiDropdown.disabled = false;
  bendenDropdown.disabled = false;

  document.getElementById("khoangthoigian").value = tx.khoangthoigian;
  document.getElementById("khoangcach").value = tx.khoangcach;
  document.getElementById("giave").value = tx.giave;
}

async function suaThongTinTuyenXe(maTuyen) {
  var bendi = document.getElementById("bendi").value;
  var benden = document.getElementById("benden").value;
  var khoangthoigian = document.getElementById("khoangthoigian").value;
  var khoangcach = document.getElementById("khoangcach").value;
  var giave = document.getElementById("giave").value;

  if (bendi && benden && khoangthoigian && khoangcach && giave) {
    khoangthoigian = parseInt(khoangthoigian);
    khoangcach = parseFloat(khoangcach);
    giave = parseFloat(giave);
    const response = await suaTuyenXe(
      maTuyen,
      bendi,
      benden,
      khoangthoigian,
      khoangcach,
      giave
    );
    if (response.message === "Sửa thành công") {
      idTuyenXe = -1;
      alert("Sửa thông tin tuyến xe thành công!");
      loadDSTuyenXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTuyenXe")
      );
      modal.hide();
    } else {
      alert("Sửa thông tin tuyến xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}

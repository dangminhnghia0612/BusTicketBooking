import {
  layDSChuyenXe,
  xoaChuyenXe,
  themChuyenXe,
  suaChuyenXe,
  timChuyenXe,
} from "../../api/chuyen-xe-API.js";
import { dinhDangNgay, dinhDangGio } from "../../utils/dateUtil.js";
import { layDanhSachTinh } from "../../api/tinh-API.js";
import { timTuyenXeBangMaTinh } from "../../api/tuyen-xe-API.js";
import { layDSXe } from "../../api/xe-API.js";

let idChuyenXe = -1;

document.addEventListener("DOMContentLoaded", async function () {
  const btnThemChuyenXe = document.getElementById("btnThemChuyenXe");
  const btnLuuChuyenXe = document.getElementById("btnLuuChuyenXe");
  const modalChuyenXe = document.getElementById("modalChuyenXe");
  const tieude = document.getElementById("tieudeModalChuyenXe");

  loadDSChuyenXe();
  thietlapDropdowns();

  btnThemChuyenXe.addEventListener("click", function () {
    tieude.textContent = "Thêm chuyến xe mới";
    const modal = new bootstrap.Modal(modalChuyenXe);
    modal.show();
  });
  modalChuyenXe.addEventListener("hidden.bs.modal", function () {
    resetModal();
  });
  modalChuyenXe.addEventListener("shown.bs.modal", function () {
    if (idChuyenXe !== -1) {
      loadChuyenXe(idChuyenXe);
    }
  });
  btnLuuChuyenXe.addEventListener("click", function () {
    if (tieude.textContent === "Thêm chuyến xe mới") {
      themChuyenXeMoi();
    } else {
      suaThongTinChuyenXe(idChuyenXe);
    }
  });
});

async function loadDSChuyenXe() {
  const dsChuyenXe = await layDSChuyenXe();

  const chuyenxeTableBody = document.querySelector("#tableChuyenXe tbody");
  chuyenxeTableBody.innerHTML = "";

  dsChuyenXe.forEach((cx) => {
    const row = document.createElement("tr");
    let tentuyen = cx.diemdi + " - " + cx.diemden;
    let benxe = cx.bendi + " - " + cx.benden;
    let ngaydi = dinhDangNgay(cx.giodi);
    let giodi = dinhDangGio(cx.giodi);
    let ngayden = dinhDangNgay(cx.gioden);
    let gioden = dinhDangGio(cx.gioden);
    row.innerHTML = `
        <td><strong>${cx.machuyenxe}</strong></td>
        <td>
            <div>
                <p class="mb-0 fw-medium">${tentuyen}</p>
                <small class="text-muted">${benxe}</small>
            </div>
        </td>
        <td>
            <div>
                <p class="mb-0 fw-medium">${ngaydi}</p>
                <small class="text-muted">${giodi}</small>
            </div>
        </td>
        <td>
            <div>
                <p class="mb-0 fw-medium">${ngayden}</p>
                <small class="text-muted">${gioden}</small>
            </div>
        </td>
        <td>${cx.biensoxe}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1" id="btnSuaChuyenXe-${cx.machuyenxe}">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" id="btnXoaChuyenXe-${cx.machuyenxe}">
                <i class="bi bi-trash"></i>
            </button>
        </td>
      `;
    chuyenxeTableBody.appendChild(row);
    document
      .getElementById(`btnXoaChuyenXe-${cx.machuyenxe}`)
      .addEventListener("click", async function () {
        var confirm = window.confirm(
          `Bạn có chắc chắn muốn xóa chuyến xe có mã ${cx.machuyenxe} không?`
        );
        if (confirm) {
          var response = await xoaChuyenXe(cx.machuyenxe);
          if (response.message === "Xóa thành công") {
            loadDSChuyenXe();
            alert("Xóa thành công");
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
      });
    document
      .getElementById(`btnSuaChuyenXe-${cx.machuyenxe}`)
      .addEventListener("click", function () {
        const modal = new bootstrap.Modal(
          document.getElementById("modalChuyenXe")
        );
        const tieude = document.getElementById("tieudeModalChuyenXe");
        tieude.textContent = "Sửa thông tin chuyến xe";

        idChuyenXe = cx.machuyenxe;
        modal.show();
      });
  });
}

async function thietlapDropdowns() {
  var tinhDiSelect = document.getElementById("tinhdi");
  var tinhDenSelect = document.getElementById("tinhden");
  var tuyenXeSelect = document.getElementById("tuyenxe");
  var xeSelect = document.getElementById("xe");

  const dsTinh = await layDanhSachTinh();
  tinhDiSelect.innerHTML = '<option value="" selected>Chọn tỉnh đi</option>';
  tinhDenSelect.innerHTML = '<option value="" selected>Chọn tỉnh đến</option>';
  dsTinh.forEach((tinh) => {
    tinhDiSelect.innerHTML += `<option value="${tinh.maTinh}">${tinh.ten}</option>`;
    tinhDenSelect.innerHTML += `<option value="${tinh.maTinh}">${tinh.ten}</option>`;
  });

  const dsXe = await layDSXe();
  xeSelect.innerHTML = '<option value="" selected>Chọn xe</option>';
  dsXe.forEach((xe) => {
    xeSelect.innerHTML += `<option value="${xe.maxe}">${xe.bienso}</option>`;
  });
  tuyenXeSelect.innerHTML = '<option value="" selected>Chọn tuyến xe</option>';
  tuyenXeSelect.disabled = true;

  // Gắn sự kiện mới
  tinhDiSelect.addEventListener("change", kiemtraTinh);
  tinhDenSelect.addEventListener("change", kiemtraTinh);

  async function kiemtraTinh() {
    const tinhDiValue = tinhDiSelect.value;
    const tinhDenValue = tinhDenSelect.value;

    if (tinhDiValue && tinhDenValue) {
      const dsTuyenXe = await timTuyenXeBangMaTinh(tinhDiValue, tinhDenValue);
      if ("message" in dsTuyenXe) {
        tuyenXeSelect.innerHTML = `<option value="" selected>${dsTuyenXe.message}</option>`;
        tuyenXeSelect.disabled = true;
      } else {
        tuyenXeSelect.innerHTML =
          '<option value="" selected>Chọn tuyến xe</option>';
        dsTuyenXe.forEach((tuyen) => {
          let tentuyen = `${tuyen.bendi} - ${tuyen.benden}`;
          tuyenXeSelect.innerHTML += `<option value="${tuyen.matuyen}">${tentuyen}</option>`;
        });
        tuyenXeSelect.disabled = false;
      }
    } else {
      tuyenXeSelect.innerHTML =
        '<option value="" selected>Chọn tuyến xe</option>';
      tuyenXeSelect.disabled = true;
    }
  }
}

function resetModal() {
  const form = document.getElementById("formChuyenXe");
  form.reset();

  const tuyenxe = document.getElementById("tuyenxe");
  tuyenxe.innerHTML = '<option value=""selected>Chọn tuyến xe</option>';
  tuyenxe.disabled = true;
  idChuyenXe = -1;
}

async function themChuyenXeMoi() {
  var tuyenxe = document.getElementById("tuyenxe").value;
  var xe = document.getElementById("xe").value;
  var giodi = document.getElementById("giodi").value;
  if (tuyenxe && xe && giodi) {
    console.log(tuyenxe, xe, giodi);
    const response = await themChuyenXe(tuyenxe, xe, giodi);
    if (response.message === "Thêm thành công") {
      alert("Thêm chuyến xe mới thành công!");
      loadDSChuyenXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalChuyenXe")
      );
      modal.hide();
    } else {
      alert("Thêm chuyến xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}

async function loadChuyenXe(maChuyenXe) {
  // Lấy thông tin chuyến xe từ API
  const cx = await timChuyenXe(maChuyenXe);

  // Lấy các phần tử trong modal
  const tinhDiSelect = document.getElementById("tinhdi");
  const tinhDenSelect = document.getElementById("tinhden");
  const tuyenXeSelect = document.getElementById("tuyenxe");
  const xeSelect = document.getElementById("xe");
  const giodiInput = document.getElementById("giodi");

  // Đặt giá trị cho Tỉnh đi
  tinhDiSelect.value = cx.diemdi;
  tinhDenSelect.value = cx.diemden;

  // Đặt giá trị cho Tuyến xe
  const dsTuyenXe = await timTuyenXeBangMaTinh(cx.diemdi, cx.diemden);
  tuyenXeSelect.innerHTML = '<option value="" selected>Chọn tuyến xe</option>';
  dsTuyenXe.forEach((tuyen) => {
    tuyenXeSelect.innerHTML += `<option value="${tuyen.matuyen}" ${
      tuyen.matuyen === cx.matuyenxe ? "selected" : ""
    }>${tuyen.bendi} - ${tuyen.benden}</option>`;
  });
  tuyenXeSelect.disabled = false;

  // Đặt giá trị cho Xe
  const dsXe = await layDSXe();
  xeSelect.innerHTML = '<option value="" selected>Chọn xe</option>';
  dsXe.forEach((xe) => {
    xeSelect.innerHTML += `<option value="${xe.maxe}" ${
      xe.maxe === cx.maxe ? "selected" : ""
    }>${xe.bienso}</option>`;
  });
  giodiInput.value = cx.giodi;
}

async function suaThongTinChuyenXe(maChuyenXe) {
  var tuyenxe = document.getElementById("tuyenxe").value;
  var xe = document.getElementById("xe").value;
  var giodi = document.getElementById("giodi").value;

  if (tuyenxe && xe && giodi) {
    console.log(tuyenxe, xe, giodi);
    const response = await suaChuyenXe(maChuyenXe, tuyenxe, xe, giodi);
    if (response.message === "Sửa thành công") {
      alert("Sửa thông tin chuyến xe thành công!");
      loadDSChuyenXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalChuyenXe")
      );
      modal.hide();
    } else {
      alert("Sửa chuyến xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}

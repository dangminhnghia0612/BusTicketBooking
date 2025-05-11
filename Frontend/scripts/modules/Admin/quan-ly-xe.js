import { layDSXe, xoaXe, themXe, suaXe } from "../../api/xe-API.js";
import { layDSLoaiXe, xoaLoaiXe } from "../../api/loai-xe-API.js";
let idXe = -1;
document.addEventListener("DOMContentLoaded", async function () {
  const btnThemXe = document.getElementById("btnThemXe");
  const btnThemLoaiXe = document.getElementById("btnThemLoaiXe");
  const xeLink = document.getElementById("link-xe");
  const loaixeLink = document.getElementById("link-loaixe");

  loadDSXe();
  loadDSLoaiXe_ModalXe();

  loaixeLink.addEventListener("click", function () {
    btnThemLoaiXe.style.display = "block";
    btnThemXe.style.display = "none";
    loadDSLoaiXe();
  });
  xeLink.addEventListener("click", function () {
    btnThemLoaiXe.style.display = "none";
    btnThemXe.style.display = "block";
    loadDSXe();
  });

  const tieude = document.getElementById("tieudeModalXe");
  document.getElementById("btnThemXe").addEventListener("click", function () {
    // Mở modal
    tieude.textContent = "Thêm xe mới";
    const modal = new bootstrap.Modal(document.getElementById("modalXe"));
    modal.show();
  });
  document
    .getElementById("modalXe")
    .addEventListener("hidden.bs.modal", function () {
      // Reset form khi modal đóng
      const form = document.getElementById("formXe");
      form.reset();
      idXe = -1;
      var bienso = document.getElementById("bienso");
      bienso.disabled = false;
    });

  document.getElementById("btnLuuXe").addEventListener("click", function () {
    if (tieude.textContent === "Thêm xe mới") {
      themXeMoi();
    } else {
      suaThongTinXe(idXe);
    }
  });
});

async function loadDSXe() {
  const dsXe = await layDSXe();

  const xeTableBody = document.querySelector("#vehicles-tab tbody");
  xeTableBody.innerHTML = "";

  dsXe.forEach((xe) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${xe.maxe}</td>
        <td>${xe.bienso}</td>
        <td>${xe.tenloai}</td>
        <td>${xe.tenxe}</td>
        <td>${xe.soghe}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1" id="btnSuaXe-${xe.maxe}">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" id="btnXoaXe-${xe.maxe}">
                <i class="bi bi-trash"></i>
            </button>
        </td>
      `;
    xeTableBody.appendChild(row);
    document
      .getElementById(`btnXoaXe-${xe.maxe}`)
      .addEventListener("click", async function () {
        var confirm = window.confirm(
          `Bạn có chắc chắn muốn xóa xe có biển số ${xe.bienso} không?`
        );
        if (confirm) {
          var response = await xoaXe(xe.maxe);
          if (response.message === "Xóa thành công") {
            loadDSXe();
            alert("Xóa thành công");
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
      });
    document
      .getElementById(`btnSuaXe-${xe.maxe}`)
      .addEventListener("click", function () {
        const modal = new bootstrap.Modal(document.getElementById("modalXe"));

        idXe = xe.maxe;
        modal.show();

        const tieude = document.getElementById("tieudeModalXe");
        tieude.textContent = "Sửa thông tin xe";
        loadDSLoaiXe_ModalXe();

        document
          .getElementById("modalXe")
          .addEventListener("shown.bs.modal", function () {
            if (idXe !== -1) {
              var loaixe = document.getElementById("loaixe");
              var options = loaixe.querySelectorAll("option");
              options.forEach(function (option) {
                if (option.textContent === xe.tenloai) {
                  option.selected = true;
                }
              });
              var bienso = document.getElementById("bienso");
              bienso.value = xe.bienso;
              bienso.disabled = true;
              var tenxe = document.getElementById("tenxe");
              tenxe.value = xe.tenxe;
            }
          });
      });
  });
}
async function loadDSLoaiXe() {
  const dsLoaixe = await layDSLoaiXe();

  const loaixeTableBody = document.querySelector("#vehicle-types-tab tbody");
  loaixeTableBody.innerHTML = "";

  dsLoaixe.forEach((lx) => {
    const row = document.createElement("tr");
    let nvs = "";
    if (lx.nvs === true) {
      nvs = "Có";
    } else {
      nvs = "Không";
    }
    row.innerHTML = `
        <td>${lx.maloaixe}</td>
        <td>${lx.tenloai}</td>
        <td>${lx.soluongghe}</td>
        <td>${nvs}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" id="btnXoaLoaiXe-${lx.maloaixe}">
                <i class="bi bi-trash"></i>
            </button>
        </td>
      `;
    loaixeTableBody.appendChild(row);
    document
      .getElementById(`btnXoaLoaiXe-${lx.maloaixe}`)
      .addEventListener("click", async function () {
        var confirm = window.confirm(
          `Bạn có chắc chắn muốn xóa loại xe ${lx.tenloai} không?`
        );
        if (confirm) {
          var response = await xoaLoaiXe(lx.maloaixe);
          if (response.message === "Xóa thành công") {
            loadDSLoaiXe();
            alert("Xóa thành công");
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
      });
  });
}
async function themXeMoi() {
  var bienso = document.getElementById("bienso").value;
  bienso = bienso.replace(/\s+/g, "");
  var loaixe = document.getElementById("loaixe").value;
  var tenxe = document.getElementById("tenxe").value;
  if (bienso && loaixe) {
    const response = await themXe(bienso, loaixe, tenxe);
    if (response.message === "Thêm thành công") {
      alert("Thêm xe mới thành công!");
      loadDSXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalXe")
      );
      modal.hide();
    } else {
      alert("Thêm xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}
async function loadDSLoaiXe_ModalXe() {
  const loaiXeSelect = document.getElementById("loaixe");
  const dsLoaiXe = await layDSLoaiXe();

  if (dsLoaiXe && Array.isArray(dsLoaiXe)) {
    loaiXeSelect.innerHTML =
      '<option value="" disabled selected>Chọn loại xe</option>';
    dsLoaiXe.forEach((lx) => {
      const option = document.createElement("option");
      option.value = lx.maloaixe;
      option.textContent = lx.tenloai;
      loaiXeSelect.appendChild(option);
    });
  }
}
async function suaThongTinXe(maXe) {
  var bienso = document.getElementById("bienso").value;
  bienso = bienso.replace(/\s+/g, "");
  var loaixe = document.getElementById("loaixe").value;
  var tenxe = document.getElementById("tenxe").value;

  if (bienso && loaixe) {
    const response = await suaXe(maXe, bienso, loaixe, tenxe);
    if (response.message === "Sửa thành công") {
      idXe = -1;
      alert("Sửa thông tin xe thành công!");
      loadDSXe();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalXe")
      );
      modal.hide();
    } else {
      alert("Sửa thông tin xe thất bại vì " + response.message);
    }
  } else {
    alert("Vui lòng nhập và chọn đủ thông tin!!!");
  }
}

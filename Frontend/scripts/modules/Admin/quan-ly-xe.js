import { layDSXe, xoaXe } from "../../api/xe-API.js";
import { layDSLoaiXe, xoaLoaiXe } from "../../api/loai-xe-API.js";
document.addEventListener("DOMContentLoaded", async function () {
  const btnThemXe = document.getElementById("btnThemXe");
  const btnThemLoaiXe = document.getElementById("btnThemLoaiXe");
  const xeLink = document.getElementById("link-xe");
  const loaixeLink = document.getElementById("link-loaixe");

  loadDSXe();

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
        <td>${xe.soghe}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1">
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
            alert("Xóa thành công");
            loadDSXe();
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
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
            alert("Xóa thành công");
            loadDSLoaiXe();
          } else {
            alert("Xóa thất bại vì " + response.message);
          }
        }
      });
  });
}

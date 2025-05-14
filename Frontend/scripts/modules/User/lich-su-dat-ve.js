import { layDSDatVeCuaKhachHang } from "../../api/dat-ve-API.js";
import { dinhDangNgay, dinhDangGio } from "../../utils/dateUtil.js";
document.addEventListener("DOMContentLoaded", function () {
  loadDSDatVe();
});

async function loadDSDatVe() {
  var maKH = localStorage.getItem("maKH");
  if (maKH) {
    const dsDatVe = await layDSDatVeCuaKhachHang(maKH);
    if ("message" in dsDatVe) {
      alert(dsDatVe.message);
      return;
    }
    const tableDatVe = document.querySelector("#tableDatVe tbody");
    tableDatVe.innerHTML = "";
    dsDatVe.forEach((dv) => {
      const row = document.createElement("tr");
      let tuyenduong = dv.bendi + " - " + dv.benden;
      let ngaydi = dinhDangNgay(dv.ngaydi);
      let giodi = dinhDangGio(dv.ngaydi);
      let thanhtoan = dv.pttt !== null ? dv.pttt : "";
      row.innerHTML = `
        <td><strong>${dv.madatve}</strong></td>
        <td>${dv.soluong}</td>
        <td>${tuyenduong}</td>
        <td>
            <div>
                <p class="mb-0 fw-medium">${ngaydi}</p>
                <small class="text-muted">${giodi}</small>
            </div>
        </td>
        <td>${dv.sotien}</td>
        <td>${thanhtoan}</td>
        <td>${dv.trangthai}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary me-1" id="btnSuaChuyenXe-${dv.madatve}">
                <i class="fa-solid fa-eye"></i>
            </button>
        </td>
      `;
      tableDatVe.appendChild(row);
    });
  }
}

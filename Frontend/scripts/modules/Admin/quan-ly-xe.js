document.addEventListener("DOMContentLoaded", function () {
  const btnThemXe = document.getElementById("btnThemXe");
  const btnThemLoaiXe = document.getElementById("btnThemLoaiXe");
  const xeLink = document.getElementById("link-xe");
  const loaixeLink = document.getElementById("link-loaixe");

  loaixeLink.addEventListener("click", function () {
    btnThemLoaiXe.style.display = "block";
    btnThemXe.style.display = "none";
  });
  xeLink.addEventListener("click", function () {
    btnThemLoaiXe.style.display = "none";
    btnThemXe.style.display = "block";
  });
});

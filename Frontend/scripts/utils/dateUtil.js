export function setDefaultDate(inputSelector) {
  const ngayDiInput = document.querySelector(inputSelector);

  if (!ngayDiInput) {
    console.error(`Không tìm thấy phần tử với selector: ${inputSelector}`);
    return;
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  ngayDiInput.value = formattedDate;
}

export function dinhDangNgay(ngayStr) {
  var date = new Date(ngayStr);
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  var formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export function dinhDangGio(ngayStr) {
  var date = new Date(ngayStr);
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

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

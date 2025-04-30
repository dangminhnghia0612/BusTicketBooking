/**
 * Gọi API TimChuyenXe để lấy danh sách chuyến xe
 * @param {string} departure - Điểm đi
 * @param {string} destination - Điểm đến
 * @param {string} date - Ngày đi (định dạng yyyy-MM-dd)
 * @param {number} ticketCount - Số lượng vé
 * @returns {Promise<object[]>} - Danh sách chuyến xe
 */
async function TimChuyenXe_API(departure, destination, date, ticketCount) {
  const apiUrl = "https://localhost:7054/api/Chuyenxe/TimChuyenXe";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Diemdi: departure,
        Diemden: destination,
        Ngaydi: date,
        Soluongve: ticketCount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Message || "Lỗi khi gọi API");
    }

    const data = await response.json();
    return data; // Trả về danh sách chuyến xe
  } catch (error) {
    throw error;
  }
}

export { TimChuyenXe_API };

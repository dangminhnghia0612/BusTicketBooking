export async function TimChuyenXe_API(
  departure,
  destination,
  date,
  ticketCount
) {
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

export async function layDSChuyenXe() {
  try {
    const response = await fetch("https://localhost:7054/api/Chuyenxe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách chuyến xe:", error);
    return [];
  }
}

export async function xoaChuyenXe(machuyen) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Chuyenxe/${machuyen}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa chuyến xe:", error);
  }
}
export async function themChuyenXe(maTuyenXe, maXe, gioDi) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Chuyenxe/ThemChuyenXe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maTuyenxe: maTuyenXe,
          maXe: maXe,
          giodi: gioDi,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm chuyến xe:", error);
  }
}

export async function suaChuyenXe(maChuyenxe, maTuyenXe, maXe, gioDi) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Chuyenxe/${maChuyenxe}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maTuyenxe: maTuyenXe,
          maXe: maXe,
          giodi: gioDi,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin chuyến xe:", error);
  }
}

export async function timChuyenXe(maChuyen) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Chuyenxe/tim-chuyen-xe/${maChuyen}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm chuyến xe:", error);
  }
}

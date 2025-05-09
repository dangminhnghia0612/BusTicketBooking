export async function laySoDoGhe(maChuyenxe) {
  try {
    const response = await fetch(
      "https://localhost:7054/api/Loaixe/laySoDoGhe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maChuyenxe),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.error("Lỗi khi gọi API:", error);
      return null;
    }

    const result = await response.json();

    const sodogheObject = JSON.parse(result.sodoghe);

    return sodogheObject;
  } catch (error) {
    console.error("Lỗi fetch:", error);
    return null;
  }
}

export async function layDSLoaiXe() {
  try {
    const response = await fetch("https://localhost:7054/api/Loaixe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi gọi API: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách xe:", error);
    return [];
  }
}
export async function xoaLoaiXe(maloaixe) {
  try {
    const response = await fetch(
      `https://localhost:7054/api/Loaixe/${maloaixe}`,
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
    console.error("Lỗi khi xóa loại xe:", error);
  }
}

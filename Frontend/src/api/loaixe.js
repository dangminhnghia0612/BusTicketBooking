export async function layDSLoaiXe() {
  try {
    const response = await fetch("https://localhost:7057/api/Loaixe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch api loại xe:", error);
    return [];
  }
}

export async function xoaLoaiXe(maLoaiXe) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Loaixe/${maLoaiXe}`,
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
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function themLoaiXe(formData) {
  try {
    const response = await fetch(`https://localhost:7057/api/Loaixe`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

export async function suaLoaiXe(id, formData) {
  try {
    const response = await fetch(`https://localhost:7057/api/Loaixe/${id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API loại xe:", error);
  }
}

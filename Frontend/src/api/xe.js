export async function layDSXe() {
  try {
    const response = await fetch("https://localhost:7057/api/Xe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
    return [];
  }
}

export async function xoaXe(maXe) {
  try {
    const response = await fetch(`https://localhost:7057/api/Xe/${maXe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
  }
}

export async function themXe(xe) {
  try {
    const response = await fetch(`https://localhost:7057/api/Xe/ThemXe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maLoaixe: xe.maloai,
        maBenxe: xe.mabenxe,
        bienso: xe.bienso,
        ten: xe.tenxe,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API xe:", error);
  }
}

export async function suaXe(xe) {
  try {
    const response = await fetch(`https://localhost:7057/api/Xe/${xe.maxe}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maLoaixe: xe.maloai,
        maBenxe: xe.mabenxe,
        bienso: xe.bienso,
        ten: xe.tenxe,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi sửa thông tin xe:", error);
  }
}

export async function layDSXeTheoNoiDau(maBenXe) {
  try {
    const response = await fetch(
      `https://localhost:7057/api/Xe/layXeTheoNoiDau/${maBenXe}`,
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
    console.error("Lỗi fetch API xe:", error);
    return [];
  }
}

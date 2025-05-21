export async function adminLogin(username, password) {
  try {
    const response = await fetch(
      "https://localhost:7057/api/Quantrivien/Dangnhap",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tendangnhap: username,
          matkhau: password,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetch API đăng nhập:", error);
    throw error;
  }
}

export async function dangnhap(tendangnhap, matkhau) {
  const response = await fetch(
    "https://localhost:7054/api/Quantrivien/Dangnhap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Tendangnhap: tendangnhap,
        Matkhau: matkhau,
      }),
    }
  );
  return response.json();
}

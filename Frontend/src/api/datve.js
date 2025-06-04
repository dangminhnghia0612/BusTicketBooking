export async function sendDatVeRequest(datVeRequest) {
  try {
    // Gửi yêu cầu POST đến API
    const response = await fetch("https://localhost:7057/api/Datve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datVeRequest),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch API đặt vé:", error);
    return null;
  }
}

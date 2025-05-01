async function sendDatVeRequest(datVeRequest) {
  try {
    // Gửi yêu cầu POST đến API
    const response = await fetch("https://localhost:7054/api/Datve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datVeRequest),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}
export { sendDatVeRequest };

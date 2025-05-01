async function layDSGheDaDat(maChuyenxe) {
  try {
    const response = await fetch(
      "https://localhost:7054/api/Ghe/layDSGheDaDat",
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

    return result;
  } catch (error) {
    console.error("Lỗi fetch API:", error);
    return null;
  }
}

export { layDSGheDaDat };

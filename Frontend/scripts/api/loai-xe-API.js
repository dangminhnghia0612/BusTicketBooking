async function laySoDoGhe(maChuyenxe) {
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
export { laySoDoGhe };

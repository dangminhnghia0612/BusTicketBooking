USE QLBanVeXe
GO

CREATE TRIGGER ThemGheTuDong
ON Xe
AFTER INSERT
AS
BEGIN

    DECLARE @Ma_Xe INT
    DECLARE @Ma_Loaixe INT
    DECLARE @Sodoghe NVARCHAR(MAX)

    -- Giả sử chỉ insert 1 bus tại 1 thời điểm
    SELECT 
        @Ma_Xe = Ma_Xe,
        @Ma_Loaixe = Ma_Loaixe
    FROM INSERTED

    -- Lấy layout JSON từ BUS_TYPE
    SELECT 
        @Sodoghe = Sodoghe
    FROM Loaixe
    WHERE Ma_Loaixe = @Ma_Loaixe

    -- Insert ghế từ layout
    INSERT INTO Ghe(Ma_Xe, Soghe, Tang, Day)
    SELECT 
        @Ma_Xe,
        ghe.value AS Soghe,
        JSON_VALUE(tang.value, '$.tang') AS Tang,
        JSON_VALUE(day.value, '$.dayso') AS Day
    FROM OPENJSON(@Sodoghe) AS tang
    CROSS APPLY OPENJSON(tang.value, '$.cacday') AS day
    CROSS APPLY OPENJSON(day.value, '$.soghe') AS ghe
END
GO

CREATE PROC sp_TimChuyenXe
    @TinhDi NVARCHAR(100),
    @TinhDen NVARCHAR(100),
    @NgayDi DATE,
	@Soluongve INT
AS
BEGIN
	SELECT 
		  cx.Ma_Chuyenxe,
		  cx.Giodi,
		  cx.Gioden,
		  tx.Khoangthoigian,
		  tx.Giave,
		  bd.Tenbenxe as Diemdi,
		  bden.Tenbenxe as Diemden,
		  lx.Tenloai,
		  COUNT(CASE WHEN g.Trangthai = 0 THEN 1 END) AS SoGheConTrong
	FROM Chuyenxe cx
	JOIN Tuyenxe tx ON cx.Ma_Tuyenxe = tx.Ma_Tuyenxe
	JOIN Benxe bd ON tx.Ma_Diemdi = bd.Ma_Benxe
	JOIN Quan qd ON bd.Ma_Quan = qd.Ma_Quan
	JOIN Tinh td ON qd.Ma_Tinh = td.Ma_Tinh
	JOIN Benxe bden ON tx.Ma_Diemden = bden.Ma_Benxe
	JOIN Quan qden ON bden.Ma_Quan = qden.Ma_Quan
	JOIN Tinh tden ON qden.Ma_Tinh = tden.Ma_Tinh
	JOIN Xe xe ON cx.Ma_Xe = xe.Ma_Xe
	JOIN Loaixe lx on lx.Ma_Loaixe = Xe.Ma_Loaixe
	JOIN Ghe g ON g.Ma_Xe = xe.Ma_Xe
	WHERE td.Ten = @TinhDi AND tden.Ten = @TinhDen AND CAST(cx.Giodi AS DATE) = @NgayDi
	GROUP BY cx.Ma_Chuyenxe, cx.Giodi, cx.Gioden, tx.Khoangthoigian, tx.Giave, bd.Tenbenxe, bden.Tenbenxe, lx.Tenloai
	HAVING COUNT(CASE WHEN g.Trangthai = 0 THEN 1 END) >= @Soluongve;
END
GO

CREATE PROC sp_XoaToken
AS
BEGIN
    UPDATE Khachhang
    SET Token = NULL
    WHERE Ma_Tinhtrang = 1 AND (Token IS NOT NULL) AND DATEDIFF(MINUTE, Ngaytao, GETDATE()) >= 5;
END

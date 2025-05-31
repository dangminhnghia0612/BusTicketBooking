USE QLBanVeXe
GO

CREATE TRIGGER tg_ThemGheTuDong
ON Xe
AFTER INSERT
AS
BEGIN

    DECLARE @Ma_Xe INT
    DECLARE @Ma_Loaixe INT
    DECLARE @Sodoghe NVARCHAR(MAX)

   
    SELECT 
        @Ma_Xe = Ma_Xe,
        @Ma_Loaixe = Ma_Loaixe
    FROM INSERTED

    
    SELECT 
        @Sodoghe = Sodoghe
    FROM Loaixe
    WHERE Ma_Loaixe = @Ma_Loaixe
    
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


CREATE TRIGGER tg_Chuyenxe_ThemChitietghe
ON Chuyenxe
AFTER INSERT
AS
BEGIN
    INSERT INTO Chitietghe (Ma_Chuyenxe, Ma_Ghe, Trangthai)
    SELECT 
        i.Ma_Chuyenxe,
        g.Ma_Ghe,
        0
    FROM inserted i
    JOIN Xe x ON i.Ma_Xe = x.Ma_Xe
    JOIN Ghe g ON x.Ma_Xe = g.Ma_Xe
    WHERE NOT EXISTS (
        SELECT 1 FROM Chitietghe ctg 
        WHERE ctg.Ma_Chuyenxe = i.Ma_Chuyenxe AND ctg.Ma_Ghe = g.Ma_Ghe
    )
END
GO

ALTER PROC sp_TimChuyenXe
    @MaTinhDi int,
    @MaTinhDen int,
    @NgayDi DATE,
	@Soluongve INT
AS
BEGIN
	select cx.Ma_Chuyenxe, cx.Giodi, cx.Gioden, txv1.Khoangthoigian, txv1.Khoangcach, txv1.Giave, txv1.Tenbenxe as Bendi,
	 (
            SELECT TOP 1 Tenbenxe
            FROM TuyenxeView txv3
            WHERE txv3.Ma_Tuyenxe = cx.Ma_Tuyenxe
            ORDER BY Thutu DESC
     ) as Benden,
	l.Tenloai,
	COUNT(CASE WHEN ctg.Trangthai = 0 THEN 1 END) AS SoGheConTrong
	from Chuyenxe cx join TuyenxeView txv1 on cx.Ma_Tuyenxe = txv1.Ma_Tuyenxe
					 join TuyenxeView txv2 on cx.Ma_Tuyenxe = txv2.Ma_Tuyenxe
					 join Chitietghe ctg  on cx.Ma_Chuyenxe = ctg.Ma_Chuyenxe
					 join Xe x on cx.Ma_Xe = x.Ma_Xe
					 join Loaixe l on x.Ma_Loaixe = l.Ma_Loaixe
	where txv1.Ma_Tinh = @MaTinhDi AND txv1.Thutu = 1 AND
		  txv2.Ma_Tinh = @MaTinhDen AND txv2.Thutu <> 1 AND
		  CAST(cx.Giodi AS DATE) = @NgayDi
	group by cx.Ma_Chuyenxe, cx.Giodi, cx.Gioden, txv1.Khoangthoigian, txv1.Khoangcach, txv1.Giave,  txv1.Tenbenxe, l.Tenloai, cx.Ma_Tuyenxe
	having COUNT(CASE WHEN ctg.Trangthai = 0 THEN 1 END) >= @Soluongve
	ORDER BY cx.Giodi;
END
GO

CREATE PROC sp_XoaKhachHang
AS
BEGIN
    DELETE FROM Khachhang
    WHERE Ma_Trangthai = 1 AND (Token IS NOT NULL) AND DATEDIFF(MINUTE, Ngaytao, GETDATE()) >= 5;
END
GO

CREATE PROCEDURE sp_HetHanThanhToan
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DanhSach TABLE (MaDatve INT);

    INSERT INTO @DanhSach (MaDatve)
    SELECT Ma_Datve
    FROM Datve
    WHERE Ma_Tinhtrang = 1 AND DATEDIFF(MINUTE, Ngaydat, GETDATE()) > 16;

    UPDATE Datve
    SET Ma_Tinhtrang = 2
    WHERE Ma_Datve IN (SELECT MaDatve FROM @DanhSach);

    UPDATE Chitietghe
    SET Trangthai = 0
    FROM Chitietghe ctg
    JOIN Vexe vx ON vx.Ma_Chitietghe = ctg.Ma_Chitietghe
    JOIN @DanhSach d ON d.MaDatve = vx.Ma_Datve;

    DELETE FROM Vexe
    WHERE Ma_Datve IN (SELECT MaDatve FROM @DanhSach);
END
GO
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

--CREATE PROC sp_TimChuyenXe
--    @TinhDi NVARCHAR(100),
--    @TinhDen NVARCHAR(100),
--    @NgayDi DATE,
--	@Soluongve INT
--AS
--BEGIN
--	SELECT 
--		  cx.Ma_Chuyenxe,
--		  cx.Giodi,
--		  cx.Gioden,
--		  tx.Khoangthoigian,
--		  tx.Giave,
--		  bd.Tenbenxe as Diemdi,
--		  bden.Tenbenxe as Diemden,
--		  lx.Tenloai,
--		  COUNT(CASE WHEN ctg.Trangthai = 0 THEN 1 END) AS SoGheConTrong
--	FROM Chuyenxe cx
--	JOIN Tuyenxe tx ON cx.Ma_Tuyenxe = tx.Ma_Tuyenxe
--	JOIN Benxe bd ON tx.Ma_Diemdi = bd.Ma_Benxe
--	JOIN Quan qd ON bd.Ma_Quan = qd.Ma_Quan
--	JOIN Tinh td ON qd.Ma_Tinh = td.Ma_Tinh
--	JOIN Benxe bden ON tx.Ma_Diemden = bden.Ma_Benxe
--	JOIN Quan qden ON bden.Ma_Quan = qden.Ma_Quan
--	JOIN Tinh tden ON qden.Ma_Tinh = tden.Ma_Tinh
--	JOIN Xe xe ON cx.Ma_Xe = xe.Ma_Xe
--	JOIN Loaixe lx on lx.Ma_Loaixe = Xe.Ma_Loaixe
--	JOIN Ghe g ON g.Ma_Xe = xe.Ma_Xe
--	JOIN Chitietghe ctg on ctg.Ma_Chuyenxe = cx.Ma_Chuyenxe and ctg.Ma_Ghe = g.Ma_Ghe
--	WHERE td.Ten = @TinhDi AND tden.Ten = @TinhDen AND CAST(cx.Giodi AS DATE) = @NgayDi
--	GROUP BY cx.Ma_Chuyenxe, cx.Giodi, cx.Gioden, tx.Khoangthoigian, tx.Giave, bd.Tenbenxe, bden.Tenbenxe, lx.Tenloai
--	HAVING COUNT(CASE WHEN ctg.Trangthai = 0 THEN 1 END) >= @Soluongve
--	ORDER BY cx.Giodi;
--END
--GO

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
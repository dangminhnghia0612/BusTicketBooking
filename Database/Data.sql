USE QLBanVeXe
GO

-- RESET AUTO_INCREAMENT
IF exists (SELECT * FROM Quantrivien)				DBCC CHECKIDENT (Quantrivien, RESEED, 0)
IF exists (SELECT * FROM Bieungu)					DBCC CHECKIDENT (Bieungu, RESEED, 0)
IF exists (SELECT * FROM Apdungkhuyenmai)			DBCC CHECKIDENT (Apdungkhuyenmai, RESEED, 0)
IF exists (SELECT * FROM Datve)						DBCC CHECKIDENT (Datve, RESEED, 0)
IF exists (SELECT * FROM Thongtinnhaxe)				DBCC CHECKIDENT (Thongtinnhaxe, RESEED, 0)
IF exists (SELECT * FROM Loaixe)					DBCC CHECKIDENT (Loaixe, RESEED, 0)
IF exists (SELECT * FROM Xe)						DBCC CHECKIDENT (Xe, RESEED, 0)
IF exists (SELECT * FROM Chinhsachhuyve)			DBCC CHECKIDENT (Chinhsachhuyve, RESEED, 0)
IF exists (SELECT * FROM Huydatve)					DBCC CHECKIDENT (Huydatve, RESEED, 0)
IF exists (SELECT * FROM Tintuc)					DBCC CHECKIDENT (Tintuc, RESEED, 0)
IF exists (SELECT * FROM Phuongthucthanhtoan)		DBCC CHECKIDENT (Phuongthucthanhtoan, RESEED, 0)
IF exists (SELECT * FROM Lichsuthanhtoan)			DBCC CHECKIDENT (Lichsuthanhtoan, RESEED, 0)
IF exists (SELECT * FROM Loaikhuyenmai)				DBCC CHECKIDENT (Loaikhuyenmai, RESEED, 0)
IF exists (SELECT * FROM Khuyenmai)					DBCC CHECKIDENT (Khuyenmai, RESEED, 0)
IF exists (SELECT * FROM Lydohuydatve)				DBCC CHECKIDENT (Lydohuydatve, RESEED, 0)
IF exists (SELECT * FROM Tuyenxe)					DBCC CHECKIDENT (Tuyenxe, RESEED, 0)
IF exists (SELECT * FROM Ghe)						DBCC CHECKIDENT (Ghe, RESEED, 0)
IF exists (SELECT * FROM Benxe)						DBCC CHECKIDENT (Benxe, RESEED, 0)
IF exists (SELECT * FROM Tinhtrangdatve)			DBCC CHECKIDENT (Tinhtrangdatve, RESEED, 0)
IF exists (SELECT * FROM Trangthaikhachhang)		DBCC CHECKIDENT (Trangthaikhachhang, RESEED, 0)
IF exists (SELECT * FROM Vexe)						DBCC CHECKIDENT (Vexe, RESEED, 0)
IF exists (SELECT * FROM Chuyenxe)					DBCC CHECKIDENT (Chuyenxe, RESEED, 0)
IF exists (SELECT * FROM Khachhang)					DBCC CHECKIDENT (Khachhang, RESEED, 0)
IF exists (SELECT * FROM Vaitro)					DBCC CHECKIDENT (Vaitro, RESEED, 0)
IF exists (SELECT * FROM Chitietghe)				DBCC CHECKIDENT (Chitietghe, RESEED, 0)
IF exists (SELECT * FROM Lotrinh)				    DBCC CHECKIDENT (Chitietghe, RESEED, 0)

-- DELETE DATA FROM TABLES
DELETE FROM Lotrinh
DELETE FROM Vexe
DELETE FROM Apdungkhuyenmai
DELETE FROM Huydatve
DELETE FROM Lichsuthanhtoan
DELETE FROM Chitietghe
DELETE FROM Datve
DELETE FROM Chuyenxe
DELETE FROM Tuyenxe
DELETE FROM Khuyenmai
DELETE FROM Benxe
DELETE FROM Ghe
DELETE FROM Thongtinnhaxe
DELETE FROM Bieungu
DELETE FROM Tintuc
DELETE FROM Khachhang
DELETE FROM Chinhsachhuyve
DELETE FROM Quantrivien
DELETE FROM Quan
DELETE FROM Xe
DELETE FROM Trangthaikhachhang
DELETE FROM Vaitro
DELETE FROM Lydohuydatve
DELETE FROM Loaikhuyenmai
DELETE FROM Tinhtrangdatve
DELETE FROM Phuongthucthanhtoan
DELETE FROM Tinh
DELETE FROM Loaixe


INSERT INTO Vaitro(Ten, Mota) VALUES
('Admin',N'Quản trị viên'),      
('User', N'Khách hàng');


INSERT INTO Trangthaikhachhang(Ten) VALUES
(N'Chưa kích hoạt'),  
(N'Đã kích hoạt'),  
(N'Khóa tài khoản');  


INSERT INTO Khachhang(Ma_Vaitro, Ma_Trangthai, Sodienthoai, Matkhau, Email, Hoten, Token, Gioitinh, Ngaysinh, Diachi, Nghenghiep, Anh, Ghichu, Ngaytao, Ngaycapnhat, Dangnhapcuoi) VALUES
-- Khách hàng thường
(2, 2, '+84912345678', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'user1@gmail.com', N'Nguyễn Văn Hải'  , NULL, 1, '1990-05-15', N'123 Đường Lê Lợi, Q.1, TP.HCM'			   , N'Kỹ sư'		  , NULL, NULL, GETDATE(), GETDATE(), GETDATE()),
(2, 2, '+84911111111', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'user2@gmail.com', N'Trần Văn Nam'    , NULL, 1, '1988-04-12', N'12 Đường Lê Duẩn, Q.1, TP.HCM'			   , N'Kế toán'		  , NULL, NULL, GETDATE(), GETDATE(), GETDATE()),
(2, 2, '+84922222222', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'user3@gmail.com', N'Nguyễn Thị Hương', NULL, 0, '1992-07-25', N'34 Đường Nguyễn Thị Minh Khai, Q.3, TP.HCM', N'Giáo viên'	  , NULL, NULL, GETDATE(), GETDATE(), GETDATE()),
(2, 2, '+84933333333', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'user4@gmail.com', N'Lê Minh Tuấn'	   , NULL, 1, '1985-11-30', N'56 Đường Cách Mạng Tháng 8, Q.10, TP.HCM'  , N'Lập trình viên', NULL, NULL, GETDATE(), GETDATE(), GETDATE()),
(2, 2, '+84944444444', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'user5@gmail.com', N'Phạm Thị Mai'	   , NULL, 0, '1990-02-14', N'78 Đường Lý Thường Kiệt, Q.11, TP.HCM'	   , N'Y tá'		  , NULL, NULL, GETDATE(), GETDATE(), GETDATE()),
-- Tài khoản bị khóa
(2, 3, '+84965874123', '$2b$10$U3aVZRl4mhWYPoDcy7eGxu.fF4H4sYvqgK2DrXhDYMKZUZKys3H9m', 'banneduser@gmail.com', N'Hoàng Văn E', NULL, 1, '1978-07-10', N'654 Đường 3/2, Q.10, TP.HCM', N'Kinh doanh', NULL, N'Vi phạm điều khoản sử dụng', GETDATE(), GETDATE(), GETDATE());

INSERT INTO Quantrivien(Ma_Vaitro, Tendangnhap, Matkhau, Sodienthoai, Hoten, Anh, Ngaytao, Ngaycapnhat) VALUES
(1, 'admin', '$2a$11$9e6oydpab.0SaL/hwqEUvOBsqfNrEWKun6Dw5iAgQUNPLT90eV22G', '+84901234567', N'Đặng Minh Nghĩa', NULL, GETDATE(), GETDATE());


INSERT INTO Thongtinnhaxe(Ma_Quantrivien, Ten, Mota, Ngaytao, Ngaycapnhat) VALUES
(1, N'Company Name', N'CÔNG TY CỔ PHẦN XE KHÁCH MINH NGHĨA - MINH NGHĨA BUS', GETDATE(), GETDATE()),
(1, N'Address', N'180 Cao Lỗ, Phường 4, Quận 8, Tp. Hồ Chí Minh', GETDATE(), GETDATE()),
(1, N'Email', N'DH52111357@student.stu.edu.vn', GETDATE(), GETDATE()),
(1, N'Phone Number', N'(028) 38 505 520', GETDATE(), GETDATE()),
(1, N'Fax', N'(84.8) 3850 6595', GETDATE(), GETDATE());


INSERT INTO Loaixe(Tenloai, Soluongghe, Nhavesinh, Anh, Sodoghe) VALUES
(N'Xe giường nằm đôi 22 chỗ', 22, 1, NULL, '[
									  {
										"tang": 1,
										"cacday": [
										  { "dayso": 1, "soghe": ["A1","A3","A5","A7","A9"] },
										  { "dayso": 2, "soghe": ["B1","B3","B5","B7","B9"] }
										]
									  },
									  {
										"tang": 2,
										"cacday": [
										  { "dayso": 1, "soghe": ["A2","A4","A6","A8","A10","A12"] },
										  { "dayso": 2, "soghe": ["B2","B4","B6","B8","B10","B12"] }
										]
									  }
									]'),
(N'Xe giường phòng 22 chỗ', 22, 1, NULL, '[
									  {
										"tang": 1,
										"cacday": [
										  { "dayso": 1, "soghe": ["A1","A3","A5","A7","A9"] },
										  { "dayso": 2, "soghe": ["B1","B3","B5","B7","B9"] }
										]
									  },
									  {
										"tang": 2,
										"cacday": [
										  { "dayso": 1, "soghe": ["A2","A4","A6","A8","A10","A12"] },
										  { "dayso": 2, "soghe": ["B2","B4","B6","B8","B10","B12"] }
										]
									  }
									]'),
(N'Xe giường nằm 34 chỗ', 34, 0, NULL, '[
									  {
										"tang": 1,
										"cacday": [
										  { "dayso": 1, "soghe": ["A1","A3","A5","A7","A9","A11"] },
										  { "dayso": 2, "soghe": ["B1","B3","B5","B7","B9"] },
										  { "dayso": 3, "soghe": ["C1","C3","C5","C7","C9","C11"] }
										]
									  },
									  {
										"tang": 2,
										"cacday": [
										  { "dayso": 1, "soghe": ["A2","A4","A6","A8","A10","A12"] },
										  { "dayso": 2, "soghe": ["B2","B4","B6","B8","B10"] },
										  { "dayso": 3, "soghe": ["C2","C4","C6","C8","C10","C12"] }
										]
									  }
									]'),
(N'Xe giường nằm 40 chỗ', 40, 0, NULL, '[
									  {
										"tang": 1,
										"cacday": [
										  { "dayso": 1, "soghe": ["A1","A3","A5","A7","A9"] },
										  { "dayso": 2, "soghe": ["B1","B3","B5","B7","B9"] },
										  { "dayso": 3, "soghe": ["C1","C3","C5","C7","C9"] },
										  { "dayso": 4, "soghe": ["A11","A13","B11","C13","C11"] }
										]
									  },
									  {
										"tang": 2,
										"cacday": [
										  { "dayso": 1, "soghe": ["A2","A4","A6","A8","A10"] },
										  { "dayso": 2, "soghe": ["B2","B4","B6","B8","B10"] },
										  { "dayso": 3, "soghe": ["C2","C4","C6","C8","C10"] },
										  { "dayso": 4, "soghe": ["A12","A14","B12","C14","C12"] }
										]
									  }
									]');



INSERT INTO Phuongthucthanhtoan(Ten) VALUES 
(N'VnPay'), 
(N'MoMo'), 
(N'ShopeePay'),
(N'ZaloPay'),
(N'Viettel Money'),
(N'Viet QR'),
(N'Thẻ ATM nội địa'),
(N'Thẻ Visa/Master/JCB');


INSERT INTO Tinhtrangdatve(Ten) VALUES 
(N'Chờ thanh toán'), 
(N'Hết hạn'), 
(N'Hủy'),
(N'Thành công');

INSERT INTO Chinhsachhuyve(Ma_Quantrivien, Ten, Mota, Sogiotruockhoihanh, Phantram, Kichhoat, Ngaytao, Ngaycapnhat) VALUES
(1, N'Hủy trước 4 giờ', N'Hoàn 90% tiền vé', 4, 90.00, 1, GETDATE(), GETDATE()),
(1, N'Hủy sau 4 giờ', N'Không thể hủy', 4, 0.00, 1, GETDATE(), GETDATE());


INSERT INTO Lydohuydatve(Mota) VALUES
(N'Phương tiện không phù hợp'),
(N'Thời gian không khớp'),
(N'Người đi cùng hủy kế hoạch'),
(N'Yêu cầu đặc biệt không được đáp ứng'),
(N'Thời tiết xấu'),
(N'Sự kiện khẩn cấp');


INSERT INTO Loaikhuyenmai(Ten, Mota) VALUES
(N'Fixed',N'Cố định'),
(N'Percentage',N'Phần trăm');

INSERT INTO Tinh(Ma_Tinh, CODE, Ten) VALUES
(1, 'ha-noi', N'Hà Nội'),
(2, 'tp-hcm', N'TP. Hồ Chí Minh'),
(5, 'hai-phong', N'Hải Phòng'),
(4, 'da-nang', N'Đà Nẵng'),
(6, 'an-giang', N'An Giang'),
(7, 'ba-ria-vung-tau', N'Bà Rịa - Vũng Tàu'),
(13, 'binh-duong', N'Bình Dương'),
(15, 'binh-phuoc', N'Bình Phước'),
(16, 'binh-thuan', N'Bình Thuận'),
(14, 'binh-dinh', N'Bình Định'),
(8, 'bac-lieu', N'Bạc Liêu'),
(10, 'bac-giang', N'Bắc Giang'),
(9, 'bac-kan', N'Bắc Kạn'),
(11, 'bac-ninh', N'Bắc Ninh'),
(12, 'ben-tre', N'Bến Tre'),
(18, 'cao-bang', N'Cao Bằng'),
(17, 'ca-mau', N'Cà Mau'),
(3, 'can-tho', N'Cần Thơ'),
(24, 'gia-lai', N'Gia Lai'),
(25, 'ha-giang', N'Hà Giang'),
(26, 'ha-nam', N'Hà Nam'),
(27, 'ha-tinh', N'Hà Tĩnh'),
(30, 'hoa-binh', N'Hòa Bình'),
(28, 'hai-duong', N'Hải Dương'),
(29, 'hau-giang', N'Hậu Giang'),
(31, 'hung-yen', N'Hưng Yên'),
(32, 'khanh-hoa', N'Khánh Hòa'),
(33, 'kien-giang', N'Kiên Giang'),
(34, 'kon-tum', N'Kon Tum'),
(35, 'lai-chau', N'Lai Châu'),
(38, 'lao-cai', N'Lào Cai'),
(36, 'lam-dong', N'Lâm Đồng'),
(37, 'lang-son', N'Lạng Sơn'),
(39, 'long-an', N'Long An'),
(40, 'nam-dinh', N'Nam Định'),
(41, 'nghe-an', N'Nghệ An'),
(42, 'ninh-binh', N'Ninh Bình'),
(43, 'ninh-thuan', N'Ninh Thuận'),
(44, 'phu-tho', N'Phú Thọ'),
(45, 'phu-yen', N'Phú Yên'),
(46, 'quang-binh', N'Quảng Bình'),
(47, 'quang-nam', N'Quảng Nam'),
(48, 'quang-ngai', N'Quảng Ngãi'),
(49, 'quang-ninh', N'Quảng Ninh'),
(50, 'quang-tri', N'Quảng Trị'),
(51, 'soc-trang', N'Sóc Trăng'),
(52, 'son-la', N'Sơn La'),
(53, 'tay-ninh', N'Tây Ninh'),
(56, 'thanh-hoa', N'Thanh Hóa'),
(54, 'thai-binh', N'Thái Bình'),
(55, 'thai-nguyen', N'Thái Nguyên'),
(57, 'thua-thien-hue', N'Thừa Thiên Huế'),
(58, 'tien-giang', N'Tiền Giang'),
(59, 'tra-vinh', N'Trà Vinh'),
(60, 'tuyen-quang', N'Tuyên Quang'),
(61, 'vinh-long', N'Vĩnh Long'),
(62, 'vinh-phuc', N'Vĩnh Phúc'),
(63, 'yen-bai', N'Yên Bái'),
(19, 'dak-lak', N'Đắk Lắk'),
(22, 'dong-nai', N'Đồng Nai'),
(23, 'dong-thap', N'Đồng Tháp'),
(21, 'dien-bien', N'Điện Biên'),
(20, 'dak-nong', N'Đắk Nông');


INSERT INTO Quan (Ma_Quan, Code, Ten, Ma_Tinh) VALUES
(1,'quan-ba-dinh',N'Quận Ba Đình',1),
(2,'quan-hoan-kiem',N'Quận Hoàn Kiếm',1),
(3,'quan-tay-ho',N'Quận Tây Hồ',1),
(4,'quan-long-bien',N'Quận Long Biên',1),
(5,'quan-cau-giay',N'Quận Cầu Giấy',1),
(6,'quan-dong-da',N'Quận Đống Đa',1),
(7,'quan-hai-ba-trung',N'Quận Hai Bà Trưng',1),
(8,'quan-hoang-mai',N'Quận Hoàng Mai',1),
(9,'quan-thanh-xuan',N'Quận Thanh Xuân',1),
(10,'huyen-soc-son',N'Huyện Sóc Sơn',1),
(11,'huyen-dong-anh',N'Huyện Đông Anh',1),
(12,'huyen-gia-lam',N'Huyện Gia Lâm',1),
(13,'quan-nam-tu-liem',N'Quận Nam Từ Liêm',1),
(14,'huyen-thanh-tri',N'Huyện Thanh Trì',1),
(15,'quan-bac-tu-liem',N'Quận Bắc Từ Liêm',1),
(16,'huyen-me-linh',N'Huyện Mê Linh',1),
(17,'quan-ha-dong',N'Quận Hà Đông',1),
(18,'thi-xa-son-tay',N'Thị xã Sơn Tây',1),
(19,'huyen-ba-vi',N'Huyện Ba Vì',1),
(20,'huyen-phuc-tho',N'Huyện Phúc Thọ',1),
(21,'huyen-dan-phuong',N'Huyện Đan Phượng',1),
(22,'huyen-hoai-duc',N'Huyện Hoài Đức',1),
(23,'huyen-quoc-oai',N'Huyện Quốc Oai',1),
(24,'huyen-thach-that',N'Huyện Thạch Thất',1),
(25,'huyen-chuong-my',N'Huyện Chương Mỹ',1),
(26,'huyen-thanh-oai',N'Huyện Thanh Oai',1),
(27,'huyen-thuong-tin',N'Huyện Thường Tín',1),
(28,'huyen-phu-xuyen',N'Huyện Phú Xuyên',1),
(29,'huyen-ung-hoa',N'Huyện Ứng Hòa',1),
(30,'huyen-my-duc',N'Huyện Mỹ Đức',1),
(31,'quan-1',N'Quận 1',2),
(32,'quan-12',N'Quận 12',2),
(33,'quan-go-vap',N'Quận Gò Vấp',2),
(34,'quan-binh-thanh',N'Quận Bình Thạnh',2),
(35,'quan-tan-binh',N'Quận Tân Bình',2),
(36,'quan-tan-phu',N'Quận Tân Phú',2),
(37,'quan-phu-nhuan',N'Quận Phú Nhuận',2),
(38,'thanh-pho-thu-duc',N'Thành phố Thủ Đức',2),
(39,'quan-3',N'Quận 3',2),
(40,'quan-10',N'Quận 10',2),
(41,'quan-11',N'Quận 11',2),
(42,'quan-4',N'Quận 4',2),
(43,'quan-5',N'Quận 5',2),
(44,'quan-6',N'Quận 6',2),
(45,'quan-8',N'Quận 8',2),
(46,'quan-binh-tan',N'Quận Bình Tân',2),
(47,'quan-7',N'Quận 7',2),
(48,'huyen-cu-chi',N'Huyện Củ Chi',2),
(49,'huyen-hoc-mon',N'Huyện Hóc Môn',2),
(50,'huyen-binh-chanh',N'Huyện Bình Chánh',2),
(51,'huyen-nha-be',N'Huyện Nhà Bè',2),
(52,'huyen-can-gio',N'Huyện Cần Giờ',2),
(287,'quan-hong-bang',N'Quận Hồng Bàng',5),
(288,'quan-ngo-quyen',N'Quận Ngô Quyền',5),
(289,'quan-le-chan',N'Quận Lê Chân',5),
(290,'quan-hai-an',N'Quận Hải An',5),
(291,'quan-kien-an',N'Quận Kiến An',5),
(292,'quan-do-son',N'Quận Đồ Sơn',5),
(293,'quan-duong-kinh',N'Quận Dương Kinh',5),
(294,'huyen-thuy-nguyen',N'Huyện Thuỷ Nguyên',5),
(295,'huyen-an-duong',N'Huyện An Dương',5),
(296,'huyen-an-lao',N'Huyện An Lão',5),
(297,'huyen-kien-thuy',N'Huyện Kiến Thuỵ',5),
(298,'huyen-tien-lang',N'Huyện Tiên Lãng',5),
(299,'huyen-vinh-bao',N'Huyện Vĩnh Bảo',5),
(300,'huyen-cat-hai',N'Huyện Cát Hải',5),
(301,'huyen-bach-long-vi',N'Huyện Bạch Long Vĩ',5),
(206,'quan-lien-chieu',N'Quận Liên Chiểu',4),
(207,'quan-thanh-khe',N'Quận Thanh Khê',4),
(208,'quan-hai-chau',N'Quận Hải Châu',4),
(209,'quan-son-tra',N'Quận Sơn Trà',4),
(210,'quan-ngu-hanh-son',N'Quận Ngũ Hành Sơn',4),
(211,'quan-cam-le',N'Quận Cẩm Lệ',4),
(212,'huyen-hoa-vang',N'Huyện Hòa Vang',4),
(213,'huyen-hoang-sa',N'Huyện Hoàng Sa',4),
(53,'thanh-pho-long-xuyen',N'Thành phố Long Xuyên',6),
(54,'thanh-pho-chau-doc',N'Thành phố Châu Đốc',6),
(55,'huyen-an-phu',N'Huyện An Phú',6),
(56,'thi-xa-tan-chau',N'Thị xã Tân Châu',6),
(57,'huyen-phu-tan',N'Huyện Phú Tân',6),
(58,'huyen-chau-phu',N'Huyện Châu Phú',6),
(59,'huyen-tinh-bien',N'Huyện Tịnh Biên',6),
(60,'huyen-tri-ton',N'Huyện Tri Tôn',6),
(61,'huyen-chau-thanh',N'Huyện Châu Thành',6),
(62,'huyen-cho-moi',N'Huyện Chợ Mới',6),
(63,'huyen-thoai-son',N'Huyện Thoại Sơn',6),
(125,'thanh-pho-thu-dau-mot',N'Thành phố Thủ Dầu Một',13),
(126,'huyen-bau-bang',N'Huyện Bàu Bàng',13),
(127,'huyen-dau-tieng',N'Huyện Dầu Tiếng',13),
(128,'thi-xa-ben-cat',N'Thị xã Bến Cát',13),
(129,'huyen-phu-giao',N'Huyện Phú Giáo',13),
(130,'thi-xa-tan-uyen',N'Thị xã Tân Uyên',13),
(131,'thanh-pho-di-an',N'Thành phố Dĩ An',13),
(132,'thanh-pho-thuan-an',N'Thành phố Thuận An',13),
(133,'huyen-bac-tan-uyen',N'Huyện Bắc Tân Uyên',13),
(114,'thanh-pho-quy-nhon',N'Thành phố Quy Nhơn',14),
(115,'huyen-an-lao',N'Huyện An Lão',14),
(116,'thi-xa-hoai-nhon',N'Thị xã Hoài Nhơn',14),
(117,'huyen-hoai-an',N'Huyện Hoài Ân',14),
(118,'huyen-phu-my',N'Huyện Phù Mỹ',14),
(119,'huyen-vinh-thanh',N'Huyện Vĩnh Thạnh',14),
(120,'huyen-tay-son',N'Huyện Tây Sơn',14),
(121,'huyen-phu-cat',N'Huyện Phù Cát',14),
(122,'thi-xa-an-nhon',N'Thị xã An Nhơn',14),
(123,'huyen-tuy-phuoc',N'Huyện Tuy Phước',14),
(124,'huyen-van-canh',N'Huyện Vân Canh',14),
(89,'thanh-pho-bac-ninh',N'Thành phố Bắc Ninh',11),
(90,'huyen-yen-phong',N'Huyện Yên Phong',11),
(91,'huyen-que-vo',N'Huyện Quế Võ',11),
(92,'huyen-tien-du',N'Huyện Tiên Du',11),
(93,'thi-xa-tu-son',N'Thị xã Từ Sơn',11),
(94,'huyen-thuan-thanh',N'Huyện Thuận Thành',11),
(95,'huyen-gia-binh',N'Huyện Gia Bình',11),
(96,'huyen-luong-tai',N'Huyện Lương Tài',11),
(64,'thanh-pho-bac-giang',N'Thành phố Bắc Giang',10),
(65,'huyen-yen-the',N'Huyện Yên Thế',10),
(66,'huyen-tan-yen',N'Huyện Tân Yên',10),
(67,'huyen-lang-giang',N'Huyện Lạng Giang',10),
(68,'huyen-luc-nam',N'Huyện Lục Nam',10),
(69,'huyen-luc-ngan',N'Huyện Lục Ngạn',10),
(70,'huyen-son-dong',N'Huyện Sơn Động',10),
(71,'huyen-yen-dung',N'Huyện Yên Dũng',10),
(72,'huyen-viet-yen',N'Huyện Việt Yên',10),
(73,'huyen-hiep-hoa',N'Huyện Hiệp Hòa',10),
(173,'thanh-pho-cao-bang',N'Thành phố Cao Bằng',18),
(174,'huyen-bao-lam',N'Huyện Bảo Lâm',18),
(175,'huyen-bao-lac',N'Huyện Bảo Lạc',18),
(176,'huyen-ha-quang',N'Huyện Hà Quảng',18),
(177,'huyen-trung-khanh',N'Huyện Trùng Khánh',18),
(178,'huyen-ha-lang',N'Huyện Hạ Lang',18),
(179,'huyen-quang-hoa',N'Huyện Quảng Hòa',18),
(180,'huyen-hoa-an',N'Huyện Hoà An',18),
(181,'huyen-nguyen-binh',N'Huyện Nguyên Bình',18),
(182,'huyen-thach-an',N'Huyện Thạch An',18),
(82,'thanh-pho-bac-lieu',N'Thành phố Bạc Liêu',8),
(83,'huyen-hong-dan',N'Huyện Hồng Dân',8),
(84,'huyen-phuoc-long',N'Huyện Phước Long',8),
(85,'huyen-vinh-loi',N'Huyện Vĩnh Lợi',8),
(86,'thi-xa-gia-rai',N'Thị xã Giá Rai',8),
(87,'huyen-dong-hai',N'Huyện Đông Hải',8),
(88,'huyen-hoa-binh',N'Huyện Hoà Bình',8),
(145,'thanh-pho-phan-thiet',N'Thành phố Phan Thiết',16),
(146,'thi-xa-la-gi',N'Thị xã La Gi',16),
(147,'huyen-tuy-phong',N'Huyện Tuy Phong',16),
(148,'huyen-bac-binh',N'Huyện Bắc Bình',16),
(149,'huyen-ham-thuan-bac',N'Huyện Hàm Thuận Bắc',16),
(150,'huyen-ham-thuan-nam',N'Huyện Hàm Thuận Nam',16),
(151,'huyen-tanh-linh',N'Huyện Tánh Linh',16),
(152,'huyen-duc-linh',N'Huyện Đức Linh',16),
(153,'huyen-ham-tan',N'Huyện Hàm Tân',16),
(154,'huyen-phu-qui',N'Huyện Phú Quí',16),
(74,'thanh-pho-bac-kan',N'Thành Phố Bắc Kạn',9),
(75,'huyen-pac-nam',N'Huyện Pác Nặm',9),
(76,'huyen-ba-be',N'Huyện Ba Bể',9),
(77,'huyen-ngan-son',N'Huyện Ngân Sơn',9),
(78,'huyen-bach-thong',N'Huyện Bạch Thông',9),
(79,'huyen-cho-don',N'Huyện Chợ Đồn',9),
(80,'huyen-cho-moi',N'Huyện Chợ Mới',9),
(81,'huyen-na-ri',N'Huyện Na Rì',9),
(164,'quan-ninh-kieu',N'Quận Ninh Kiều',3),
(165,'quan-o-mon',N'Quận Ô Môn',3),
(166,'quan-binh-thuy',N'Quận Bình Thuỷ',3),
(167,'quan-cai-rang',N'Quận Cái Răng',3),
(168,'quan-thot-not',N'Quận Thốt Nốt',3),
(169,'huyen-vinh-thanh',N'Huyện Vĩnh Thạnh',3),
(170,'huyen-co-do',N'Huyện Cờ Đỏ',3),
(171,'huyen-phong-dien',N'Huyện Phong Điền',3),
(172,'huyen-thoi-lai',N'Huyện Thới Lai',3),
(97,'thanh-pho-vung-tau',N'Thành phố Vũng Tàu',7),
(98,'thanh-pho-ba-ria',N'Thành phố Bà Rịa',7),
(99,'huyen-chau-duc',N'Huyện Châu Đức',7),
(100,'huyen-xuyen-moc',N'Huyện Xuyên Mộc',7),
(101,'huyen-long-dien',N'Huyện Long Điền',7),
(102,'huyen-dat-do',N'Huyện Đất Đỏ',7),
(103,'thi-xa-phu-my',N'Thị xã Phú Mỹ',7),
(104,'huyen-con-dao',N'Huyện Côn Đảo',7),
(155,'thanh-pho-ca-mau',N'Thành phố Cà Mau',17),
(156,'huyen-u-minh',N'Huyện U Minh',17),
(157,'huyen-thoi-binh',N'Huyện Thới Bình',17),
(158,'huyen-tran-van-thoi',N'Huyện Trần Văn Thời',17),
(159,'huyen-cai-nuoc',N'Huyện Cái Nước',17),
(160,'huyen-dam-doi',N'Huyện Đầm Dơi',17),
(161,'huyen-nam-can',N'Huyện Năm Căn',17),
(162,'huyen-phu-tan',N'Huyện Phú Tân',17),
(163,'huyen-ngoc-hien',N'Huyện Ngọc Hiển',17),
(105,'thanh-pho-ben-tre',N'Thành phố Bến Tre',12),
(106,'huyen-chau-thanh',N'Huyện Châu Thành',12),
(107,'huyen-cho-lach',N'Huyện Chợ Lách',12),
(108,'huyen-mo-cay-nam',N'Huyện Mỏ Cày Nam',12),
(109,'huyen-giong-trom',N'Huyện Giồng Trôm',12),
(110,'huyen-binh-dai',N'Huyện Bình Đại',12),
(111,'huyen-ba-tri',N'Huyện Ba Tri',12),
(112,'huyen-thanh-phu',N'Huyện Thạnh Phú',12),
(113,'huyen-mo-cay-bac',N'Huyện Mỏ Cày Bắc',12),
(264,'thanh-pho-ha-giang',N'Thành phố Hà Giang',25),
(265,'huyen-dong-van',N'Huyện Đồng Văn',25),
(266,'huyen-meo-vac',N'Huyện Mèo Vạc',25),
(267,'huyen-yen-minh',N'Huyện Yên Minh',25),
(268,'huyen-quan-ba',N'Huyện Quản Bạ',25),
(269,'huyen-vi-xuyen',N'Huyện Vị Xuyên',25),
(270,'huyen-bac-me',N'Huyện Bắc Mê',25),
(271,'huyen-hoang-su-phi',N'Huyện Hoàng Su Phì',25),
(272,'huyen-xin-man',N'Huyện Xín Mần',25),
(273,'huyen-bac-quang',N'Huyện Bắc Quang',25),
(274,'huyen-quang-binh',N'Huyện Quang Bình',25),
(308,'thanh-pho-ha-tinh',N'Thành phố Hà Tĩnh',27),
(309,'thi-xa-hong-linh',N'Thị xã Hồng Lĩnh',27),
(310,'huyen-huong-son',N'Huyện Hương Sơn',27),
(311,'huyen-duc-tho',N'Huyện Đức Thọ',27),
(312,'huyen-vu-quang',N'Huyện Vũ Quang',27),
(313,'huyen-nghi-xuan',N'Huyện Nghi Xuân',27),
(314,'huyen-can-loc',N'Huyện Can Lộc',27),
(315,'huyen-huong-khe',N'Huyện Hương Khê',27),
(316,'huyen-thach-ha',N'Huyện Thạch Hà',27),
(317,'huyen-cam-xuyen',N'Huyện Cẩm Xuyên',27),
(318,'huyen-ky-anh',N'Huyện Kỳ Anh',27),
(319,'huyen-loc-ha',N'Huyện Lộc Hà',27),
(320,'thi-xa-ky-anh',N'Thị xã Kỳ Anh',27),
(302,'thanh-pho-phu-ly',N'Thành phố Phủ Lý',26),
(303,'thi-xa-duy-tien',N'Thị xã Duy Tiên',26),
(304,'huyen-kim-bang',N'Huyện Kim Bảng',26),
(305,'huyen-thanh-liem',N'Huyện Thanh Liêm',26),
(306,'huyen-binh-luc',N'Huyện Bình Lục',26),
(307,'huyen-ly-nhan',N'Huyện Lý Nhân',26),
(329,'thanh-pho-hoa-binh',N'Thành phố Hòa Bình',30),
(330,'huyen-da-bac',N'Huyện Đà Bắc',30),
(331,'huyen-luong-son',N'Huyện Lương Sơn',30),
(332,'huyen-kim-boi',N'Huyện Kim Bôi',30),
(333,'huyen-cao-phong',N'Huyện Cao Phong',30),
(334,'huyen-tan-lac',N'Huyện Tân Lạc',30),
(335,'huyen-mai-chau',N'Huyện Mai Châu',30),
(336,'huyen-lac-son',N'Huyện Lạc Sơn',30),
(337,'huyen-yen-thuy',N'Huyện Yên Thủy',30),
(338,'huyen-lac-thuy',N'Huyện Lạc Thủy',30),
(321,'thanh-pho-vi-thanh',N'Thành phố Vị Thanh',29),
(322,'thanh-pho-nga-bay',N'Thành phố Ngã Bảy',29),
(323,'huyen-chau-thanh-a',N'Huyện Châu Thành A',29),
(324,'huyen-chau-thanh',N'Huyện Châu Thành',29),
(325,'huyen-phung-hiep',N'Huyện Phụng Hiệp',29),
(326,'huyen-vi-thuy',N'Huyện Vị Thuỷ',29),
(327,'huyen-long-my',N'Huyện Long Mỹ',29),
(328,'thi-xa-long-my',N'Thị xã Long Mỹ',29),
(349,'thanh-pho-nha-trang',N'Thành phố Nha Trang',32),
(350,'thanh-pho-cam-ranh',N'Thành phố Cam Ranh',32),
(351,'huyen-cam-lam',N'Huyện Cam Lâm',32),
(352,'huyen-van-ninh',N'Huyện Vạn Ninh',32),
(353,'thi-xa-ninh-hoa',N'Thị xã Ninh Hòa',32),
(354,'huyen-khanh-vinh',N'Huyện Khánh Vĩnh',32),
(355,'huyen-dien-khanh',N'Huyện Diên Khánh',32),
(356,'huyen-khanh-son',N'Huyện Khánh Sơn',32),
(357,'huyen-truong-sa',N'Huyện Trường Sa',32),
(373,'thanh-pho-kon-tum',N'Thành phố Kon Tum',34),
(374,'huyen-dak-glei',N'Huyện Đắk Glei',34),
(375,'huyen-ngoc-hoi',N'Huyện Ngọc Hồi',34),
(376,'huyen-dak-to',N'Huyện Đắk Tô',34),
(377,'huyen-kon-plong',N'Huyện Kon Plông',34),
(378,'huyen-kon-ray',N'Huyện Kon Rẫy',34),
(379,'huyen-dak-ha',N'Huyện Đắk Hà',34),
(380,'huyen-sa-thay',N'Huyện Sa Thầy',34),
(381,'huyen-tu-mo-rong',N'Huyện Tu Mơ Rông',34),
(382,'huyen-ia-h-drai',N'Huyện Ia H Drai',34),
(403,'thanh-pho-lang-son',N'Thành phố Lạng Sơn',37),
(404,'huyen-trang-dinh',N'Huyện Tràng Định',37),
(405,'huyen-binh-gia',N'Huyện Bình Gia',37),
(406,'huyen-van-lang',N'Huyện Văn Lãng',37),
(407,'huyen-cao-loc',N'Huyện Cao Lộc',37),
(408,'huyen-van-quan',N'Huyện Văn Quan',37),
(409,'huyen-bac-son',N'Huyện Bắc Sơn',37),
(410,'huyen-huu-lung',N'Huyện Hữu Lũng',37),
(411,'huyen-chi-lang',N'Huyện Chi Lăng',37),
(412,'huyen-loc-binh',N'Huyện Lộc Bình',37),
(413,'huyen-dinh-lap',N'Huyện Đình Lập',37),
(247,'thanh-pho-pleiku',N'Thành phố Pleiku',24),
(248,'thi-xa-an-khe',N'Thị xã An Khê',24),
(249,'thi-xa-ayun-pa',N'Thị xã Ayun Pa',24),
(250,'huyen-kbang',N'Huyện KBang',24),
(251,'huyen-dak-doa',N'Huyện Đăk Đoa',24),
(252,'huyen-chu-pah',N'Huyện Chư Păh',24),
(253,'huyen-ia-grai',N'Huyện Ia Grai',24),
(254,'huyen-mang-yang',N'Huyện Mang Yang',24),
(255,'huyen-kong-chro',N'Huyện Kông Chro',24),
(256,'huyen-duc-co',N'Huyện Đức Cơ',24),
(257,'huyen-chu-prong',N'Huyện Chư Prông',24),
(258,'huyen-chu-se',N'Huyện Chư Sê',24),
(259,'huyen-dak-po',N'Huyện Đăk Pơ',24),
(260,'huyen-ia-pa',N'Huyện Ia Pa',24),
(261,'huyen-krong-pa',N'Huyện Krông Pa',24),
(262,'huyen-phu-thien',N'Huyện Phú Thiện',24),
(263,'huyen-chu-puh',N'Huyện Chư Pưh',24),
(275,'thanh-pho-hai-duong',N'Thành phố Hải Dương',28),
(276,'thanh-pho-chi-linh',N'Thành phố Chí Linh',28),
(277,'huyen-nam-sach',N'Huyện Nam Sách',28),
(278,'thi-xa-kinh-mon',N'Thị xã Kinh Môn',28),
(279,'huyen-kim-thanh',N'Huyện Kim Thành',28),
(280,'huyen-thanh-ha',N'Huyện Thanh Hà',28),
(281,'huyen-cam-giang',N'Huyện Cẩm Giàng',28),
(282,'huyen-binh-giang',N'Huyện Bình Giang',28),
(283,'huyen-gia-loc',N'Huyện Gia Lộc',28),
(284,'huyen-tu-ky',N'Huyện Tứ Kỳ',28),
(285,'huyen-ninh-giang',N'Huyện Ninh Giang',28),
(286,'huyen-thanh-mien',N'Huyện Thanh Miện',28),
(134,'thi-xa-phuoc-long',N'Thị xã Phước Long',15),
(135,'thanh-pho-dong-xoai',N'Thành phố Đồng Xoài',15),
(136,'thi-xa-binh-long',N'Thị xã Bình Long',15),
(137,'huyen-bu-gia-map',N'Huyện Bù Gia Mập',15),
(138,'huyen-loc-ninh',N'Huyện Lộc Ninh',15),
(139,'huyen-bu-dop',N'Huyện Bù Đốp',15),
(140,'huyen-hon-quan',N'Huyện Hớn Quản',15),
(141,'huyen-dong-phu',N'Huyện Đồng Phú',15),
(142,'huyen-bu-dang',N'Huyện Bù Đăng',15),
(143,'huyen-chon-thanh',N'Huyện Chơn Thành',15),
(144,'huyen-phu-rieng',N'Huyện Phú Riềng',15),
(448,'thanh-pho-vinh',N'Thành phố Vinh',41),
(449,'thi-xa-cua-lo',N'Thị xã Cửa Lò',41),
(450,'thi-xa-thai-hoa',N'Thị xã Thái Hoà',41),
(451,'huyen-que-phong',N'Huyện Quế Phong',41),
(452,'huyen-quy-chau',N'Huyện Quỳ Châu',41),
(453,'huyen-ky-son',N'Huyện Kỳ Sơn',41),
(454,'huyen-tuong-duong',N'Huyện Tương Dương',41),
(455,'huyen-nghia-dan',N'Huyện Nghĩa Đàn',41),
(456,'huyen-quy-hop',N'Huyện Quỳ Hợp',41),
(457,'huyen-quynh-luu',N'Huyện Quỳnh Lưu',41),
(458,'huyen-con-cuong',N'Huyện Con Cuông',41),
(459,'huyen-tan-ky',N'Huyện Tân Kỳ',41),
(460,'huyen-anh-son',N'Huyện Anh Sơn',41),
(461,'huyen-dien-chau',N'Huyện Diễn Châu',41),
(462,'huyen-yen-thanh',N'Huyện Yên Thành',41),
(463,'huyen-do-luong',N'Huyện Đô Lương',41),
(464,'huyen-thanh-chuong',N'Huyện Thanh Chương',41),
(465,'huyen-nghi-loc',N'Huyện Nghi Lộc',41),
(466,'huyen-nam-dan',N'Huyện Nam Đàn',41),
(467,'huyen-hung-nguyen',N'Huyện Hưng Nguyên',41),
(468,'thi-xa-hoang-mai',N'Thị xã Hoàng Mai',41),
(339,'thanh-pho-hung-yen',N'Thành phố Hưng Yên',31),
(340,'huyen-van-lam',N'Huyện Văn Lâm',31),
(341,'huyen-van-giang',N'Huyện Văn Giang',31),
(342,'huyen-yen-my',N'Huyện Yên Mỹ',31),
(343,'thi-xa-my-hao',N'Thị xã Mỹ Hào',31),
(344,'huyen-an-thi',N'Huyện Ân Thi',31),
(345,'huyen-khoai-chau',N'Huyện Khoái Châu',31),
(346,'huyen-kim-dong',N'Huyện Kim Động',31),
(347,'huyen-tien-lu',N'Huyện Tiên Lữ',31),
(348,'huyen-phu-cu',N'Huyện Phù Cừ',31),
(477,'thanh-pho-phan-rang-thap-cham',N'Thành phố Phan Rang-Tháp Chàm',43),
(478,'huyen-bac-ai',N'Huyện Bác Ái',43),
(479,'huyen-ninh-son',N'Huyện Ninh Sơn',43),
(480,'huyen-ninh-hai',N'Huyện Ninh Hải',43),
(481,'huyen-ninh-phuoc',N'Huyện Ninh Phước',43),
(482,'huyen-thuan-bac',N'Huyện Thuận Bắc',43),
(483,'huyen-thuan-nam',N'Huyện Thuận Nam',43),
(358,'thanh-pho-rach-gia',N'Thành phố Rạch Giá',33),
(359,'thanh-pho-ha-tien',N'Thành phố Hà Tiên',33),
(360,'huyen-kien-luong',N'Huyện Kiên Lương',33),
(361,'huyen-hon-dat',N'Huyện Hòn Đất',33),
(362,'huyen-tan-hiep',N'Huyện Tân Hiệp',33),
(363,'huyen-chau-thanh',N'Huyện Châu Thành',33),
(364,'huyen-giong-rieng',N'Huyện Giồng Riềng',33),
(365,'huyen-go-quao',N'Huyện Gò Quao',33),
(366,'huyen-an-bien',N'Huyện An Biên',33),
(367,'huyen-an-minh',N'Huyện An Minh',33),
(368,'huyen-vinh-thuan',N'Huyện Vĩnh Thuận',33),
(369,'thanh-pho-phu-quoc',N'Thành phố Phú Quốc',33),
(370,'huyen-kien-hai',N'Huyện Kiên Hải',33),
(371,'huyen-u-minh-thuong',N'Huyện U Minh Thượng',33),
(372,'huyen-giang-thanh',N'Huyện Giang Thành',33),
(497,'thanh-pho-tuy-hoa',N'Thành phố Tuy Hoà',45),
(498,'thi-xa-song-cau',N'Thị xã Sông Cầu',45),
(499,'huyen-dong-xuan',N'Huyện Đồng Xuân',45),
(500,'huyen-tuy-an',N'Huyện Tuy An',45),
(501,'huyen-son-hoa',N'Huyện Sơn Hòa',45),
(502,'huyen-song-hinh',N'Huyện Sông Hinh',45),
(503,'huyen-tay-hoa',N'Huyện Tây Hoà',45),
(504,'huyen-phu-hoa',N'Huyện Phú Hoà',45),
(505,'thi-xa-dong-hoa',N'Thị xã Đông Hòa',45),
(545,'thanh-pho-ha-long',N'Thành phố Hạ Long',49),
(546,'thanh-pho-mong-cai',N'Thành phố Móng Cái',49),
(547,'thanh-pho-cam-pha',N'Thành phố Cẩm Phả',49),
(548,'thanh-pho-uong-bi',N'Thành phố Uông Bí',49),
(549,'huyen-binh-lieu',N'Huyện Bình Liêu',49),
(550,'huyen-tien-yen',N'Huyện Tiên Yên',49),
(551,'huyen-dam-ha',N'Huyện Đầm Hà',49),
(552,'huyen-hai-ha',N'Huyện Hải Hà',49),
(553,'huyen-ba-che',N'Huyện Ba Chẽ',49),
(554,'huyen-van-don',N'Huyện Vân Đồn',49),
(555,'thi-xa-dong-trieu',N'Thị xã Đông Triều',49),
(556,'thi-xa-quang-yen',N'Thị xã Quảng Yên',49),
(557,'huyen-co-to',N'Huyện Cô Tô',49),
(438,'thanh-pho-nam-dinh',N'Thành phố Nam Định',40),
(439,'huyen-my-loc',N'Huyện Mỹ Lộc',40),
(440,'huyen-vu-ban',N'Huyện Vụ Bản',40),
(441,'huyen-y-yen',N'Huyện Ý Yên',40),
(442,'huyen-nghia-hung',N'Huyện Nghĩa Hưng',40),
(443,'huyen-nam-truc',N'Huyện Nam Trực',40),
(444,'huyen-truc-ninh',N'Huyện Trực Ninh',40),
(445,'huyen-xuan-truong',N'Huyện Xuân Trường',40),
(446,'huyen-giao-thuy',N'Huyện Giao Thủy',40),
(447,'huyen-hai-hau',N'Huyện Hải Hậu',40),
(414,'thanh-pho-lao-cai',N'Thành phố Lào Cai',38),
(415,'huyen-bat-xat',N'Huyện Bát Xát',38),
(416,'huyen-muong-khuong',N'Huyện Mường Khương',38),
(417,'huyen-si-ma-cai',N'Huyện Si Ma Cai',38),
(418,'huyen-bac-ha',N'Huyện Bắc Hà',38),
(419,'huyen-bao-thang',N'Huyện Bảo Thắng',38),
(420,'huyen-bao-yen',N'Huyện Bảo Yên',38),
(421,'thi-xa-sa-pa',N'Thị xã Sa Pa',38),
(422,'huyen-van-ban',N'Huyện Văn Bàn',38),
(423,'thanh-pho-tan-an',N'Thành phố Tân An',39),
(424,'thi-xa-kien-tuong',N'Thị xã Kiến Tường',39),
(425,'huyen-tan-hung',N'Huyện Tân Hưng',39),
(426,'huyen-vinh-hung',N'Huyện Vĩnh Hưng',39),
(427,'huyen-moc-hoa',N'Huyện Mộc Hóa',39),
(428,'huyen-tan-thanh',N'Huyện Tân Thạnh',39),
(429,'huyen-thanh-hoa',N'Huyện Thạnh Hóa',39),
(430,'huyen-duc-hue',N'Huyện Đức Huệ',39),
(431,'huyen-duc-hoa',N'Huyện Đức Hòa',39),
(432,'huyen-ben-luc',N'Huyện Bến Lức',39),
(433,'huyen-thu-thua',N'Huyện Thủ Thừa',39),
(434,'huyen-tan-tru',N'Huyện Tân Trụ',39),
(435,'huyen-can-duoc',N'Huyện Cần Đước',39),
(436,'huyen-can-giuoc',N'Huyện Cần Giuộc',39),
(437,'huyen-chau-thanh',N'Huyện Châu Thành',39),
(506,'thanh-pho-dong-hoi',N'Thành Phố Đồng Hới',46),
(507,'huyen-minh-hoa',N'Huyện Minh Hóa',46),
(508,'huyen-tuyen-hoa',N'Huyện Tuyên Hóa',46),
(509,'huyen-quang-trach',N'Huyện Quảng Trạch',46),
(510,'huyen-bo-trach',N'Huyện Bố Trạch',46),
(511,'huyen-quang-ninh',N'Huyện Quảng Ninh',46),
(512,'huyen-le-thuy',N'Huyện Lệ Thủy',46),
(513,'thi-xa-ba-don',N'Thị xã Ba Đồn',46),
(391,'thanh-pho-da-lat',N'Thành phố Đà Lạt',36),
(392,'thanh-pho-bao-loc',N'Thành phố Bảo Lộc',36),
(393,'huyen-dam-rong',N'Huyện Đam Rông',36),
(394,'huyen-lac-duong',N'Huyện Lạc Dương',36),
(395,'huyen-lam-ha',N'Huyện Lâm Hà',36),
(396,'huyen-don-duong',N'Huyện Đơn Dương',36),
(397,'huyen-duc-trong',N'Huyện Đức Trọng',36),
(398,'huyen-di-linh',N'Huyện Di Linh',36),
(399,'huyen-bao-lam',N'Huyện Bảo Lâm',36),
(400,'huyen-da-huoai',N'Huyện Đạ Huoai',36),
(401,'huyen-da-teh',N'Huyện Đạ Tẻh',36),
(402,'huyen-cat-tien',N'Huyện Cát Tiên',36),
(600,'thanh-pho-thai-binh',N'Thành phố Thái Bình',54),
(601,'huyen-quynh-phu',N'Huyện Quỳnh Phụ',54),
(602,'huyen-hung-ha',N'Huyện Hưng Hà',54),
(603,'huyen-dong-hung',N'Huyện Đông Hưng',54),
(604,'huyen-thai-thuy',N'Huyện Thái Thụy',54),
(605,'huyen-tien-hai',N'Huyện Tiền Hải',54),
(606,'huyen-kien-xuong',N'Huyện Kiến Xương',54),
(607,'huyen-vu-thu',N'Huyện Vũ Thư',54),
(469,'thanh-pho-ninh-binh',N'Thành phố Ninh Bình',42),
(470,'thanh-pho-tam-diep',N'Thành phố Tam Điệp',42),
(471,'huyen-nho-quan',N'Huyện Nho Quan',42),
(472,'huyen-gia-vien',N'Huyện Gia Viễn',42),
(473,'huyen-hoa-lu',N'Huyện Hoa Lư',42),
(474,'huyen-yen-khanh',N'Huyện Yên Khánh',42),
(475,'huyen-kim-son',N'Huyện Kim Sơn',42),
(476,'huyen-yen-mo',N'Huyện Yên Mô',42),
(484,'thanh-pho-viet-tri',N'Thành phố Việt Trì',44),
(485,'thi-xa-phu-tho',N'Thị xã Phú Thọ',44),
(486,'huyen-doan-hung',N'Huyện Đoan Hùng',44),
(487,'huyen-ha-hoa',N'Huyện Hạ Hoà',44),
(488,'huyen-thanh-ba',N'Huyện Thanh Ba',44),
(489,'huyen-phu-ninh',N'Huyện Phù Ninh',44),
(490,'huyen-yen-lap',N'Huyện Yên Lập',44),
(491,'huyen-cam-khe',N'Huyện Cẩm Khê',44),
(492,'huyen-tam-nong',N'Huyện Tam Nông',44),
(493,'huyen-lam-thao',N'Huyện Lâm Thao',44),
(494,'huyen-thanh-son',N'Huyện Thanh Sơn',44),
(495,'huyen-thanh-thuy',N'Huyện Thanh Thuỷ',44),
(496,'huyen-tan-son',N'Huyện Tân Sơn',44),
(532,'thanh-pho-quang-ngai',N'Thành phố Quảng Ngãi',48),
(533,'huyen-binh-son',N'Huyện Bình Sơn',48),
(534,'huyen-tra-bong',N'Huyện Trà Bồng',48),
(535,'huyen-son-tinh',N'Huyện Sơn Tịnh',48),
(536,'huyen-tu-nghia',N'Huyện Tư Nghĩa',48),
(537,'huyen-son-ha',N'Huyện Sơn Hà',48),
(538,'huyen-son-tay',N'Huyện Sơn Tây',48),
(539,'huyen-minh-long',N'Huyện Minh Long',48),
(540,'huyen-nghia-hanh',N'Huyện Nghĩa Hành',48),
(541,'huyen-mo-duc',N'Huyện Mộ Đức',48),
(542,'thi-xa-duc-pho',N'Thị xã Đức Phổ',48),
(543,'huyen-ba-to',N'Huyện Ba Tơ',48),
(544,'huyen-ly-son',N'Huyện Lý Sơn',48),
(383,'thanh-pho-lai-chau',N'Thành phố Lai Châu',35),
(384,'huyen-tam-duong',N'Huyện Tam Đường',35),
(385,'huyen-muong-te',N'Huyện Mường Tè',35),
(386,'huyen-sin-ho',N'Huyện Sìn Hồ',35),
(387,'huyen-phong-tho',N'Huyện Phong Thổ',35),
(388,'huyen-than-uyen',N'Huyện Than Uyên',35),
(389,'huyen-tan-uyen',N'Huyện Tân Uyên',35),
(390,'huyen-nam-nhun',N'Huyện Nậm Nhùn',35),
(591,'thanh-pho-tay-ninh',N'Thành phố Tây Ninh',53),
(592,'huyen-tan-bien',N'Huyện Tân Biên',53),
(593,'huyen-tan-chau',N'Huyện Tân Châu',53),
(594,'huyen-duong-minh-chau',N'Huyện Dương Minh Châu',53),
(595,'huyen-chau-thanh',N'Huyện Châu Thành',53),
(596,'thi-xa-hoa-thanh',N'Thị xã Hòa Thành',53),
(597,'huyen-go-dau',N'Huyện Gò Dầu',53),
(598,'huyen-ben-cau',N'Huyện Bến Cầu',53),
(599,'thi-xa-trang-bang',N'Thị xã Trảng Bàng',53),
(514,'thanh-pho-tam-ky',N'Thành phố Tam Kỳ',47),
(515,'thanh-pho-hoi-an',N'Thành phố Hội An',47),
(516,'huyen-tay-giang',N'Huyện Tây Giang',47),
(517,'huyen-dong-giang',N'Huyện Đông Giang',47),
(518,'huyen-dai-loc',N'Huyện Đại Lộc',47),
(519,'thi-xa-dien-ban',N'Thị xã Điện Bàn',47),
(520,'huyen-duy-xuyen',N'Huyện Duy Xuyên',47),
(521,'huyen-que-son',N'Huyện Quế Sơn',47),
(522,'huyen-nam-giang',N'Huyện Nam Giang',47),
(523,'huyen-phuoc-son',N'Huyện Phước Sơn',47),
(524,'huyen-hiep-duc',N'Huyện Hiệp Đức',47),
(525,'huyen-thang-binh',N'Huyện Thăng Bình',47),
(526,'huyen-tien-phuoc',N'Huyện Tiên Phước',47),
(527,'huyen-bac-tra-my',N'Huyện Bắc Trà My',47),
(528,'huyen-nam-tra-my',N'Huyện Nam Trà My',47),
(529,'huyen-nui-thanh',N'Huyện Núi Thành',47),
(530,'huyen-phu-ninh',N'Huyện Phú Ninh',47),
(531,'huyen-nong-son',N'Huyện Nông Sơn',47),
(644,'thanh-pho-hue',N'Thành phố Huế',57),
(645,'huyen-phong-dien',N'Huyện Phong Điền',57),
(646,'huyen-quang-dien',N'Huyện Quảng Điền',57),
(647,'huyen-phu-vang',N'Huyện Phú Vang',57),
(648,'thi-xa-huong-thuy',N'Thị xã Hương Thủy',57),
(649,'thi-xa-huong-tra',N'Thị xã Hương Trà',57),
(650,'huyen-a-luoi',N'Huyện A Lưới',57),
(651,'huyen-phu-loc',N'Huyện Phú Lộc',57),
(652,'huyen-nam-dong',N'Huyện Nam Đông',57),
(664,'thanh-pho-tra-vinh',N'Thành phố Trà Vinh',59),
(665,'huyen-cang-long',N'Huyện Càng Long',59),
(666,'huyen-cau-ke',N'Huyện Cầu Kè',59),
(667,'huyen-tieu-can',N'Huyện Tiểu Cần',59),
(668,'huyen-chau-thanh',N'Huyện Châu Thành',59),
(669,'huyen-cau-ngang',N'Huyện Cầu Ngang',59),
(670,'huyen-tra-cu',N'Huyện Trà Cú',59),
(671,'huyen-duyen-hai',N'Huyện Duyên Hải',59),
(672,'thi-xa-duyen-hai',N'Thị xã Duyên Hải',59),
(673,'thanh-pho-tuyen-quang',N'Thành phố Tuyên Quang',60),
(674,'huyen-lam-binh',N'Huyện Lâm Bình',60),
(675,'huyen-na-hang',N'Huyện Na Hang',60),
(676,'huyen-chiem-hoa',N'Huyện Chiêm Hóa',60),
(677,'huyen-ham-yen',N'Huyện Hàm Yên',60),
(678,'huyen-yen-son',N'Huyện Yên Sơn',60),
(679,'huyen-son-duong',N'Huyện Sơn Dương',60),
(617,'thanh-pho-thanh-hoa',N'Thành phố Thanh Hóa',56),
(618,'thi-xa-bim-son',N'Thị xã Bỉm Sơn',56),
(619,'thanh-pho-sam-son',N'Thành phố Sầm Sơn',56),
(620,'huyen-muong-lat',N'Huyện Mường Lát',56),
(621,'huyen-quan-hoa',N'Huyện Quan Hóa',56),
(622,'huyen-ba-thuoc',N'Huyện Bá Thước',56),
(623,'huyen-quan-son',N'Huyện Quan Sơn',56),
(624,'huyen-lang-chanh',N'Huyện Lang Chánh',56),
(625,'huyen-ngoc-lac',N'Huyện Ngọc Lặc',56),
(626,'huyen-cam-thuy',N'Huyện Cẩm Thủy',56),
(627,'huyen-thach-thanh',N'Huyện Thạch Thành',56),
(628,'huyen-ha-trung',N'Huyện Hà Trung',56),
(629,'huyen-vinh-loc',N'Huyện Vĩnh Lộc',56),
(630,'huyen-yen-dinh',N'Huyện Yên Định',56),
(631,'huyen-tho-xuan',N'Huyện Thọ Xuân',56),
(632,'huyen-thuong-xuan',N'Huyện Thường Xuân',56),
(633,'huyen-trieu-son',N'Huyện Triệu Sơn',56),
(634,'huyen-thieu-hoa',N'Huyện Thiệu Hóa',56),
(635,'huyen-hoang-hoa',N'Huyện Hoằng Hóa',56),
(636,'huyen-hau-loc',N'Huyện Hậu Lộc',56),
(637,'huyen-nga-son',N'Huyện Nga Sơn',56),
(638,'huyen-nhu-xuan',N'Huyện Như Xuân',56),
(639,'huyen-nhu-thanh',N'Huyện Như Thanh',56),
(640,'huyen-nong-cong',N'Huyện Nông Cống',56),
(641,'huyen-dong-son',N'Huyện Đông Sơn',56),
(642,'huyen-quang-xuong',N'Huyện Quảng Xương',56),
(643,'thi-xa-nghi-son',N'Thị xã Nghi Sơn',56),
(558,'thanh-pho-dong-ha',N'Thành phố Đông Hà',50),
(559,'thi-xa-quang-tri',N'Thị xã Quảng Trị',50),
(560,'huyen-vinh-linh',N'Huyện Vĩnh Linh',50),
(561,'huyen-huong-hoa',N'Huyện Hướng Hóa',50),
(562,'huyen-gio-linh',N'Huyện Gio Linh',50),
(563,'huyen-da-krong',N'Huyện Đa Krông',50),
(564,'huyen-cam-lo',N'Huyện Cam Lộ',50),
(565,'huyen-trieu-phong',N'Huyện Triệu Phong',50),
(566,'huyen-hai-lang',N'Huyện Hải Lăng',50),
(567,'huyen-con-co',N'Huyện Cồn Cỏ',50),
(235,'thanh-pho-cao-lanh',N'Thành phố Cao Lãnh',23),
(236,'thanh-pho-sa-dec',N'Thành phố Sa Đéc',23),
(237,'thanh-pho-hong-ngu',N'Thành phố Hồng Ngự',23),
(238,'huyen-tan-hong',N'Huyện Tân Hồng',23),
(239,'huyen-hong-ngu',N'Huyện Hồng Ngự',23),
(240,'huyen-tam-nong',N'Huyện Tam Nông',23),
(241,'huyen-thap-muoi',N'Huyện Tháp Mười',23),
(242,'huyen-cao-lanh',N'Huyện Cao Lãnh',23),
(243,'huyen-thanh-binh',N'Huyện Thanh Bình',23),
(244,'huyen-lap-vo',N'Huyện Lấp Vò',23),
(245,'huyen-lai-vung',N'Huyện Lai Vung',23),
(246,'huyen-chau-thanh',N'Huyện Châu Thành',23),
(224,'thanh-pho-bien-hoa',N'Thành phố Biên Hòa',22),
(225,'thanh-pho-long-khanh',N'Thành phố Long Khánh',22),
(226,'huyen-tan-phu',N'Huyện Tân Phú',22),
(227,'huyen-vinh-cuu',N'Huyện Vĩnh Cửu',22),
(228,'huyen-dinh-quan',N'Huyện Định Quán',22),
(229,'huyen-trang-bom',N'Huyện Trảng Bom',22),
(230,'huyen-thong-nhat',N'Huyện Thống Nhất',22),
(231,'huyen-cam-my',N'Huyện Cẩm Mỹ',22),
(232,'huyen-long-thanh',N'Huyện Long Thành',22),
(233,'huyen-xuan-loc',N'Huyện Xuân Lộc',22),
(234,'huyen-nhon-trach',N'Huyện Nhơn Trạch',22),
(214,'thanh-pho-dien-bien-phu',N'Thành phố Điện Biên Phủ',21),
(215,'thi-xa-muong-lay',N'Thị Xã Mường Lay',21),
(216,'huyen-muong-nhe',N'Huyện Mường Nhé',21),
(217,'huyen-muong-cha',N'Huyện Mường Chà',21),
(218,'huyen-tua-chua',N'Huyện Tủa Chùa',21),
(219,'huyen-tuan-giao',N'Huyện Tuần Giáo',21),
(220,'huyen-dien-bien',N'Huyện Điện Biên',21),
(221,'huyen-dien-bien-dong',N'Huyện Điện Biên Đông',21),
(222,'huyen-muong-ang',N'Huyện Mường Ảng',21),
(223,'huyen-nam-po',N'Huyện Nậm Pồ',21),
(688,'thanh-pho-vinh-yen',N'Thành phố Vĩnh Yên',62),
(689,'thanh-pho-phuc-yen',N'Thành phố Phúc Yên',62),
(690,'huyen-lap-thach',N'Huyện Lập Thạch',62),
(691,'huyen-tam-duong',N'Huyện Tam Dương',62),
(692,'huyen-tam-dao',N'Huyện Tam Đảo',62),
(693,'huyen-binh-xuyen',N'Huyện Bình Xuyên',62),
(694,'huyen-yen-lac',N'Huyện Yên Lạc',62),
(695,'huyen-vinh-tuong',N'Huyện Vĩnh Tường',62),
(696,'huyen-song-lo',N'Huyện Sông Lô',62),
(183,'thanh-pho-buon-ma-thuot',N'Thành phố Buôn Ma Thuột',19),
(184,'thi-xa-buon-ho',N'Thị Xã Buôn Hồ',19),
(185,'huyen-ea-hleo',N'Huyện Ea H leo',19),
(186,'huyen-ea-sup',N'Huyện Ea Súp',19),
(187,'huyen-buon-don',N'Huyện Buôn Đôn',19),
(188,'huyen-cu-mgar',N'Huyện Cư M gar',19),
(189,'huyen-krong-buk',N'Huyện Krông Búk',19),
(190,'huyen-krong-nang',N'Huyện Krông Năng',19),
(191,'huyen-ea-kar',N'Huyện Ea Kar',19),
(192,'huyen-mdrak',N'Huyện M Đrắk',19),
(193,'huyen-krong-bong',N'Huyện Krông Bông',19),
(194,'huyen-krong-pac',N'Huyện Krông Pắc',19),
(195,'huyen-krong-a-na',N'Huyện Krông A Na',19),
(196,'huyen-lak',N'Huyện Lắk',19),
(197,'huyen-cu-kuin',N'Huyện Cư Kuin',19),
(608,'thanh-pho-thai-nguyen',N'Thành phố Thái Nguyên',55),
(609,'thanh-pho-song-cong',N'Thành phố Sông Công',55),
(610,'huyen-dinh-hoa',N'Huyện Định Hóa',55),
(611,'huyen-phu-luong',N'Huyện Phú Lương',55),
(612,'huyen-dong-hy',N'Huyện Đồng Hỷ',55),
(613,'huyen-vo-nhai',N'Huyện Võ Nhai',55),
(614,'huyen-dai-tu',N'Huyện Đại Từ',55),
(615,'thi-xa-pho-yen',N'Thị xã Phổ Yên',55),
(616,'huyen-phu-binh',N'Huyện Phú Bình',55),
(680,'thanh-pho-vinh-long',N'Thành phố Vĩnh Long',61),
(681,'huyen-long-ho',N'Huyện Long Hồ',61),
(682,'huyen-mang-thit',N'Huyện Mang Thít',61),
(683,'huyen-vung-liem',N'Huyện Vũng Liêm',61),
(684,'huyen-tam-binh',N'Huyện Tam Bình',61),
(685,'thi-xa-binh-minh',N'Thị xã Bình Minh',61),
(686,'huyen-tra-on',N'Huyện Trà Ôn',61),
(687,'huyen-binh-tan',N'Huyện Bình Tân',61),
(697,'thanh-pho-yen-bai',N'Thành phố Yên Bái',63),
(698,'thi-xa-nghia-lo',N'Thị xã Nghĩa Lộ',63),
(699,'huyen-luc-yen',N'Huyện Lục Yên',63),
(700,'huyen-van-yen',N'Huyện Văn Yên',63),
(701,'huyen-mu-cang-chai',N'Huyện Mù Căng Chải',63),
(702,'huyen-tran-yen',N'Huyện Trấn Yên',63),
(703,'huyen-tram-tau',N'Huyện Trạm Tấu',63),
(704,'huyen-van-chan',N'Huyện Văn Chấn',63),
(705,'huyen-yen-binh',N'Huyện Yên Bình',63),
(198,'thanh-pho-gia-nghia',N'Thành phố Gia Nghĩa',20),
(199,'huyen-dak-glong',N'Huyện Đăk Glong',20),
(200,'huyen-cu-jut',N'Huyện Cư Jút',20),
(201,'huyen-dak-mil',N'Huyện Đắk Mil',20),
(202,'huyen-krong-no',N'Huyện Krông Nô',20),
(203,'huyen-dak-song',N'Huyện Đắk Song',20),
(204,'huyen-dak-rlap',N'Huyện Đắk R Lấp',20),
(205,'huyen-tuy-duc',N'Huyện Tuy Đức',20),
(653,'thanh-pho-my-tho',N'Thành phố Mỹ Tho',58),
(654,'thi-xa-go-cong',N'Thị xã Gò Công',58),
(655,'thi-xa-cai-lay',N'Thị xã Cai Lậy',58),
(656,'huyen-tan-phuoc',N'Huyện Tân Phước',58),
(657,'huyen-cai-be',N'Huyện Cái Bè',58),
(658,'huyen-cai-lay',N'Huyện Cai Lậy',58),
(659,'huyen-chau-thanh',N'Huyện Châu Thành',58),
(660,'huyen-cho-gao',N'Huyện Chợ Gạo',58),
(661,'huyen-go-cong-tay',N'Huyện Gò Công Tây',58),
(662,'huyen-go-cong-dong',N'Huyện Gò Công Đông',58),
(663,'huyen-tan-phu-dong',N'Huyện Tân Phú Đông',58),
(579,'thanh-pho-son-la',N'Thành phố Sơn La',52),
(580,'huyen-quynh-nhai',N'Huyện Quỳnh Nhai',52),
(581,'huyen-thuan-chau',N'Huyện Thuận Châu',52),
(582,'huyen-muong-la',N'Huyện Mường La',52),
(583,'huyen-bac-yen',N'Huyện Bắc Yên',52),
(584,'huyen-phu-yen',N'Huyện Phù Yên',52),
(585,'huyen-moc-chau',N'Huyện Mộc Châu',52),
(586,'huyen-yen-chau',N'Huyện Yên Châu',52),
(587,'huyen-mai-son',N'Huyện Mai Sơn',52),
(588,'huyen-song-ma',N'Huyện Sông Mã',52),
(589,'huyen-sop-cop',N'Huyện Sốp Cộp',52),
(590,'huyen-van-ho',N'Huyện Vân Hồ',52),
(568,'thanh-pho-soc-trang',N'Thành phố Sóc Trăng',51),
(569,'huyen-chau-thanh',N'Huyện Châu Thành',51),
(570,'huyen-ke-sach',N'Huyện Kế Sách',51),
(571,'huyen-my-tu',N'Huyện Mỹ Tú',51),
(572,'huyen-cu-lao-dung',N'Huyện Cù Lao Dung',51),
(573,'huyen-long-phu',N'Huyện Long Phú',51),
(574,'huyen-my-xuyen',N'Huyện Mỹ Xuyên',51),
(575,'thi-xa-nga-nam',N'Thị xã Ngã Năm',51),
(576,'huyen-thanh-tri',N'Huyện Thạnh Trị',51),
(577,'thi-xa-vinh-chau',N'Thị xã Vĩnh Châu',51),
(578,'huyen-tran-de',N'Huyện Trần Đề',51);


INSERT INTO Benxe(Ma_Quan, Tenbenxe, Diachi, Sodienthoai) VALUES
(34, N'Bến xe miền Đông cũ', N'292 Đ. Đinh Bộ Lĩnh, P26', '1900 571 292'),
(38, N'Bến xe miền Đông mới', N'số 501 Đ. Hoàng Hữu Nam, P. Long Bình', '0368 292 292'),
(46, N'Bến xe miền Tây', N'395 Đường Kinh Dương Vương, P.An Lạc', '1900 7373'),
(49, N'Bến xe An Sương', N'Ngã tư An Sương, quốc lộ 22, Bà Điểm, P.An Lạc', '0282 238 8686'),
(350, N'Bến xe Cam Ranh', N'Số 1 Lê Duẩn, Cam Lộc', '0913 450 561'),
(349, N'Bến xe phía Nam Nha Trang', N'6 Đường 23/10', '02583 812 812'),
(349, N'Bến xe phía Bắc Nha Trang', N'1 Điện Biên Phủ, Vĩnh Hải', '0258 3838 788'),
(506, N'Bến xe Đồng Hới', N'156 Trần Hưng Đạo, P.Đồng Phú', '0232 6559 866'),
(644, N'Bến xe phía Nam Huế', N'132 Đường Lý Thái Tổ, P.An Hòa', '02343 5322 7116'),
(206, N'Bến xe Trung tâm Đà Nẵng', N'148 Tôn Đức Thắng, P. Hòa Minh', '0236 376 7679'),
(13, N'Bến xe Mỹ Đình', N'20 Phạm Hùng, P.Mỹ Đình 2', '19001825 nhánh 1'),
(545, N'Bến xe Bãi Cháy', N'17 Đường 279, P. Bãi Cháy', '0203 3846 410'),
(264, N'Bến xe Hà Giang', N'Đường 9/5, P.Nguyễn Trãi', '0914 868 737');


-- Xe giường nằm 44 chỗ
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(4, 2, '51B-12345', N'Phương Trang FT1');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(4, 2, '51B-67890', N'Phương Trang FT2');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(4, 2, '51B-54321', N'Thành Bưởi TB1');
-- Xe ghế ngồi 34 chỗ
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(3, 3, '51G-11111', N'Hoàng Long HL1');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(3, 3, '51G-22222', N'Hoàng Long HL2');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(3, 3, '51G-33333', N'Mai Linh ML1');
-- Xe giường phòng 22 chỗ
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(2, 4, '51L-66666', N'Limousine Saigon 1');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(2, 4, '51L-77777', N'Limousine Saigon 2');
-- Xe giường nằm đôi 22 chỗ
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(1, 1, '51D-88888', N'Đôi Phương Trang 1');
INSERT INTO Xe (Ma_Loaixe, Ma_Benxe, Bienso, Ten) VALUES(1, 1, '51D-99999', N'Đôi Thành Bưởi 1');
 


INSERT INTO Tuyenxe(Khoangthoigian, Khoangcach, Giave) VALUES
(8, 350, 275000.00),
(9, 350, 295000.00),
(9, 400, 300000.00),
(10, 400, 315000.00),
(24, 1200, 600000.00),
(20, 1045, 480000.00);


INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (1, 2, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (1, 5, 1, 2);

INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (2, 3, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (2, 5, 1, 2);

INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (3, 2, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (3, 6, 1, 2);

INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (4, 3, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (4, 6, 1, 2);

INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (5, 3, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (5, 8, 1, 2);

INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labendau, Thutu) VALUES (6, 3, 1, 1);
INSERT INTO Lotrinh (Ma_Tuyenxe, Ma_Benxe, Labencuoi, Thutu) VALUES (6, 9, 1, 2);

INSERT INTO Chuyenxe(Ma_Tuyenxe, Ma_Xe, Giodi, Gioden) VALUES
(1, 1, '2025-05-15 08:00:00', '2025-05-15 16:00:00'),
(1, 2, '2025-05-15 09:00:00', '2025-05-15 17:00:00'),
(1, 3, '2025-05-15 10:00:00', '2025-05-15 18:00:00'),
(2, 4, '2025-05-15 11:00:00', '2025-05-15 20:00:00'),
(2, 5, '2025-05-15 12:00:00', '2025-05-15 11:00:00'),
(2, 6, '2025-05-15 13:00:00', '2025-05-15 12:00:00'),
(3, 7, '2025-05-15 14:00:00', '2025-05-15 23:00:00'),
(3, 8, '2025-05-15 15:00:00', '2025-05-16 00:00:00'),
(3, 9, '2025-05-15 16:00:00', '2025-05-16 01:00:00'),
(4, 10, '2025-05-15 17:00:00', '2025-05-16 03:00:00'),
(4, 1, '2025-05-17 18:00:00', '2025-05-18 04:00:00'),
(4, 2, '2025-05-17 19:00:00', '2025-05-18 05:00:00'),
(5, 3, '2025-05-17 20:00:00', '2025-05-18 20:00:00'),
(5, 4, '2025-05-17 21:00:00', '2025-05-18 21:00:00'),
(5, 5, '2025-05-17 21:00:00', '2025-05-18 21:00:00'),
(6, 6, '2025-05-17 21:00:00', '2025-05-18 17:00:00'),
(6, 7, '2025-05-17 21:00:00', '2025-05-18 17:00:00'),
(6, 8, '2025-05-17 22:00:00', '2025-05-18 18:00:00');

-- 1. Khuyến mãi giảm giá cố định
INSERT INTO Khuyenmai(
    Ma_Loaikhuyenmai, Ma_Quantrivien, Tieude, 
    Mota, GiatriKM, CODE, 
    Ngaybatdau, Ngayketthuc, Giatritoithieu, 
    Giamgiatoida, Duockichhoat, Ngaytao) VALUES 
(
    1, 1, N'Giảm 50k cho đơn từ 500k',
    N'Áp dụng cho tất cả tuyến đường', 50000, 'GIAM50K',
    '2025-06-01', '2025-07-01', 500000,
    50000, 1, GETDATE()
);
-- 2. Khuyến mãi giảm theo %
INSERT INTO Khuyenmai(
    Ma_Loaikhuyenmai, Ma_Quantrivien, Tieude, 
    Mota, GiatriKM, CODE, 
    Ngaybatdau, Ngayketthuc, Giatritoithieu, 
    Giamgiatoida, Duockichhoat, Ngaytao) VALUES 
(
    2, 1, N'Giảm 15% tối đa 100k',
    N'Áp dụng cho khách hàng thân thiết', 15, 'VIP15',
    '2025-07-01', '2025-08-01', 0,
    100000, 1, GETDATE()
);

-- 3. Khuyến mãi đặc biệt Black Friday
INSERT INTO Khuyenmai(
    Ma_Loaikhuyenmai, Ma_Quantrivien, Tieude, 
    Mota, GiatriKM, CODE, 
    Ngaybatdau, Ngayketthuc, Giatritoithieu, 
    Giamgiatoida, Duockichhoat, Ngaytao) VALUES 
(
    2, 1, N'Black Friday Sale 30%',
    N'Chương trình khuyến mãi lớn nhất năm', 30, 'BLACKFRIDAY',
    '2025-11-24', '2025-11-26', 0,
    150000, 1, GETDATE()
);

-- 4. Khuyến mãi giảm giá cố định cho chuyến đêm
INSERT INTO Khuyenmai(
    Ma_Loaikhuyenmai, Ma_Quantrivien, Tieude, 
    Mota, GiatriKM, CODE, 
    Ngaybatdau, Ngayketthuc, Giatritoithieu, 
    Giamgiatoida, Duockichhoat, Ngaytao) VALUES 
(
    1, 1, N'Giảm 30k vé đêm',
    N'Áp dụng cho các chuyến từ 22h-5h', 30000, 'DEM30',
    '2025-12-01', '2025-12-31', 150000,
    30000, 1, GETDATE()
);

-- 5. Khuyến mãi đầu năm mới
INSERT INTO Khuyenmai(
    Ma_Loaikhuyenmai, Ma_Quantrivien, Tieude, 
    Mota, GiatriKM, CODE, 
    Ngaybatdau, Ngayketthuc, Giatritoithieu, 
    Giamgiatoida, Duockichhoat, Ngaytao) VALUES 
(
    2, 1, N'Năm mới 2026 - Giảm 20%',
    N'Chào đón năm mới 2026', 20, 'NEWYEAR26',
    '2026-01-01', '2026-01-05', 300000,
    120000, 1, GETDATE()
);


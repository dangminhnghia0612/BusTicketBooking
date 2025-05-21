USE master 
GO
ALTER DATABASE QLBanVeXe set single_user with rollback immediate -- DISCONNECT FROM ALL SOURCE
DROP DATABASE IF exists QLBanVeXe
GO 
CREATE DATABASE QLBanVeXe
GO
USE QLBanVeXe
GO

/*==============================================================*/
/* Table: Vai trò				                                */
/*==============================================================*/
create table Vaitro (
   Ma_Vaitro            int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         not null,
   Mota                 nvarchar(100)        null,
   constraint PK_Vaitro primary key (Ma_Vaitro)
)
go

/*==============================================================*/
/* Table: Quản trị viên			                                */
/*==============================================================*/
create table Quantrivien (
   Ma_Quantrivien       int  IDENTITY(1,1)   not null,
   Ma_Vaitro            int                  not null,
   Tendangnhap          nvarchar(50)         not null,
   Matkhau              nvarchar(255)         null,
   Sodienthoai          nvarchar(15)         not null,
   Hoten                nvarchar(50)         null,
   Anh                  nvarchar(100)        null,
   Ngaytao              datetime             null,
   Ngaycapnhat          datetime             null,
   constraint PK_Quantrivien primary key (Ma_Quantrivien)
)
go

create nonclustered index Quantrivien_Vaitro_FK on Quantrivien (Ma_Vaitro ASC)
go

/*==============================================================*/
/* Table: Trạng thái khách hàng                                 */
/*==============================================================*/
create table Trangthaikhachhang (
   Ma_Trangthai         int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Tinhtrangkhachhang primary key (Ma_Trangthai)
)
go

/*==============================================================*/
/* Table: Khách hàng                                            */
/*==============================================================*/
create table Khachhang (
   Ma_Khachhang         int  IDENTITY(1,1)   not null,
   Ma_Trangthai	        int                  not null,
   Ma_Vaitro            int                  not null,
   Sodienthoai          nvarchar(15)         not null,
   Matkhau				nvarchar(255)        null,
   Email                nvarchar(50)         null,
   Hoten                nvarchar(100)        null,
   Token				nvarchar(200)		 null,
   Gioitinh             bit                  null,
   Ngaysinh             datetime             null,
   Diachi               nvarchar(100)        null,
   Nghenghiep           nvarchar(50)         null,
   Anh					varchar(100)         null,
   Ghichu               nvarchar(100)        null,
   Ngaytao	            datetime             null,
   Ngaycapnhat          datetime             null,
   Dangnhapcuoi         datetime             null,
   constraint PK_Khachhang primary key (Ma_Khachhang)
)
go

create nonclustered index Trangthai_Khachhang_FK on Khachhang (Ma_Trangthai ASC)
go

create nonclustered index Khachhang_Vaitro_FK on Khachhang (Ma_Vaitro ASC)
go

/*==============================================================*/
/* Table: Tỉnh	                                                */
/*==============================================================*/
create table Tinh (
   Ma_Tinh          int				     not null,
   Code             nvarchar(50)         null,
   Ten              nvarchar(50)         null,
   constraint PK_Tinh primary key (Ma_Tinh)
)
go

/*==============================================================*/
/* Table: Quận/Huyện                                            */
/*==============================================================*/
create table Quan (
   Ma_Quan			    int			         not null,
   Ma_Tinh	            int                  not null,
   Code                 nvarchar(50)         null,
   Ten                  nvarchar(50)         null,
   constraint PK_Quan primary key (Ma_Quan)
)
go

create nonclustered index Tinh_Quan_FK on Quan (Ma_Tinh ASC)
go

/*==============================================================*/
/* Table: Bến xe                                                */
/*==============================================================*/
create table Benxe (
   Ma_Benxe	            int  IDENTITY(1,1)   not null,
   Ma_Quan	            int                  null,
   Tenbenxe	            nvarchar(50)         null,
   Diachi               nvarchar(100)        null,
   Sodienthoai	        nvarchar(20)         null,
   constraint PK_Benxe primary key (Ma_Benxe)
)
go

create nonclustered index Benxe_Quan_FK on Benxe (Ma_Quan ASC)
go

/*==============================================================*/
/* Table: Tuyến xe                                              */
/*==============================================================*/
create table Tuyenxe (
   Ma_Tuyenxe           int  IDENTITY(1,1)   not null,
   Khoangthoigian       int                  null,
   Khoangcach           decimal              null,
   Giave                decimal              null,
   constraint PK_Tuyenxe primary key (Ma_Tuyenxe)
)
go

/*==============================================================*/
/* Table: Lộ trình                                              */
/*==============================================================*/
create table Lotrinh (
   Ma_Lotrinh           int  IDENTITY(1,1)   not null,
   Ma_Tuyenxe			int                  not null,
   Ma_Benxe				int                  not null,
   Labendau				bit		default 0	 not null,
   Labencuoi			bit		default 0	 not null,
   Labentrunggian		bit		default 0	 not null,
   Thutu				int					 not null,
   constraint PK_Lotrinh primary key (Ma_Lotrinh)
)
go

create nonclustered index Lotrinh_Tuyenxe_FK on Lotrinh (Ma_Tuyenxe ASC)
go

create nonclustered index Lotrinh_Benxe_FK on Lotrinh (Ma_Benxe ASC)
go

/*==============================================================*/
/* Table: Chuyến xe                                             */
/*==============================================================*/
create table Chuyenxe (
   Ma_Chuyenxe          int  IDENTITY(1,1)   not null,
   Ma_Tuyenxe           int                  not null,
   Ma_Xe                int                  not null,
   Giodi		        datetime             null,
   Gioden				datetime             null,
   constraint PK_Chuyenxe primary key (Ma_Chuyenxe)
)
go

create nonclustered index Chuyenxe_Tuyenxe_FK on Chuyenxe (Ma_Tuyenxe ASC)
go

create nonclustered index Chuyenxe_Xe_FK on Chuyenxe (Ma_Xe ASC)
go

/*==============================================================*/
/* Table: Loại xe                                               */
/*==============================================================*/
create table Loaixe (
   Ma_Loaixe            int  IDENTITY(1,1)   not null,
   Tenloai              nvarchar(50)         null,
   Soluongghe           int                  not null,
   Nhavesinh			bit					 null,
   Sodoghe				nvarchar(max)		 null,
   Anh	                nvarchar(100)        null,
   constraint PK_Loaixe primary key (Ma_Loaixe)
)
go

/*==============================================================*/
/* Table: Xe                                                    */
/*==============================================================*/
create table Xe (
   Ma_Xe                int  IDENTITY(1,1)   not null,
   Ma_Loaixe            int                  not null,
   Ma_Benxe				int					 not null,
   Bienso               nvarchar(20)         not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Xe primary key (Ma_Xe)
)
go

create nonclustered index Xe_Loaixe_FK on Xe (Ma_Loaixe ASC)
go

/*==============================================================*/
/* Table: Ghe                                                 */
/*==============================================================*/
create table Ghe (
   Ma_Ghe               int  IDENTITY(1,1)   not null,
   Ma_Xe                int                  not null,
   Soghe	            nvarchar(10)         null,
   Tang					int					 null,
   Day					int					 null,
   constraint PK_Ghe primary key (Ma_Ghe)
)
go

create nonclustered index Xe_Ghe_FK on Ghe (Ma_Xe ASC)
go

/*==============================================================*/
/* Table: Chi tiết ghế                                          */
/*==============================================================*/
create table Chitietghe (
   Ma_Chitietghe	 int IDENTITY(1,1)		 not null,
   Ma_Chuyenxe		 int					 not null,
   Ma_Ghe			 int					 not null,
   Trangthai		 bit		default 0	 not null,
   constraint PK_Chitietghe primary key (Ma_Chitietghe),
   constraint UQ_Chitietghe unique (Ma_Chuyenxe, Ma_Ghe)
)
go

create nonclustered index Chuyenxe_Chitietghe_FK on Chitietghe (Ma_Chuyenxe ASC)
go

create nonclustered index Ghe_Chitietghe_FK on Chitietghe (Ma_Ghe ASC)
go

/*==============================================================*/
/* Table: Tình trạng đặt vé                                     */
/*==============================================================*/
create table Tinhtrangdatve (
   Ma_Tinhtrang     int  IDENTITY(1,1)   not null,
   Ten              nvarchar(50)         null,
   constraint PK_Tinhtrang primary key (Ma_Tinhtrang)
)
go

/*==============================================================*/
/* Table: Đặt vé                                                */
/*==============================================================*/
create table Datve (
   Ma_Datve             int  IDENTITY(1,1)   not null,
   Ma_Chuyenxe          int                  not null,
   Ma_Khachhang         int                  null,
   Ma_Tinhtrang         int                  not null,
   Ngaydat              datetime             not null,
   Soluong				int					 not null,
   Giagoc	            decimal              null,
   Giasaukhuyenmai      decimal              null,
   Dadoive				bit					 default 0,
   Ghichu               nvarchar(100)        null,
   Tenkhachhang         nvarchar(50)         null,
   Sodienthoai			nvarchar(15)         null,
   Email		        nvarchar(50)         null,
   constraint PK_Datve primary key (Ma_Datve)
)
go

create nonclustered index Datve_Co_TinhTrangDat_FK on Datve (Ma_TinhTrang ASC)
go

create nonclustered index Datve_Chuyenxe_FK on Datve (Ma_Chuyenxe ASC)
go

create nonclustered index Khachang_Datve_FK on Datve (Ma_Khachhang ASC)
go

/*==============================================================*/
/* Table: Vé xe                                                 */
/*==============================================================*/
create table Vexe (
   Ma_Vexe	            int  IDENTITY(1,1)   not null,
   Ma_Datve             int                  not null,
   Ma_Chitietghe        int                  not null,
   Giave                decimal              not null,
   constraint PK_Vexe primary key (Ma_Vexe)
)
go

create nonclustered index Vexe_Chitietghe_FK on Vexe (Ma_Chitietghe ASC)
go

create nonclustered index Vexe_Datve_FK on Vexe (Ma_Datve ASC)
go

/*==============================================================*/
/* Table: Ơhương thức thanh toán                                */
/*==============================================================*/
create table Phuongthucthanhtoan (
   Ma_Phuongthuc        int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Phuongthucthanhtoan primary key (Ma_Phuongthuc)
)
go

/*==============================================================*/
/* Table: Lịch sử thanh toán                                    */
/*==============================================================*/
create table Lichsuthanhtoan (
   Ma_Thanhtoan         int  IDENTITY(1,1)   not null,
   Ma_Phuongthuc	    int                  not null,
   Ma_Datve			    int                  not null,
   Ma_Giaodich			nvarchar(50)	     null,
   Ngaythanhtoan        datetime             null,
   Sotien				decimal				 null,
   Ghichu               nvarchar(100)        null,
   constraint PK_Lichsuthanhtoan primary key (Ma_Thanhtoan)
)
go

create nonclustered index PhuongThucThanhToan_FK on Lichsuthanhtoan (Ma_Phuongthuc ASC)
go

create nonclustered index Thanhtoan_Datve_FK on Lichsuthanhtoan (Ma_Datve ASC)
go

/*==============================================================*/
/* Table: Lý do hủy đặt vé                                      */
/*==============================================================*/
create table Lydohuydatve (
   Ma_Lydo            int  IDENTITY(1,1)   not null,
   Mota		          nvarchar(100)        null,
   constraint PK_Lydohuydatve primary key (Ma_Lydo)
)
go

/*==============================================================*/
/* Table: Chính sách hủy vé                                     */
/*==============================================================*/
create table Chinhsachhuyve (
   Ma_Chinhsach             int  IDENTITY(1,1)   not null,
   Ma_Quantrivien			int					 not null,
   Ten                      nvarchar(50)         null,
   Mota		                nvarchar(100)        null,
   Sogiotruockhoihanh		int                  null,
   Phantram			        decimal              null,
   Kichhoat					bit                  null,
   Ngaytao					datetime             null,
   Ngaycapnhat				datetime             null,
   constraint PK_Chinhsach primary key (Ma_Chinhsach)
)
go

/*==============================================================*/
/* Table: Hủy đặt vé                                            */
/*==============================================================*/
create table Huydatve (
   Ma_Huydatve	        int  IDENTITY(1,1)   not null,
   Ma_Datve				int					 not null,
   Ma_Lydo	            int                  not null,
   Ma_Quantrivien       int                  null,
   Ma_Chinhsach         int                  not null,
   Ngayhuy			    datetime             null,
   Lydokhac			    nvarchar(100)        null,
   Tienhoantra	        decimal              null,
   constraint PK_Huydatve primary key (Ma_Huydatve)
)
go

create nonclustered index Datve_Huydatve_FK on Huydatve (Ma_Datve ASC)
go

/*==============================================================*/
/* Table: Loại khuyến mãi                                       */
/*==============================================================*/
create table Loaikhuyenmai (
   Ma_Loaikhuyenmai     int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   Mota					nvarchar(100)        null,
   constraint PK_Loaikhuyenmai primary key (Ma_Loaikhuyenmai)
)
go

/*==============================================================*/
/* Table: Khuyến mãi                                            */
/*==============================================================*/
create table Khuyenmai (
   Ma_Khuyenmai         int  IDENTITY(1,1)   not null,
   Ma_Loaikhuyenmai     int                  not null,
   Ma_Quantrivien       int                  not null,
   Code                nvarchar(20)         not null,
   Tieude               nvarchar(100)        null,
   Mota		            nvarchar(200)        null,
   GiatriKM		        decimal              null,
   Ngaybatdau           datetime             null,
   Ngayketthuc          datetime             null,
   Giatritoithieu       decimal               null,
   Giamgiatoida         decimal              null,
   Duockichhoat         bit                  null,
   Ngaytao              datetime             null,
   constraint PK_PROMOTIONS primary key (Ma_Khuyenmai),
   constraint UQ_CODE unique (Code)
)
go

/*==============================================================*/
/* Table: Áp dụng khuyến mãi                                    */
/*==============================================================*/
create table Apdungkhuyenmai (
   Ma_Datve             int					 not null,
   Ma_Khuyenmai         int                  not null,
   Ngayapdung	        datetime             null,
   SotienKM		        decimal              null,
   constraint PK_Apdungkhuyenmai primary key (Ma_Datve, Ma_Khuyenmai)
)
go

/*==============================================================*/
/* Table: Tin tức                                               */
/*==============================================================*/
create table Tintuc (
   Ma_Tintuc            int  IDENTITY(1,1)   not null,
   Ma_Quantrivien       int                  not null,
   Tieude               nvarchar(max)        null,
   Noidung              nvarchar(max)        null,
   Anh                  varchar(100)         null,
   Duocphathanh         bit                  null,
   Ngayphathanh	        datetime             null,
   Ngaytao              datetime             null,
   Ngaycapnhat          datetime             null,
   constraint PK_Tintuc primary key (Ma_Tintuc)
)
go

/*==============================================================*/
/* Table: Biểu ngữ (banner)                                     */
/*==============================================================*/
create table Bieungu (
   Ma_Bieungu           int  IDENTITY(1,1)   not null,
   Ma_Quantrivien       int                  not null,
   Tieude               nvarchar(100)        null,
   Anh                  nvarchar(100)        null,
   Thutuhienthi         int                  null,
   Kichhoat             bit                  null,
   Ngaybatdau           datetime             null,
   Ngayketthuc          datetime             null,
   Ngaytao              datetime             null,
   constraint PK_Bieungu primary key (Ma_Bieungu)
)
go

/*==============================================================*/
/* Table: Thông tin nhà xe                                      */
/*==============================================================*/
create table Thongtinnhaxe (
   Ma_Thongtinnhaxe       int  IDENTITY(1,1)   not null,
   Ma_Quantrivien         int                  not null,
   Ten                    nvarchar(100)        null,
   Mota                   nvarchar(200)        null,
   Ngaytao                datetime             null,
   Ngaycapnhat            datetime             null,
   constraint PK_Thongtinnhaxe primary key (Ma_Thongtinnhaxe)
)
go

/*==============================================================*/
/*						foreign key                             */
/*==============================================================*/
alter table Quantrivien
   add constraint FK_Quantrivien_Vaitro foreign key (Ma_Vaitro)
      references Vaitro (Ma_Vaitro)
go

alter table Bieungu
   add constraint FK_Bieungu_Quantrivien foreign key (Ma_Quantrivien)
      references Quantrivien (Ma_Quantrivien)
go

alter table Datve
   add constraint FK_Datve_Tinhtrangdatve foreign key (Ma_Tinhtrang)
      references Tinhtrangdatve (Ma_Tinhtrang)
go


alter table Datve
   add constraint FK_Datve_Chuyenxe foreign key (Ma_Chuyenxe)
      references Chuyenxe (Ma_Chuyenxe)
go

alter table Datve
   add constraint FK_Datve_Khachhang foreign key (Ma_Khachhang)
      references Khachhang (Ma_Khachhang)
go

alter table Apdungkhuyenmai
   add constraint FK_Datve foreign key (Ma_Datve)
      references Datve (Ma_Datve)
go

alter table Apdungkhuyenmai
   add constraint FK_Khuyenmai foreign key (Ma_Khuyenmai)
      references Khuyenmai (Ma_Khuyenmai)
go

alter table Xe
   add constraint FK_Xe_Loaixe foreign key (Ma_Loaixe)
      references Loaixe (Ma_Loaixe)
go

alter table Xe
   add constraint FK_Xe_Benxe foreign key (Ma_Benxe)
      references Benxe (Ma_Benxe)
go

alter table Thongtinnhaxe
   add constraint FK_Thongtinnhaxe_Quantrivien foreign key (Ma_Quantrivien)
      references Quantrivien (Ma_Quantrivien)
go

alter table Huydatve
   add constraint FK_Huydatve_Quantrivien foreign key (Ma_Quantrivien)
      references Quantrivien (Ma_Quantrivien)
go

alter table Huydatve
   add constraint FK_Huydatve_Lydo foreign key (Ma_Lydo)
      references Lydohuydatve (Ma_Lydo)
go

alter table Huydatve
   add constraint FK_Chinhsach_Huyve foreign key (Ma_Chinhsach)
      references Chinhsachhuyve (Ma_Chinhsach)
go

alter table Huydatve
   add constraint FK_Datve_Huyve foreign key (Ma_Datve)
      references Datve (Ma_Datve)
go

alter table Quan
   add constraint FK_Quan_Tinh foreign key (Ma_Tinh)
      references Tinh (Ma_Tinh)
go

alter table Tintuc
   add constraint FK_Quantrivien_Tintuc foreign key (Ma_Quantrivien)
      references Quantrivien (Ma_Quantrivien)
go

alter table Lichsuthanhtoan
   add constraint FK_Phuongthuc_Thanhtoan foreign key (Ma_Phuongthuc)
      references Phuongthucthanhtoan (Ma_Phuongthuc)
go

alter table Lichsuthanhtoan
	 add constraint FK_Datve_Thanhtoan foreign key (Ma_Datve)
		references Datve (Ma_Datve)

alter table Khuyenmai
   add constraint FK_TaoKhuyenMai foreign key (Ma_Quantrivien)
      references Quantrivien (Ma_Quantrivien)
go

alter table Khuyenmai
   add constraint FK_LoaiKM foreign key (Ma_Loaikhuyenmai)
      references Loaikhuyenmai (Ma_Loaikhuyenmai)
go


alter table Ghe
   add constraint FK_Xe_Ghe foreign key (Ma_Xe)
      references Xe (Ma_Xe)
go

alter table Benxe
   add constraint FK_Benxe_Quan foreign key (Ma_Quan)
      references Quan (Ma_Quan)
go

alter table Vexe
   add constraint FK_Datvexe foreign key (Ma_Datve)
      references Datve (Ma_Datve)
go

alter table Vexe
   add constraint FK_Vexe_Chitietghe foreign key (Ma_Chitietghe)
      references Chitietghe (Ma_Chitietghe)
go


alter table Chuyenxe
   add constraint FK_Chuyenxe_Tuyenxe foreign key (Ma_Tuyenxe)
      references Tuyenxe (Ma_Tuyenxe)
go

alter table Chuyenxe
   add constraint FK_Chuyenxe_Xe foreign key (Ma_Xe)
      references Xe (Ma_Xe)
go

alter table Khachhang
   add constraint FK_TrangthaiKhachHang foreign key (Ma_Trangthai)
      references Trangthaikhachhang (Ma_Trangthai)
go

alter table Khachhang
   add constraint FK_Khachhang_Vaitro foreign key (Ma_Vaitro)
      references Vaitro (Ma_Vaitro)
go

alter table Chinhsachhuyve
	 add constraint FK_Chinhsach_Quantrivien foreign key (Ma_Quantrivien)
		references Quantrivien (Ma_Quantrivien)

alter table Chitietghe
   add constraint FK_Chitietghe_Chuyenxe foreign key (Ma_Chuyenxe)
      references Chuyenxe (Ma_Chuyenxe)
go

alter table Chitietghe
   add constraint FK_Chitietghe_Ghe foreign key (Ma_Ghe)
      references Ghe (Ma_Ghe)
go


alter table Lotrinh
   add constraint FK_Tuyenxe_Lotrinh foreign key (Ma_Tuyenxe)
      references Tuyenxe (Ma_Tuyenxe)
go

alter table Lotrinh
   add constraint FK_Benxe_Lotrinh foreign key (Ma_Benxe)
      references Benxe (Ma_Benxe)
go
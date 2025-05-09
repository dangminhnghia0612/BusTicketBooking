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
/* Table: Quantrivien                                           */
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

/*==============================================================*/
/* Index: ADMIN_ROLE_FK                                         */
/*==============================================================*/




create nonclustered index Quantrivien_Vaitro_FK on Quantrivien (Ma_Vaitro ASC)
go

/*==============================================================*/
/* Table: Bieungu                                               */
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
/* Index: Quantrivien_Bieungu_FK                                */
/*==============================================================*/




create nonclustered index Quantrivien_Bieungu_FK on Bieungu (Ma_Quantrivien ASC)
go

/*==============================================================*/
/* Table: Datve                                                 */
/*==============================================================*/
create table Datve (
   Ma_Datve             int  IDENTITY(1,1)   not null,
   --Ma_Chuyenxe          int                  not null,
   Ma_Khachhang         int                  null,
   Ma_Tinhtrang         int                  not null,
   Ngaydat              datetime             not null,
   Soluong				int					 not null,
   Giagoc	            decimal              null,
   Giasaukhuyenmai      decimal              null,
   Ghichu               nvarchar(100)        null,
   Tenkhachhang         nvarchar(50)         null,
   Sodienthoai			nvarchar(15)         null,
   Email		        nvarchar(50)         null,
   constraint PK_Datve primary key (Ma_Datve)
)
go

/*==============================================================*/
/* Index: BOOKING_HAVE_STATUS_FK                                */
/*==============================================================*/




create nonclustered index Datve_Co_TinhTrangDat_FK on Datve (Ma_TinhTrang ASC)
go


/*==============================================================*/
/* Index: Datve_Chuyenxe_FK                                     */
/*==============================================================*/




--create nonclustered index Datve_Chuyenxe_FK on Datve (Ma_Chuyenxe ASC)
--go

/*==============================================================*/
/* Index: Khachang_Datve_FK                                     */
/*==============================================================*/




create nonclustered index Khachang_Datve_FK on Datve (Ma_Khachhang ASC)
go


/*==============================================================*/
/* Table: Apdungkhuyenmai                                       */
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
/* Index:  Datve_ApdungKM_FK                                    */
/*==============================================================*/




create nonclustered index Datve_ApdungKM_FK on Apdungkhuyenmai (Ma_Datve ASC)
go

/*==============================================================*/
/* Index: Khuyenmai_ApdungKM_FK                                 */
/*==============================================================*/




create nonclustered index Khuyenmai_ApdungKM_FK on Apdungkhuyenmai (Ma_Khuyenmai ASC)
go

/*==============================================================*/
/* Table: Xe                                                    */
/*==============================================================*/
create table Xe (
   Ma_Xe                int  IDENTITY(1,1)   not null,
   Ma_Loaixe            int                  not null,
   Bienso               nvarchar(20)         not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Xe primary key (Ma_Xe)
)
go

/*==============================================================*/
/* Index: Xe_Loaixe_FK                                          */
/*==============================================================*/




create nonclustered index Xe_Loaixe_FK on Xe (Ma_Loaixe ASC)
go

/*==============================================================*/
/* Table: Thongtinnhaxe                                         */
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
/* Index: Quantrivien_Thongtinnhaxe_FK                              */
/*==============================================================*/




create nonclustered index Quantrivien_Thongtinnhaxe_FK on Thongtinnhaxe (Ma_Quantrivien ASC)
go

/*==============================================================*/
/* Table: Loaixe                                                */
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
/* Table: CANCELLATIONS                                         */
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

/*==============================================================*/
/* Index: Datve_Huydatve_FK                                     */
/*==============================================================*/




create nonclustered index Datve_Huydatve_FK on Huydatve (Ma_Datve ASC)
go

/*==============================================================*/
/* Index: Chinhsach_FK                                          */
/*==============================================================*/




create nonclustered index Huydatve_Chinhsach_FK on Huydatve (Ma_Chinhsach ASC)
go

/*==============================================================*/
/* Index: Huydatve_Lydo_FK                                      */
/*==============================================================*/




create nonclustered index Huydatve_Lydo_FK on Huydatve (Ma_Lydo ASC)
go

/*==============================================================*/
/* Index: Quantrivien_Huydatve_FK                               */
/*==============================================================*/




create nonclustered index Quantrivien_Huydatve_FK on Huydatve (Ma_Quantrivien ASC)
go


/*==============================================================*/
/* Table: Chinh sach huy ve                                     */
/*==============================================================*/
create table Chinhsach (
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
/* Index: Chinhsach_Quantrivien_FK                               */
/*==============================================================*/




create nonclustered index Chinhsach_Quantrivien_FK on Chinhsach (Ma_Quantrivien ASC)
go

/*==============================================================*/
/* Table: Quan/Huyen                                            */
/*==============================================================*/
create table Quan (
   Ma_Quan			    int			         not null,
   Ma_Tinh	            int                  not null,
   Code                 nvarchar(50)         null,
   Ten                  nvarchar(50)         null,
   constraint PK_Quan primary key (Ma_Quan)
)
go

/*==============================================================*/
/* Index: Tinh_Quan_FK				                            */
/*==============================================================*/




create nonclustered index Tinh_Quan_FK on Quan (Ma_Tinh ASC)
go

/*==============================================================*/
/* Table: Tintuc                                                */
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
/* Index: Quantrivien_Tintuc_FK                                         */
/*==============================================================*/




create nonclustered index Quantrivien_Tintuc_FK on Tintuc (Ma_Quantrivien ASC)
go

/*==============================================================*/
/* Table: Thanhtoan                                              */
/*==============================================================*/
create table Thanhtoan (
   Ma_Thanhtoan         int  IDENTITY(1,1)   not null,
   Ma_Phuongthuc	    int                  not null,
   Ma_Datve			    int                  not null,
   Ma_Giaodich			nvarchar(50)	     null,
   Ngaythanhtoan        datetime             null,
   Sotien				decimal				 null,
   Ghichu               nvarchar(100)        null,
   constraint PK_Thanhtoan primary key (Ma_Thanhtoan)
)
go


/*==============================================================*/
/* Index: PhuongThucThanhToan_FK                                     */
/*==============================================================*/




create nonclustered index PhuongThucThanhToan_FK on Thanhtoan (Ma_Phuongthuc ASC)
go

/*==============================================================*/
/* Index: Thanhtoan_Datve_FK                                     */
/*==============================================================*/




create nonclustered index Thanhtoan_Datve_FK on Thanhtoan (Ma_Datve ASC)
go

/*==============================================================*/
/* Table: PhuongThucThanhToan                                   */
/*==============================================================*/
create table Phuongthucthanhtoan (
   Ma_Phuongthuc        int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Phuongthucthanhtoan primary key (Ma_Phuongthuc)
)
go


/*==============================================================*/
/* Table: Khuyenmai                                             */
/*==============================================================*/
create table Khuyenmai (
   Ma_Khuyenmai         int  IDENTITY(1,1)   not null,
   Ma_Loaikhuyenmai     int                  not null,
   Ma_Quantrivien       int                  not null,
   CODE                 nvarchar(20)         not null,
   Tieude               nvarchar(100)        null,
   Mota		            nvarchar(200)        null,
   GiatriKM		        decimal              null,
   Ngaybatdau           datetime             null,
   Ngayketthuc          datetime             null,
   Giatritoithieu       decimal               null,
   Giamgiatoida         decimal              null,
   Duockichhoat         bit                  null,
   Ngaytao              datetime             null,
   constraint PK_PROMOTIONS primary key (Ma_Khuyenmai)
)
go

/*==============================================================*/
/* Index:Khuyenmai_LoaiKM_FK                                    */
/*==============================================================*/




create nonclustered index Khuyenmai_LoaiKM_FK on Khuyenmai (Ma_Loaikhuyenmai ASC)
go

/*==============================================================*/
/* Index: Nguoitao_FK                                           */
/*==============================================================*/




create nonclustered index Nguoitao_FK on Khuyenmai (Ma_Quantrivien ASC)
go

/*==============================================================*/
/* Table: Loaikhuyenmai                                      */
/*==============================================================*/
create table Loaikhuyenmai (
   Ma_Loaikhuyenmai     int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   Mota					nvarchar(100)        null,
   constraint PK_Loaikhuyenmai primary key (Ma_Loaikhuyenmai)
)
go

/*==============================================================*/
/* Table: Tinh	                                                */
/*==============================================================*/
create table Tinh (
   Ma_Tinh          int				     not null,
   Code             nvarchar(50)         null,
   Ten              nvarchar(50)         null,
   constraint PK_Tinh primary key (Ma_Tinh)
)
go

/*==============================================================*/
/* Table: Vaitro                                                */
/*==============================================================*/
create table Vaitro (
   Ma_Vaitro            int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         not null,
   Mota                 nvarchar(100)        null,
   constraint PK_Vaitro primary key (Ma_Vaitro)
)
go

/*==============================================================*/
/* Table: Lydohuydatve                                          */
/*==============================================================*/
create table Lydohuydatve (
   Ma_Lydo            int  IDENTITY(1,1)   not null,
   Mota		          nvarchar(100)        null,
   constraint PK_Lydohuydatve primary key (Ma_Lydo)
)
go

/*==============================================================*/
/* Table: Tuyenxe                                               */
/*==============================================================*/
create table Tuyenxe (
   Ma_Tuyenxe           int  IDENTITY(1,1)   not null,
   Ma_Diemdi			int                  not null,
   Ma_Diemden			int                  not null,
   Khoangthoigian       int                  null,
   Khoangcach           decimal              null,
   Giave                decimal              null,
   constraint PK_ROUTES primary key (Ma_Tuyenxe)
)
go

/*==============================================================*/
/* Index: Diemdi_FK							                    */
/*==============================================================*/




create nonclustered index Diemdi_FK on Tuyenxe (Ma_Diemdi ASC)
go

/*==============================================================*/
/* Index: Diemden_FK								            */
/*==============================================================*/




create nonclustered index Diemden_FK on Tuyenxe (Ma_Diemden ASC)
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
   --Trangthai	        bit   default 0      null,
   constraint PK_Ghe primary key (Ma_Ghe)
)
go

/*==============================================================*/
/* Index: Xe_Ghe_FK			                                    */
/*==============================================================*/




create nonclustered index Xe_Ghe_FK on Ghe (Ma_Xe ASC)
go

/*==============================================================*/
/* Table: Benxe	                                                */
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

/*==============================================================*/
/* Index: Benxe_Quan_FK			                                */
/*==============================================================*/




create nonclustered index Benxe_Quan_FK on Benxe (Ma_Benxe ASC)
go

/*==============================================================*/
/* Table: TinhTrangdatve                                        */
/*==============================================================*/
create table Tinhtrangdatve (
   Ma_Tinhtrang     int  IDENTITY(1,1)   not null,
   Ten              nvarchar(50)         null,
   constraint PK_Tinhtrang primary key (Ma_Tinhtrang)
)
go



/*==============================================================*/
/* Table: Tinhtrangkhachhang                                    */
/*==============================================================*/
create table Tinhtrangkhachhang (
   Ma_Tinhtrang         int  IDENTITY(1,1)   not null,
   Ten                  nvarchar(50)         null,
   constraint PK_Tinhtrangkhachhang primary key (Ma_Tinhtrang)
)
go

/*==============================================================*/
/* Table: Vexe                                               */
/*==============================================================*/
create table Vexe (
   Ma_Vexe	            int  IDENTITY(1,1)   not null,
   --Ma_Chuyenxe          int                  not null,
   Ma_Datve             int                  not null,
   Ma_Chitietghe        int                  not null,
   --Ma_Ghe               int					 not null,
   Giave                decimal              null,
   constraint PK_Vexe primary key (Ma_Vexe)
)
go

/*==============================================================*/
/* Index: Vexe_Chitietghe_FK	                                */
/*==============================================================*/




create nonclustered index Vexe_Chitietghe_FK on Vexe (Ma_Chitietghe ASC)
go

/*==============================================================*/
/* Index: Vexe_Datve_FK					                        */
/*==============================================================*/




create nonclustered index Vexe_Datve_FK on Vexe (Ma_Datve ASC)
go

/*==============================================================*/
/* Table: Chuyenxe                                              */
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

/*==============================================================*/
/* Index: Chuyenxe_Tuyenxe_FK                                   */
/*==============================================================*/




create nonclustered index Chuyenxe_Tuyenxe_FK on Chuyenxe (Ma_Tuyenxe ASC)
go

/*==============================================================*/
/* Index: Chuyenxe_Xe_FK                                        */
/*==============================================================*/




create nonclustered index Chuyenxe_Xe_FK on Chuyenxe (Ma_Xe ASC)
go

/*==============================================================*/
/* Table: Chitietghe                                            */
/*==============================================================*/
create table Chitietghe (
   Ma_Chitietghe	 int IDENTITY(1,1)		 not null,
   Ma_Chuyenxe		 int					 not null,
   Ma_Ghe			 int					 not null,
   Trangthai		 BIT					 DEFAULT 0,
   constraint PK_Chitietghe primary key (Ma_Chitietghe),
   constraint UQ_Chitietghe unique (Ma_Chuyenxe, Ma_Ghe)
)
go

/*==============================================================*/
/* Index: Chuyenxe_Chitietghe_FK                                */
/*==============================================================*/




create nonclustered index Chuyenxe_Chitietghe_FK on Chitietghe (Ma_Chuyenxe ASC)
go

/*==============================================================*/
/* Index: Ghe_Chitietghe_FK			                            */
/*==============================================================*/




create nonclustered index Ghe_Chitietghe_FK on Chitietghe (Ma_Ghe ASC)
go

/*==============================================================*/
/* Table: Khachhang                                                 */
/*==============================================================*/
create table Khachhang (
   Ma_Khachhang         int  IDENTITY(1,1)   not null,
   Ma_Tinhtrang         int                  not null,
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

/*==============================================================*/
/* Index: Tinhtrang_Khachhang_FK                                */
/*==============================================================*/




create nonclustered index Tinhtrang_Khachhang_FK on Khachhang (Ma_Tinhtrang ASC)
go

/*==============================================================*/
/* Index: Khachhang_Vaitro_FK                                   */
/*==============================================================*/




create nonclustered index Khachhang_Vaitro_FK on Khachhang (Ma_Vaitro ASC)
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


--alter table Datve
--   add constraint FK_Datve_Chuyenxe foreign key (Ma_Chuyenxe)
--      references Chuyenxe (Ma_Chuyenxe)
--go

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
      references Chinhsach (Ma_Chinhsach)
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

alter table Thanhtoan
   add constraint FK_Phuongthuc_Thanhtoan foreign key (Ma_Phuongthuc)
      references Phuongthucthanhtoan (Ma_Phuongthuc)
go

alter table Thanhtoan
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

alter table Tuyenxe
   add constraint FK_Tuyenxe_Diemdi foreign key (Ma_Diemdi)
      references Benxe (Ma_Benxe)
go

alter table Tuyenxe
   add constraint FK_Tuyenxe_Diemden foreign key (Ma_Diemden)
      references Benxe (Ma_Benxe)
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
   add constraint FK_TinhTrangKhachHang foreign key (Ma_Tinhtrang)
      references Tinhtrangkhachhang (Ma_Tinhtrang)
go

alter table Khachhang
   add constraint FK_Khachhang_Vaitro foreign key (Ma_Vaitro)
      references Vaitro (Ma_Vaitro)
go

alter table Chinhsach
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